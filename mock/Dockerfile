FROM python:3.9-slim-buster

WORKDIR /app

RUN pip install flask

COPY . .

ENTRYPOINT [ "python" ]
CMD [ "app.py" ]