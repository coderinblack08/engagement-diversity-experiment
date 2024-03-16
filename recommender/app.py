from flask import Flask, Response
from models import get_random_rec

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/random", methods=["GET"])
def random():
    return Response(get_random_rec().to_json(orient="records"), mimetype='application/json')