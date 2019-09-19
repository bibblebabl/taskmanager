import Chart from 'chart.js';

import {toggleVisuallyHidden, classListActions} from '../utils/render';
import {getStatisticValues} from '../utils';

export default class StatisticController {
  constructor({component, filters}) {
    this._component = component;
    this._filters = filters;

    this._tasks = [];

    this._init();
  }

  _init() {
    this.hide();
  }

  hide() {
    toggleVisuallyHidden(this._component.getElement(), classListActions.ADD);
  }

  show(tasks) {
    this._tasks = tasks;

    if (this._component.getElement().classList.contains(`visually-hidden`)) {
      toggleVisuallyHidden(this._component.getElement());
    }

    const statisticTagsCanvasElement = this._component.getElement().querySelector(`.statistic__tags`);
    const statisticColorsCanvasElement = this._component.getElement().querySelector(`.statistic__colors`);

    this._renderTagsChart(statisticTagsCanvasElement, this._tasks);
    this._renderColorsChart(statisticColorsCanvasElement, this._tasks);

  }

  _renderTagsChart(container, tasks) {
    const labels = this._filters.map((el) => el.title);
    const data = this._filters.map((el) => el.count);

    const tagsChart = new Chart(container, {
      type: `doughnut`,
      data: {
        labels,
        datasets: [{
          label: `# of Votes`,
          data,
          backgroundColor: [
            `rgba(255, 99, 132, 0.2)`,
            `rgba(54, 162, 235, 0.2)`,
            `rgba(255, 206, 86, 0.2)`,
            `rgba(75, 192, 192, 0.2)`,
            `rgba(153, 102, 255, 0.2)`,
            `rgba(255, 159, 64, 0.2)`
          ],
          borderColor: [
            `rgba(255, 99, 132, 1)`,
            `rgba(54, 162, 235, 1)`,
            `rgba(255, 206, 86, 1)`,
            `rgba(75, 192, 192, 1)`,
            `rgba(153, 102, 255, 1)`,
            `rgba(255, 159, 64, 1)`
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  _renderColorsChart(container, tasks) {
    const colors = getStatisticValues(tasks, `color`);
    const data = colors.map((el) => el.count);
    const labels = colors.map((el) => el.color);

    const colorsChart = new Chart(container, {
      type: `pie`,
      data: {
        labels,
        datasets: [{
          label: `# of Colors`,
          data,
          backgroundColor: labels,
          borderWidth: 1
        }]
      }
    });
  }
}
