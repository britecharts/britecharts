import { barData } from './data.js';

// Shared by every page: only how `bar` and `container` were obtained differs.
export function drawBar(bar, container) {
    const barChart = bar()
        .margin({ left: 100 })
        .isHorizontal(true)
        .height(400)
        .width(600);

    container.datum(barData).call(barChart);
}
