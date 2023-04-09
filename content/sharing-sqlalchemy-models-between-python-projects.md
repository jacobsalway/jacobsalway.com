---
title: Sharing SQLAlchemy models between Python projects
date: '2023-01-07'
---

While working on a side project, two Python services I was developing shared the same database and `sqlalchemy` ORM models. The first service was a data loader that converted externally sourced data into the internal models on a schedule (deployed as a Lambda), and the second service was a backend API run using FastAPI that exposed the data to a React web application (deployed through App Runner).

To begin with, I simply copied the model code between the two services, but as the number of models begun to grow, I wanted to see if I could share the models between the two services using a package. However, there are upsides and downsides to this approach:

### Upsides

1. **No code duplication** &mdash; the models are only declared once and installed as dependencies
1. **Exact ORM package version can be set** &mdash; the models package can enforce the ORM package version across all services. e.g. `sqlalchemy>=1.3,<1.4`. This is because in Python only a single version of a package can be installed, compared to Javascript where `npm` or `yarn` can install differing versions of sub-dependencies per dependency if there are version conflicts.

### Downsides

1. **Increased build complexity** &mdash; the model dependency needs to be available to the package installation tool (`pip`, `poetry`, etc.).
   If all the code is in a monorepo, this may be easy by installing using a relative path using `poetry` as I've done in the example code.

    - There are also approaches with more complexity &mdash; you could symlink the model files or dynamically add them to `sys.path`, or you could
      set up an internal/private PyPI server or use Git submodules. The latter two approaches come with versioning problems I'll touch on below.

2. **Breaking changes and versioning models** &mdash; depending on the approach you take for the issue above, there may be versioning considerations.

    - If you take a monorepo approach, all services will have the latest version of the ORM code. However, you'll need to handle breaking changes like removing a model or field more carefully. Changes will have to be sequenced to ensure compatibility e.g. remove field usage from the API and loader, and only then remove it from the models.

    - Semantic versioning approaches would require either Git submodules or an internal PyPI server, both of which introduce complexity.

## Example

Below is the folder structure and some shortened example code for the monorepo approach that I took.

### Structure

```python
# Before
monorepo/
  loader/
    pyproject.toml
    poetry.lock
    Dockerfile
    models.py  # kept in sync by copy paste
    app.py
  api/
    pyproject.toml
    poetry.lock
    Dockerfile
    models.py  # kept in sync by copy paste
    app.py

# After
monorepo/
  models/
    pyproject.toml
    poetry.lock
    models.py
  loader/
    pyproject.toml  # installs ../models
    poetry.lock
    Dockerfile
    app.py
  api/
    pyproject.toml  # install ../models
    poetry.lock
    Dockerfile
    app.py
```

### `models/models.py`

```python
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import as_declarative, declared_attr


@as_declarative()
class Base:
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__


class Person(Base):
    first_name = Column(String)
    last_name = Column(String)
```

### `api/app.py`

```python
import os

import fastapi
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import Person

engine = create_engine(os.environ["DATABASE_URI"], pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app = fastapi.FastAPI()


@app.get("/people")
def people(db: Session = fastapi.Depends(get_db))
    return db.query(models.Person).all()
```

### `loader/app.py`

```python
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

import models


def main() -> None:
    engine = create_engine(os.environ["DATABASE_URI"])

    # loader handles the schema creation
    # for my use, the data is cleared and fully refreshed on every run
    # however if you need schema migrations, use alembic here
    with engine.begin() as conn:
        models.Base.metadata.drop_all(conn)
        models.Base.metadata.create_all(conn)

    with Session(engine) as session:
        new_person = models.Person(first_name="Jacob", last_name="Salway")
        session.add(new_person)
        session.commit()


if __name__ == "__main__":
    main()
```

### `models/pyproject.toml`

```toml
[tool.poetry]
name = "models"
version = "0.1.0"
description = ""
authors = ["Jacob Salway <jacob.salway@gmail.com>"]

[tool.poetry.dependencies]
python = "^3.10"
sqlalchemy = "^1.4.44"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"

```

### `api/pyproject.toml`

```toml
[tool.poetry]
name = "api"
version = "0.1.0"
description = ""
authors = ["Jacob Salway <jacob.salway@gmail.com>"]

[tool.poetry.dependencies]
python = "^3.10"
models = {path = "../models"}
fastapi = "^0.87.0"
uvicorn = "^0.20.0"
psycopg2 = "^2.9.5"

[tool.poetry.group.dev.dependencies]
models = {path = "../models", develop = true}

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

### Example `Dockerfile` and `docker-compose` using `poetry`

```docker
# Dockerfile
FROM python:3.10

ENV PYTHONUNBUFFERED 1
EXPOSE 5000

RUN pip install poetry==1.3.0 && \
    poetry config virtualenvs.in-project true

WORKDIR /build
COPY models/ ./models/
COPY api/poetry.lock api/pyproject.toml ./app/

WORKDIR /build/app
RUN poetry install --without dev --no-interaction

WORKDIR /app
COPY ./api/app ./app/

ENV PATH="/build/app/.venv/bin:$PATH"
CMD ["uvicorn", "--host", "0.0.0.0", "--port", "5000", "--factory", "app.main:create_app"]
```

```yaml
# docker-compose.yml

# setting the context to the parent directory is important
# so the model code is present in the docker build context
services:
  api:
    build:
      context: .
      dockerfile: api/Dockerfile
```
