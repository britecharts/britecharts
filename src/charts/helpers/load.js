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

export const bar = `
        <svg class="load-state bar-load-state" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 711 325">
            ${linearGradient}
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(0 29)">
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

export const donut = `
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

export const line = `
        <svg
            class="load-state line-load-state"
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
            <polyline
                id="chart-line"
                class="chart-line"
                style="stroke:#C3C6CF;stroke-width:4;fill:none;"
                points="8.8,175.8 62.4,237.7 116.1,184.7 169.7,175.8 223.3,57 277,176.8 330.6,176.8 384.3,122.5 437.9,176.8 491.6,176.8 545.2,218.4 598.8,122.5 652.5,184.7 706.1,135.1 "
            />
            <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>
        </svg>
    `;

export const stackedArea = `
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
            <g transform="translate(20 50)">
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

export default {
    linearGradient,
    bar,
    donut,
    line,
    stackedArea,
};
