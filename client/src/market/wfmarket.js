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
        return this.max_price - this.median;
    }

    getSellMargin() {
        return this.median - this.min_price;
    }
}

export async function getStats(item)  {
    const url = `http://localhost:5000/${item}/statistics`;
    const resp = await fetch(url);
    const parsed = await resp.json();
    const stats = parsed["payload"]["statistics_closed"]["90days"];

    let res = [];
    stats.forEach(stat => {
        let date = moment(stat.datetime);
        res.push(new ItemStatistic(item, date, stat.volume, stat.max_price, stat.min_price,
            stat.median, stat.moving_avg));
    });
    return res;
}
