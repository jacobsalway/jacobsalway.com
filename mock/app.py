import datetime
import functools
import json
import random
import time
import requests

from flask import Flask


@functools.cache
def get_word_list() -> list[str]:
    response = requests.get("https://www.mit.edu/~ecprice/wordlist.10000")
    return [s.decode("utf-8") for s in response.content.splitlines()]


def generate_random_words(n: int) -> str:
    words = get_word_list()
    return random.sample(words, n)


def generate_post() -> dict:
    words = generate_random_words(5)
    return {
        "id": "-".join(words),
        "title": " ".join(words).capitalize(),
        "date": datetime.datetime.today().strftime("%Y-%m-%d"),
        "views": random.randint(1, 10000),
    }


app = Flask(__name__)
app.before_request(lambda: time.sleep(1))  # simulate loading time


@app.route("/api/post-views/<string:id>", methods=["GET"])
def post_views(id: str):
    return json.dumps({"views": random.randint(1, 10000)})


@app.route("/api/top-posts", methods=["GET"])
def top_posts():
    posts = [generate_post() for _ in range(3)]
    sorted_posts = sorted(posts, key=lambda p: p["views"], reverse=True)
    return json.dumps(sorted_posts)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
