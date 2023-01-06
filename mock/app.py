import functools
import json
import random
import time
from datetime import datetime, timedelta
from typing import TypedDict

import flask
import requests


class Post(TypedDict):
    id: str
    title: str
    date: str
    views: int


@functools.cache
def get_word_list() -> list[str]:
    response = requests.get("https://www.mit.edu/~ecprice/wordlist.10000")
    return [s.decode("utf-8") for s in response.content.splitlines()]


def generate_random_words(n: int) -> list[str]:
    return random.sample(get_word_list(), n)


def random_date() -> datetime:
    start_date = datetime(year=2022, month=1, day=1)
    return start_date + timedelta(days=random.randint(1, 365))


def generate_posts(n: int) -> list[Post]:
    posts = []
    for _ in range(n):
        words = generate_random_words(5)
        posts.append({
            "id": "-".join(words),
            "title": " ".join(words).capitalize(),
            "date": random_date().strftime("%Y-%m-%d"),
            "views": random.randint(1, 10000),
        })

    return posts


app = flask.Flask(__name__)
app.before_request(lambda: time.sleep(1))  # simulate loading time


@app.route("/api/post-views/<string:id>", methods=["GET"])
def post_views(id: str):
    return json.dumps({"views": random.randint(1, 10000)})


@app.route("/api/top-posts", methods=["GET"])
def top_posts():
    sorted_posts = sorted(
        generate_posts(3),
        key=lambda p: p["views"],
        reverse=True
    )
    return flask.jsonify(sorted_posts)


@app.route("/api/recent-posts", methods=["GET"])
def recent_posts():
    sorted_posts = sorted(
        generate_posts(3),
        key=lambda p: datetime.strptime(p["date"], "%Y-%m-%d"),
        reverse=True
    )
    return flask.jsonify(sorted_posts)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
