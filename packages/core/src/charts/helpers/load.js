export const linearGradient = `
        <defs>
            <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%" >
                <stop offset="0" stop-color="#ffffff" stop-opacity="0.8" />
                <stop offset="33.33%" stop-color="#ffffff" stop-opacity="0.8" />
                <stop offset="50%" stop-color="#ffffff" stop-opacity="0" />
                <stop offset="66.66%" stop-color="#ffffff" stop-opacity="0.8" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0.8" />
            </linearGradient>
        </defs>
    `;

export const barLoadingMarkup = `
        <svg class="load-state bar-load-state" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 711 325">
            ${linearGradient}
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(-15 29)">
                    <g stroke="#EFF2F5" stroke-dasharray="4 4">
                        <path d="M.400592911 200.302477L710.674315 200.302477M.400592884 131.172748L710.674315 131.172748M.324410282 64.2071321L710.621499 64.2071321M.291004517.563888874L709.82431.563888889"/>
                    </g>
                    <g fill="#D2D6DF" transform="translate(63.08 11)">
                        <polygon points="-.08 176 23.92 176 23.92 255 -.08 255"/>
                        <polygon points="50.829 147 74.829 147 74.829 255 50.829 255"/>
                        <polygon points="254.465 0 278.465 0 278.465 255 254.465 255"/>
                        <polygon points="458.102 169 482.102 169 482.102 255 458.102 255"/>
                        <polygon points="152.647 82 176.647 82 176.647 255 152.647 255"/>
                        <polygon points="356.283 66 380.283 66 380.283 255 356.283 255"/>
                        <polygon points="559.92 229 583.92 229 583.92 255 559.92 255"/>
                        <polygon points="101.738 115 125.738 115 125.738 255 101.738 255"/>
                        <polygon points="305.374 42 329.374 42 329.374 255 305.374 255"/>
                        <polygon points="509.011 201 533.011 201 533.011 255 509.011 255"/>
                        <polygon points="203.556 19 227.556 19 227.556 255 203.556 255"/>
                        <polygon points="407.192 115 431.192 115 431.192 255 407.192 255"/>
                    </g>
                </g>
                <polygon fill="#D2D6DF" fill-rule="nonzero" points="0 295 711 295 711 294 0 294"/>
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `;

export const donutLoadingMarkup = `
        <svg class="load-state donut-load-state" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376 331">
            ${linearGradient}
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(116 107)">
                    <circle cx="72" cy="72" r="72" stroke="#EFF2F5" stroke-linecap="round" stroke-width="9.6"/>
                    <path stroke="#D2D6DF" stroke-width="19.2" d="M126.153559,119.524055 C137.264629,106.845712 144,90.2321371 144,72.0444604 C144,32.2554036 111.764502,0 72,0"/>
                    <circle cx="72" cy="72" r="67.2" fill="#FFF"/>
                </g>
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `;

export const lineLoadingMarkup = `
        <svg
            class="load-state line-load-state"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 711 325"
        >
            ${linearGradient}
            <g transform="translate(-10 -10)">
                <path
                    id="chart-bg"
                    class="chart-bg"
                    style="stroke:#C3C6CF;"
                    d="M3.4,216.5h707.3 M3.4,160.5h707.3 M3.3,103.5h707.3 M3.3,48.5h707.6 M0.4,276.6H710H0.4z"
                />
                <polyline
                    id="chart-line"
                    class="chart-line"
                    style="stroke:#C3C6CF;stroke-width:4;fill:none;"
                    points="8.8,175.8 62.4,237.7 116.1,184.7 169.7,175.8 223.3,57 277,176.8 330.6,176.8 384.3,122.5 437.9,176.8 491.6,176.8 545.2,218.4 598.8,122.5 652.5,184.7 706.1,135.1 "
                />
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `;

