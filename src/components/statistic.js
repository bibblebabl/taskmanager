import AbstractComponent from './abstract-component';

export default class Statistic extends AbstractComponent {
  getTemplate() {
    return `
    <section class="statistic container">
      <div class="statistic__line">
        <div class="statistic__period">
          <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

          <div class="statistic-input-wrap">
            <input
              class="statistic__period-input"
              type="text"
              placeholder="01 Feb - 08 Feb"
            />
          </div>

          <p class="statistic__period-result">
            In total for the specified period
            <span class="statistic__task-found">0</span> tasks were fulfilled.
          </p>
        </div>
        <div class="statistic__line-graphic visually-hidden">
          <canvas class="statistic__days" width="550" height="150"></canvas>
        </div>
      </div>

      <div class="statistic__circle">
        <div class="statistic__tags-wrap visually-hidden">
          <canvas class="statistic__tags" width="400" height="300"></canvas>
        </div>
        <div class="statistic__colors-wrap visually-hidden">
          <canvas class="statistic__colors" width="400" height="300"></canvas>
        </div>
      </div>
    </section>
    `.trim();
  }
}
