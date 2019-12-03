define(function (require) {

    const d3Selection = require('d3-selection');
    const filterId = 'highlight-filter';


    const createFilterContainer = (metadataSelection) => {
        let highlightFilter = metadataSelection
          .append('defs')
            .append('filter')
            .attr('id', filterId);

        return highlightFilter;
    };

    const createGausianBlur = (filterSelector) => {
        filterSelector
          .append('feGaussianBlur')
            .attr('stdDeviation', 1)
            .attr('result', 'coloredBlur');

        return filterId;
    };

    const createGlow = (filterSelector) => {
        filterSelector
            .attr('x', '-30%')
            .attr('y', '-30%')
            .attr('width', '160%')
            .attr('height', '160%');

        filterSelector
          .append('feGaussianBlur')
            .attr('stdDeviation', '0.9 0.9')
            .attr('result', 'glow');

        let merge = filterSelector
          .append('feMerge');

        merge
          .append('feMergeNode')
            .attr('in', 'glow');

        merge
          .append('feMergeNode')
            .attr('in', 'glow');

        merge
          .append('feMergeNode')
            .attr('in', 'glow');

        return filterId;
    };

    const createGlowWithMatrix = (filterSelector) => {
        let colorMatrix = '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0';

        filterSelector
            .attr('x', '-500%')
            .attr('y', '-500%')
            .attr('width', '1800%')
            .attr('height', '1800%');

        filterSelector
          .append('feColorMatrix')
            .attr('type', 'matrix')
            .attr('values', colorMatrix);

        filterSelector
          .append('feGaussianBlur')
            .attr('stdDeviation', '1')
            .attr('result', 'coloredBlur')
            .attr('in', 'SourceGraphic');

        let merge = filterSelector
          .append('feMerge');

        merge
          .append('feMergeNode')
            .attr('in', 'coloredBlur');

        merge
          .append('feMergeNode')
            .attr('in', 'SourceGraphic');

        return filterId;
    }

    const createWhiteGlow = (filterSelector) => {
        filterSelector
            .attr('x', '-5000%')
            .attr('y', '-5000%')
            .attr('width', '10000%')
            .attr('height', '10000%');

        filterSelector
          .append('feFlood')
            .attr('result', 'flood')
            .attr('flood-color', '#ffffff')
            .attr('flood-opacity', '1');

        filterSelector
          .append('feComposite')
            .attr('result', 'mask')
            .attr('in2', 'SourceGraphic')
            .attr('operator', 'in')
            .attr('in', 'flood');

        filterSelector
          .append('feMorphology')
            .attr('result', 'dilated')
            .attr('operator', 'dilate')
            .attr('radius', '2')
            .attr('in', 'mask');

        filterSelector
          .append('feGaussianBlur')
            .attr('result', 'blurred')
            .attr('stdDeviation', '5')
            .attr('in', 'dilated');

        let merge = filterSelector
          .append('feMerge');

        merge
          .append('feMergeNode')
            .attr('in', 'blurred');

        merge
          .append('feMergeNode')
            .attr('in', 'SourceGraphic');

        return filterId;
    };

    const bounceCircleHighlight = (el, ease, radius, bounceRadius = radius * 2) => {
        const duration = 100;
        const delay = 50;

        el
          .transition()
            .ease(ease)
            .duration(duration)
            .attr('r', bounceRadius)
            .transition()
              .ease(ease)
              .delay(delay)
              .duration(duration)
              .attr('r', radius);
    }

    return {
        bounceCircleHighlight,
        createFilterContainer,
        createGausianBlur,
        createWhiteGlow,
        createGlow,
        createGlowWithMatrix,
    };
});