export const stackedAreaLoadingMarkup = `
        <svg
            class="load-state stacked-area-load-state"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 711 325"
        >
            ${linearGradient}
            <path
                id="chart-bg"
                class="chart-bg"
                style="stroke:#C3C6CF;"
                d="M3.4,216.5h707.3 M3.4,160.5h707.3 M3.3,103.5h707.3 M3.3,48.5h707.6 M0.4,276.6H710H0.4z"
            />
            <g transform="translate(20 53)">
                <path
                    id="chart-area"
                    strokeLinecap="square"
                    d="M0.34233103,0.593688165 L709.977885,0.593688189"
                    transform="translate(.01 227.976)"
                />
                <path fill="#C3C6CF" d="M0.528124801,224.014648 L0.528124801,177.734375 L53.3834796,177.734375 C71.5390789,177.734375 86.8277373,168.972754 101.240241,151.662202 C112.578335,138.044258 121.139826,123.110227 136.974507,91.596773 C137.343842,90.8617404 139.300293,86.9654028 139.856735,85.8583549 C155.041692,55.6476711 163.354313,41.0906306 174.319873,27.7179171 C188.951312,9.87459412 204.885845,0.5 223.830634,0.5 C242.123071,0.5 257.291724,8.27027858 270.907992,23.1359289 C281.228683,34.4036118 289.135925,47.1272372 302.542017,72.085092 C303.275893,73.4513345 306.289669,79.0766612 307.063369,80.5168656 C321.41025,107.222876 330.088083,120.97663 341.470704,132.92446 C355.88994,148.05969 371.908861,155.792969 391.654853,155.792969 C412.142049,155.792969 428.763593,152.325614 442.880698,145.765582 C454.197328,140.506893 463.373931,133.679865 473.786035,123.626931 C476.528659,120.978915 486.44777,110.911455 488.791866,108.6483 C502.907223,95.0203436 514.194325,88.9355469 530.135322,88.9355469 C546.532652,88.9355469 559.505909,97.338499 575.973261,115.41103 C579.723508,119.526837 593.103621,135.086814 592.915496,134.871799 C605.09738,148.794859 614.368835,157.635549 625.072091,164.58539 C638.386599,173.230769 652.701021,177.734375 669.279853,177.734375 L673.779853,177.734375 L673.779853,224.014648 L0.528124801,224.014648 Z" />
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `;

export const sparkLineLoadingMarkup = `
        <svg
            class="load-state sparkline-load-state"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 711 325"
        >
            ${linearGradient}
            <g transform="translate(0 50)">
                <path fill="#C3C6CF" d="M0.528124801,224.014648 L0.528124801,177.734375 L53.3834796,177.734375 C71.5390789,177.734375 86.8277373,168.972754 101.240241,151.662202 C112.578335,138.044258 121.139826,123.110227 136.974507,91.596773 C137.343842,90.8617404 139.300293,86.9654028 139.856735,85.8583549 C155.041692,55.6476711 163.354313,41.0906306 174.319873,27.7179171 C188.951312,9.87459412 204.885845,0.5 223.830634,0.5 C242.123071,0.5 257.291724,8.27027858 270.907992,23.1359289 C281.228683,34.4036118 289.135925,47.1272372 302.542017,72.085092 C303.275893,73.4513345 306.289669,79.0766612 307.063369,80.5168656 C321.41025,107.222876 330.088083,120.97663 341.470704,132.92446 C355.88994,148.05969 371.908861,155.792969 391.654853,155.792969 C412.142049,155.792969 428.763593,152.325614 442.880698,145.765582 C454.197328,140.506893 463.373931,133.679865 473.786035,123.626931 C476.528659,120.978915 486.44777,110.911455 488.791866,108.6483 C502.907223,95.0203436 514.194325,88.9355469 530.135322,88.9355469 C546.532652,88.9355469 559.505909,97.338499 575.973261,115.41103 C579.723508,119.526837 593.103621,135.086814 592.915496,134.871799 C605.09738,148.794859 614.368835,157.635549 625.072091,164.58539 C638.386599,173.230769 652.701021,177.734375 669.279853,177.734375 L773.779853,177.734375 L773.77853,204.014648 L0.528124801,204.014648 Z"/>    
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `;

export const brushLoadingMarkup = `
        <svg
            class="load-state brush-load-state"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 711 325"
        >
            ${linearGradient}
            <g transform="translate(0 50)">
                <path
                    id="chart-area"
                    strokeLinecap="square"
                    d="M0.34233103,0.593688165 L709.977885,0.593688189"
                    transform="translate(.01 227.976)"
                />
                <path fill="#C3C6CF" d="M0.528124801,224.014648 L0.528124801,177.734375 L53.3834796,177.734375 C71.5390789,177.734375 86.8277373,168.972754 101.240241,151.662202 C112.578335,138.044258 121.139826,123.110227 136.974507,91.596773 C137.343842,90.8617404 139.300293,86.9654028 139.856735,85.8583549 C155.041692,55.6476711 163.354313,41.0906306 174.319873,27.7179171 C188.951312,9.87459412 204.885845,0.5 223.830634,0.5 C242.123071,0.5 257.291724,8.27027858 270.907992,23.1359289 C281.228683,34.4036118 289.135925,47.1272372 302.542017,72.085092 C303.275893,73.4513345 306.289669,79.0766612 307.063369,80.5168656 C321.41025,107.222876 330.088083,120.97663 341.470704,132.92446 C355.88994,148.05969 371.908861,155.792969 391.654853,155.792969 C412.142049,155.792969 428.763593,152.325614 442.880698,145.765582 C454.197328,140.506893 463.373931,133.679865 473.786035,123.626931 C476.528659,120.978915 486.44777,110.911455 488.791866,108.6483 C502.907223,95.0203436 514.194325,88.9355469 530.135322,88.9355469 C546.532652,88.9355469 559.505909,97.338499 575.973261,115.41103 C579.723508,119.526837 593.103621,135.086814 592.915496,134.871799 C605.09738,148.794859 614.368835,157.635549 625.072091,164.58539 C638.386599,173.230769 652.701021,177.734375 669.279853,177.734375 L673.779853,177.734375 L673.779853,224.014648 L0.528124801,224.014648 Z" />
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `;

