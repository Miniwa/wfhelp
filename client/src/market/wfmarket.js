import rp from 'request-promise';
import moment from 'moment';

class ItemStatistic {
    constructor(name, date, volume, max_price, min_price, median, moving_average) {
        this.name = name;
        this.date = date;
        this.volume = volume
        this.max_price = max_price;
        this.min_price = min_price;
        this.median = median;
        this.moving_average = moving_average;
    }

    getBuyMargin() {
        return this.max_price - this.moving_average;
    }

    getSellMargin() {
        return this.moving_average - this.min_price;
    }
}

export async function getStats(item)  {
    const url = `https://cors-anywhere.herokuapp.com/https://api.warframe.market/v1/items/${item}/statistics`;
    const resp = await rp.get(url);
    const parsed = JSON.parse(resp);
    const stats = parsed["payload"]["statistics_closed"]["90days"];

    let res = [];
    stats.forEach(stat => {
        let date = moment(stat.datetime);
        res.push(new ItemStatistic(item, date, stat.volume, stat.max_price, stat.min_price,
            stat.median, Math.round(stat.moving_avg)));
    });
    return res;
}
