import tooltip from '../tooltip/tooltip';

// The single-value preset of the tooltip: the same component with the
// single layout, no title and a `.2f` number format, for the bar, scatter
// plot, heatmap and donut charts. Documented on the tooltip's API page
// (a plain comment on purpose: one page for the one component).
export default function module() {
    return tooltip().layout('single').title('').numberFormat('.2f');
}