/**
 * Builds the heatmap's grid of placeholder boxes. Generated rather than written
 * out so the skeleton stays readable -- it is 60 rects.
 * @private
 */
const heatmapLoadingBoxes = () => {
    const columns = 12;
    const rows = 5;
    const size = 46;
    const gap = 10;
    const boxes = [];

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            boxes.push(
                `<rect x="${column * (size + gap)}" y="${
                    row * (size + gap)
                }" width="${size}" height="${size}" rx="2" fill="#C3C6CF" />`
            );
        }
    }

    return boxes.join('\n                ');
};

export const heatmapLoadingMarkup = `
        <svg
            class="load-state heatmap-load-state"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 711 325"
        >
            ${linearGradient}
            <g transform="translate(45 45)">
                ${heatmapLoadingBoxes()}
            </g>
            <g fill="#EFF2F5">
                <rect x="0" y="57" width="30" height="10" rx="2" />
                <rect x="0" y="113" width="30" height="10" rx="2" />
                <rect x="0" y="169" width="30" height="10" rx="2" />
                <rect x="0" y="225" width="30" height="10" rx="2" />
                <rect x="0" y="281" width="30" height="10" rx="2" />
                <rect x="45" y="20" width="46" height="10" rx="2" />
                <rect x="213" y="20" width="46" height="10" rx="2" />
                <rect x="381" y="20" width="46" height="10" rx="2" />
                <rect x="549" y="20" width="46" height="10" rx="2" />
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `;

export const bulletLoadingMarkup = `
        <svg
            class="load-state bullet-load-state"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 711 325"
        >
            ${linearGradient}
            <g transform="translate(0 118)">
                <rect width="711" height="64" rx="2" fill="#EFF2F5" />
                <rect y="18" width="430" height="28" rx="2" fill="#C3C6CF" />
                <rect x="556" y="8" width="6" height="48" rx="2" fill="#C3C6CF" />
            </g>
            <g fill="#EFF2F5" transform="translate(0 202)">
                <rect x="0" width="34" height="10" rx="2" />
                <rect x="169" width="34" height="10" rx="2" />
                <rect x="338" width="34" height="10" rx="2" />
                <rect x="507" width="34" height="10" rx="2" />
                <rect x="677" width="34" height="10" rx="2" />
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `;

export const scatterPlotLoadingMarkup = `
        <svg
            class="load-state scatter-plot-load-state"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 711 325"
        >
            ${linearGradient}
            <g stroke="#EFF2F5" stroke-dasharray="4 4">
                <path d="M0 40.5L711 40.5M0 110.5L711 110.5M0 180.5L711 180.5M0 250.5L711 250.5" />
            </g>
            <g fill="#C3C6CF">
                <circle cx="62" cy="232" r="12" />
                <circle cx="118" cy="188" r="18" />
                <circle cx="171" cy="246" r="9" />
                <circle cx="214" cy="141" r="14" />
                <circle cx="263" cy="205" r="21" />
                <circle cx="319" cy="97" r="11" />
                <circle cx="352" cy="169" r="16" />
                <circle cx="408" cy="223" r="10" />
                <circle cx="447" cy="126" r="19" />
                <circle cx="502" cy="182" r="13" />
                <circle cx="549" cy="71" r="15" />
                <circle cx="587" cy="214" r="9" />
                <circle cx="631" cy="152" r="17" />
                <circle cx="676" cy="199" r="11" />
            </g>
            <g stroke="#EFF2F5" stroke-width="2">
                <path d="M0 290.5L711 290.5" />
            </g>
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `;

export default {
    linearGradient,
    barLoadingMarkup,
    donutLoadingMarkup,
    lineLoadingMarkup,
    brushLoadingMarkup,
    sparkLineLoadingMarkup,
    stackedAreaLoadingMarkup,
    bulletLoadingMarkup,
    heatmapLoadingMarkup,
    scatterPlotLoadingMarkup,
};
