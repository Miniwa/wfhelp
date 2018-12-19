import requests

_URL = "https://api.warframe.market/v1"


def MarketError(Exception):
    pass


def get_statistics(item):
    url = "{0}/items/{1}/statistics".format(_URL, item)
    resp = requests.get(url)

    if not resp.ok:
        raise MarketError("Unexpected HTTP status.")

    stats = resp.json()
    if "error" in stats:
        raise MarketError("Market api error: {0}".format(stats.error))

    return stats
