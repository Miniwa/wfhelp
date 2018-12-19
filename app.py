import requests
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)


@app.route("/<item>/statistics")
@cross_origin(origin="localhost")
def statistics(item):
    url = "https://api.warframe.market/v1/items/{0}/statistics".format(item)
    resp = requests.get(url)
    stats = resp.json()
    return jsonify(stats)
