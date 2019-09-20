import Chart from 'chart.js';
import flatpickr from 'flatpickr';

import Statistic from '../components/statistic';

// Utils
import {render, toggleVisuallyHidden, classListActions} from '../utils/render';
import {getStatisticValues, getMappedDueDateStatistic, filterTasksByDateRange} from '../utils/statistic';
import {getDefaultStatisticDateRange, getRangeDateTimeSting} from '../utils/format';

import {getMainFiltersList} from '../data';
import {chartDatasets, chartOptions} from '../config';

export default class StatisticController {
  constructor({container}) {
    this._container = container;
    this._statisticComponent = new Statistic();

    this._defaultRange = getDefaultStatisticDateRange();

    this._tasks = [];
    this._init();

    this._onDateRangeChange = this._onDateRangeChange.bind(this);
  }

  _init() {
    this.hide();
    render(this._container, this._statisticComponent.getElement());

    flatpickr(this._statisticComponent.getElement().querySelector(`.statistic__period-input`), {
      mode: `range`,
      maxDate: `today`,
      dateFormat: `Y-m-d`,
      defaultDate: [getRangeDateTimeSting(this._defaultRange.weekAgo), getRangeDateTimeSting(this._defaultRange.today)],
      onChange: this._onDateRangeChange.bind(this)
    });
  }

  _onDateRangeChange(selectedDates) {
    if (selectedDates.length === 2) {
      const filteredTasksByDate = filterTasksByDateRange(this._tasks, selectedDates[0].getTime(), selectedDates[1].getTime());
      this._renderCharts(filteredTasksByDate);
    }
  }

  show(tasks) {
    this._tasks = tasks;

    const {weekAgo, today} = this._defaultRange;
    const weekTasks = filterTasksByDateRange(this._tasks, weekAgo, today);

    if (this._statisticComponent.getElement().classList.contains(`visually-hidden`)) {
      toggleVisuallyHidden(this._statisticComponent.getElement());
    }

    this._renderCharts(weekTasks);
  }

  hide() {
    toggleVisuallyHidden(this._statisticComponent.getElement(), classListActions.ADD);
  }

  _renderCharts(tasks) {
    const tagsCanvasElement = this._statisticComponent.getElement().querySelector(`.statistic__tags`);
    const colorsCanvasElement = this._statisticComponent.getElement().querySelector(`.statistic__colors`);
    const daysCanvasElement = this._statisticComponent.getElement().querySelector(`.statistic__days`);

    this._renderDays(daysCanvasElement, tasks);
    this._renderTagsChart(tagsCanvasElement, tasks);
    this._renderColorsChart(colorsCanvasElement, tasks);
  }

  _renderDays(container, tasks) {
    const tasksGroupedByDay = getMappedDueDateStatistic(tasks);
    const labels = tasksGroupedByDay.map((el) => el.dueDate);
    const data = tasksGroupedByDay.map((el) => el.count);

    const tagsChart = new Chart(container, {
      type: `line`,
      data: {
        labels,
        datasets: [{
          data,
          label: `Done by Days`,
          backgroundColor: chartDatasets.backgroundColor,
          borderColor: chartDatasets.borderColor,
          borderWidth: chartDatasets.borderWidth
        }]
      },
      options: chartOptions
    });
  }
  _renderTagsChart(container, tasks) {
    const tasksGroupedByTags = getMainFiltersList(tasks);
    const labels = tasksGroupedByTags.map((el) => el.title);
    const data = tasksGroupedByTags.map((el) => el.count);

    const tagsChart = new Chart(container, {
      type: `doughnut`,
      data: {
        labels,
        datasets: [{
          label: `Done by Tags`,
          data,
          backgroundColor: chartDatasets.backgroundColor,
          borderColor: chartDatasets.borderColor,
          borderWidth: chartDatasets.borderWidth
        }]
      },
      options: chartOptions
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
          label: `Done by Colors`,
          data,
          backgroundColor: labels,
          borderWidth: 1
        }]
      }
    });
  }
}
