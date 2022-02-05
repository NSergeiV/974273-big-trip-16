import dayjs from 'dayjs';
import duration from '../../node_modules/dayjs/plugin/duration.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart-view.js';
import {removeRepetitions, addUpPrices, searchAllTrips, searchAllTime} from '../utils/statistics.js';

dayjs.extend(duration);

const renderMoneyChart = (moneyCtx, points) => {

  const selectTransportTypes = points.map((point) => point.eventType);
  const typesTransport = removeRepetitions(selectTransportTypes);
  const costsByType = addUpPrices(typesTransport, points);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: typesTransport,
      datasets: [{
        data: costsByType,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, points) => {

  const selectTransportTypes = points.map((point) => point.eventType);
  const typesTransport = removeRepetitions(selectTransportTypes);
  const identicalTypes = searchAllTrips(typesTransport, selectTransportTypes);

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: typesTransport,
      datasets: [{
        data: identicalTypes,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimsChart = (timeCtx, points) => {

  const selectTransportTypes = points.map((point) => point.eventType);
  const typesTransport = removeRepetitions(selectTransportTypes);
  const timeByType = searchAllTime(typesTransport, points);

  const transform = (namber) => {
    const durationTime = dayjs.duration(namber, 'm');
    const daysdurationTime = `${durationTime.$d.days < 10 ? `${durationTime.$d.days === 0 ? '' : `0${durationTime.$d.days}D`}` : `${durationTime.$d.days}D`}`;
    const hoursdurationTime = `${durationTime.$d.hours < 10 ? `0${durationTime.$d.hours}H` : `${durationTime.$d.hours}H`}`;
    const minutesdurationTime = `${durationTime.$d.hours < 10 ? `0${durationTime.$d.hours}M` : `${durationTime.$d.hours}M`}`;
    return `${daysdurationTime} ${hoursdurationTime} ${minutesdurationTime}`;
  };

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: typesTransport,
      datasets: [{
        data: timeByType,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${transform(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME-SPEND',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsBlockMenuTemplate = () => (
  `<section class="statistics">
    <h2>Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="500"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`
);

export default class StatisticsView extends SmartView {
  #pricesChart = null;
  #typesChart = null;
  #timsChart = null;

  constructor(points) {
    super();

    this._data = points;

    this.setCharts();
  }

  get template() {
    return createStatisticsBlockMenuTemplate();
  }

  removeElement() {
    super.removeElement();

    if (this.#pricesChart !== null || this.#typesChart !== null || this.#timsChart !== null) {
      this.#pricesChart = null;
      this.#typesChart = null;
      this.#timsChart = null;
    }
  }

  restoreHandlers() {
    this.setCharts();
  }

  setCharts() {

    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time-spend');

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    if (this.#pricesChart !== null || this.#typesChart !== null || this.#timsChart !== null) {
      this.#pricesChart = null;
      this.#typesChart = null;
      this.#timsChart = null;
    }

    this.#pricesChart = renderMoneyChart(moneyCtx, this._data);
    this.#typesChart = renderTypeChart(typeCtx, this._data);
    this.#timsChart = renderTimsChart(timeCtx, this._data);
  }
}
