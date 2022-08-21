import json
import random
import time

from flask import Flask

app = Flask(__name__)

@app.route('/api/post-views/<string:id>', methods=["GET"])
def index(id: str):
    time.sleep(1)
    return json.dumps({"views": random.randint(1, 10000)})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
