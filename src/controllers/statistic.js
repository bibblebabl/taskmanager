import Chart from 'chart.js';
import flatpickr from 'flatpickr';

import Statistic from '../components/statistic';

// Utils
import {render, toggleVisuallyHidden, classListActions} from '../utils/render';
import {getStatisticValues, getMappedDueDateStatistic, filterTasksByDateRange, getStatisticCount} from '../utils/statistic';
import {getDefaultStatisticDateRange, getRangeDateTimeSting} from '../utils/format';

// import {getMainFiltersList} from '../data';
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

    this._renderDaysChart(daysCanvasElement, tasks);
    this._renderTagsChart(tagsCanvasElement, tasks);
    this._renderColorsChart(colorsCanvasElement, tasks);
  }

  _renderDaysChart(container, tasks) {
    const tasksByDay = getMappedDueDateStatistic(tasks);
    const labels = Object.keys(tasksByDay);
    const data = Object.values(tasksByDay);

    return new Chart(container, {
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
    const tasksbyTags = getStatisticCount(tasks, `tags`);
    const labels = Object.keys(tasksbyTags);
    const data = Object.values(tasksbyTags);

    return new Chart(container, {
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
    const byColor = getStatisticCount(tasks, `color`);
    const labels = Object.keys(byColor);
    const data = Object.values(byColor);

    return new Chart(container, {
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
