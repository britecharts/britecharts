// TODO: Document d3 objects rather than using *
// TODO: Add bi-directional accessors for 2d grid, and determine naming (H/V vs. X/Y)
// TODO: Refactor positioning animation functions into helpers

define(function(require) {
    'use strict';

    const { scaleLinear } = require('d3-scale');
    const { classArray } = require('./classes');

    // Opacity for fade in/out
    const EPSILON = 1e-6;

    // Direction orientations
    const DIR = {
        H: 'horizontal',
        V: 'vertical'
    }

    /**
     * Higher order function that returns the default positioning function for continuous scales
     * The +0.5 avoids anti-aliasing artifacts
     * @param {*} scale - Scale for positioning
     * @return {function}
     */
    function positionNumber(scale) {
        return d => +scale(d) + 0.5;
    }

    /**
     * Higher order function that returns the positioning function for bandwidth scales
     * Also adjusted for anti-aliasing
     * @param {*} scale - Scale for positioning
     * @return {function}
     */
    function positionCenter(scale) {
        let offset = Math.max(0, scale.bandwidth() - 1) / 2;

        if (scale.round()) offset = Math.round(offset);
        return d => +scale(d) + offset + 0.5;
    }

    /**
     * Constructor for a one-dimensional grid helper
     * @param {string} orient - orientation string to define the direction
     * @param {*} scaleY - d3 scale for the grid's ticks
     * @return {gridBaseGenerator}
     */
    function gridBase(orient, scale) {
        let range = [0, 1],
            offsetStart = 0,
            offsetEnd = 0,
            hideEdges = false,
            ticks = null,
            tickValues = null,
            
            // Create a class array helper for producing class lists
            classArr = classArray('grid', orient),

            // Manage horizontal and vertical directions by setting the a parameter
            // to use in svg attributes
            x = orient === DIR.H ? 'x' : 'y',
            y = orient === DIR.H ? 'y' : 'x';

        /**
         * Generator function for one-dimensional grid
         * @param {*} context - d3 selection or transition to use as the container
         */
        function gridBaseGenerator(context) {
            let values = getValues(),

                // Get the appropriate function to position the lines, based on scale type
                // Pass a duplicate scale to ensure position values are fixed until grid updated
                position = (scale.bandwidth ? positionCenter : positionNumber)(scale.copy()),

                // Set parameter to ensure correct line offset positions for inverted ranges 
                k = range[range.length - 1] >= range[0]? 1 : -1,

                // If passed a transition, convert to selection
                selection = context.selection ? context.selection() : context,

                // Set up container element
                initContainer = selection.selectAll(classArr.asSelector()).data([null]),
                container = initContainer.merge(
                   initContainer.enter().append('g').attr('class', classArr.asList())
                ),

                // Set up line selections
                line = container.selectAll('line').data(values, scale).order(),
                lineExit = line.exit(),
                lineEnter = line.enter().append('line').attr('stroke', '#000');

            line = line.merge(lineEnter);

            // Run animations only if grid was called on a transition
            if (context !== selection) {
                line = line.transition(context);

                lineExit = lineExit.transition(context)
                    .attr('opacity', EPSILON)
                    .attr(y + '1', function(d) { return isFinite(d = position(d)) ? d : this.getAttribute(y + '1') })
                    .attr(y + '2', function(d) { return isFinite(d = position(d)) ? d : this.getAttribute(y + '2') });

                lineEnter = lineEnter
                    .attr('opacity', EPSILON)
                    .attr(y + '1', function(d) { let p = this.parentNode.__pos; return p && isFinite(p = p(d)) ? p : position(d); })
                    .attr(y + '2', function(d) { let p = this.parentNode.__pos; return p && isFinite(p = p(d)) ? p : position(d); });
            }

            lineExit.remove();

            line
                .attr('opacity', 1)
                .attr(x + '1', +range[0] - k * offsetStart)
                .attr(x + '2', +range[range.length - 1] + k * offsetEnd)
                .attr(y + '1', d => position(d))
                .attr(y + '2', d => position(d));

            // Attach the positioning function as a property of the container element 
            // This stores it for future use as the starting point for the lineEnter transition
            // Cannot use arrow function as this must refer to the element
            container.each(function() {
                this.__pos = position;
            });
        }

        // HELPERS

        /**
         * Extract the tick values and adjust for edge hiding
         * @private
         */
        function getValues() {
            let hideFirst = hideEdges === true || hideEdges === 'both' || hideEdges === 'first',
                hideLast = hideEdges === true || hideEdges === 'both' || hideEdges === 'last',
                values = tickValues === null ? scaleTicks() : tickValues.slice();

            if (hideFirst) values.shift();
            if (hideLast) values.pop();

            return values;
        }

        /**
         * Get the tick values from the underlying scales
         * @private
         */
        function scaleTicks() {
            let scaleTicks;

            if (scale.ticks) {
                scaleTicks = scale.ticks.apply(scale, ticks ? [ticks] : []);
            } else {
                scaleTicks = scale.domain();
            }

            return scaleTicks.slice();
        }

        // API

        /**
         * Gets or sets the scale
         * Scale applies the ticks to the grid
         * @param {*} [_] - d3 scale instance
         * @return {*|gridBaseGenerator}
         * @public
         */
        gridBaseGenerator.scale = function(_) {
            if (!arguments.length) {
                return scale;
            }
            scale = _;

            return gridBaseGenerator;
        };

        /**
         * Gets or sets the range
         * Governs the underlying length and positioning of the grid lines relative to the container
         * Should usually be set to the output range from the orthogonal scale in a 2D chart
         * @param {number[]} [_] - Array representing the output range
         * @return {*|gridBaseGenerator}
         * @public
         */
        gridBaseGenerator.range = function(_) {
            if (!arguments.length) {
                return range;
            }
            range = _;

            return gridBaseGenerator;
        }

        /**
         * Gets or sets the start offset
         * Start offset is the distance before the start position of the scale's range that the grid will render
         * @param {number} [_] - Offset in px
         * @return {*|gridBaseGenerator}
         * @public
         */
        gridBaseGenerator.offsetStart = function(_) {
            if (!arguments.length) {
                return offsetStart;
            }
            offsetStart = _;

            return gridBaseGenerator;
        }
    
        /**
         * Gets or sets the end offset
         * End offset is the distance after the end position of the scale's range that the grid will render
         * @param {number} [_] - Offset in px
         * @return {*|gridBaseGenerator}
         * @public
         */
        gridBaseGenerator.offsetEnd = function(_) {
            if (!arguments.length) {
                return offsetEnd;
            }
            offsetEnd = _;

            return gridBaseGenerator;
        }

        /**
         * Gets or sets the hideEdges parameter
         * Determines if the first and last grid line are suppressed
         * True or 'both' suppress both edges, 'first' and 'last' suppress the grid line
         * corresponding to the first and last tick value respectively
         * @param {boolean|string} [_] - hideEdges parameter, accepts boolean and 'both', 'first', or 'last' strings
         * @return {boolean|string|gridBaseGenerator}
         * @public
         */
        gridBaseGenerator.hideEdges = function(_) {
            if (!arguments.length) {
                return hideEdges;
            }
            hideEdges = _;

            return gridBaseGenerator;
        }

        /**
         * Gets or sets the tick count
         * Mirrors d3 axis' ticks API method
         * @param {number} [_] - Approximate tick count
         * @return {number|gridBaseGenerator}
         * @public
         */
        gridBaseGenerator.ticks = function(_) {
            if (!arguments.length) {
                return ticks;
            }
            ticks = _;

            return gridBaseGenerator;
        };

        /**
         * Gets or sets the tick values
         * Mirrors d3 axis' tickValues API method
         * @param {number[]} [_] - Array of domain values to place ticks
         * @return {number[]|gridBaseGenerator}
         * @public
         */
        gridBaseGenerator.tickValues = function(_) {
            if (!arguments.length) {
                return tickValues && tickValues.slice();
            }
            tickValues = _ === null ? null : [..._].slice()

            return gridBaseGenerator;
        };

        return gridBaseGenerator;
    }

    /**
     * Constructor for a two-dimensional grid helper
     * @param {*} scaleX - d3 scale for the grid's x direction
     * @param {*} scaleY - d3 scale for the grid's y direction
     * @return {gridGenerator}
     */
    function grid(scaleX, scaleY) {
        let gridH = gridHorizontal(scaleY || scaleLinear()),
            gridV = gridVertical(scaleX || scaleLinear()),
            direction = 'full',
            tickValuesX = null,
            tickValuesY = null;
            
        /**
         * Generator function for two-dimensional grid
         * @param {*} context - d3 selection or transition to use as the container
         */
        function gridGenerator(context) {
            (direction === 'full' || direction === 'horizontal')
                ? gridH.tickValues(tickValuesY).range(scaleX.range())
                : gridH.tickValues([]);

            (direction === 'full' || direction === 'vertical')
                ? gridV.tickValues(tickValuesX).range(scaleY.range())
                : gridV.tickValues([]);

            context.call(gridH).call(gridV);
        }

        // API

        /**
         * Gets or sets the x-scale
         * X-scale applies ticks to the vertical grid and range to the horizontal grid
         * @param {*} [_] - d3 scale instance
         * @return {*|gridGenerator}
         * @public
         */
        gridGenerator.scaleX = function(_) {
            if (!arguments.length) {
                return scaleX;
            }
            scaleX = _;
            gridV.scale(_);

            return gridGenerator;
        }
    
        /**
         * Gets or sets the y-scale
         * Y-scale applies ticks to the horizontal grid and range to the vertical grid
         * @param {*} [_] - d3 scale instance
         * @return {*|gridGenerator}
         * @public
         */
        gridGenerator.scaleY = function(_) {
            if (!arguments.length) {
                return scaleY;
            }
            scaleY = _;
            gridH.scale(_);

            return gridGenerator;
        }

        /**
         * Gets or sets the direction of the grid
         * Direction of 'full' will render both horizontal and vertical grid lines
         * Either 'horizontal' or 'vertical' wil render the respective lines
         * @param {string} [_] - Grid direction accepts 'full', 'vertical', or 'horizontal'
         * @return {string|gridGenerator}
         * @public
         */
        gridGenerator.direction = function(_) {
            if (!arguments.length) {
                return direction;
            }
            direction = _;

            return gridGenerator;
        }

        /**
         * Gets or sets both the horizontal and vertical grid start offset 
         * Convenience method that sets the start offset for both horizontal and vertical grids
         * Returns the start offset of the horizontal grid if no argument is supplied
         * Start offset is the distance before the start position of the scale's range that the grid will render
         * @param {number} [_] - Offset in px
         * @return {number|gridGenerator}
         * @public
         */
        gridGenerator.offsetStart = function(_) {
            if (!arguments.length) {
                return gridH.offsetStart();
            }
            gridH.offsetStart(_);
            gridV.offsetStart(_);

            return gridGenerator;
        }
    
        /**
         * Gets or sets both the horizontal and vertical grid end offset 
         * Convenience method that sets the end offset for both horizontal and vertical grids
         * Returns the end offset of the horizontal grid if no argument is supplied
         * End offset is the distance after the end position of the scale's range that the grid will render
         * @param {number} [_] - Offset in px
         * @return {number|gridGenerator}
         * @public
         */
        gridGenerator.offsetEnd = function(_) {
            if (!arguments.length) {
                return gridH.offsetEnd();
            }
            gridH.offsetEnd(_);
            gridV.offsetEnd(_);

            return gridGenerator;
        }

        /**
         * Gets or sets the hideEdges parameter for both horizontal and vertical grids
         * Returns the horizontal value if no argument specified
         * Determines if the first and last grid line are suppressed
         * True or 'both' suppress both edges, 'first' and 'last' suppress the grid line
         * corresponding to the first and last tick value respectively
         * @param {boolean|string} [_] - hideEdges parameter, accepts boolean and 'both', 'first', or 'last' strings
         * @return {boolean|string|gridGenerator}
         * @public
         */
        gridGenerator.hideEdges = function(_) {
            if (!arguments.length) {
                return gridH.hideEdges();
            }
            gridH.hideEdges(_);
            gridV.hideEdges(_);

            return gridGenerator;
        }

        /**
         * Gets or sets the tick count for both horizontal and vertical grids
         * Returns the horizontal ticks if no argument specified
         * Mirrors d3 axis' ticks API method
         * @param {number} [_] - Approximate tick count
         * @return {number|gridGenerator}
         * @public
         */
        gridGenerator.ticks = function(_) {
            if (!arguments.length) {
                return gridH.ticks();
            }
            gridH.ticks(_);
            gridV.ticks(_);

            return gridGenerator;
        }

        /**
         * Gets or sets the tick values for both horizontal and vertical grids
         * Returns the horizontal tick values if no argument specified
         * Mirrors d3 axis' tickValues API method
         * @param {number[]} [_] - Array of domain values to place ticks
         * @return {number[]|gridGenerator}
         * @public
         */
        gridGenerator.tickValues = function(_) {
            if (!arguments.length) {
                return tickValuesY; 
            }
            tickValuesX = tickValuesY = _;

            return gridGenerator;
        }

        return gridGenerator;
    }

    /**
     * Constructor for a horizontal grid helper
     * @param {*} scale - d3 scale to initialize the grid
     * @return {gridBaseGenerator}
     */
    function gridHorizontal(scale) {
        return gridBase(DIR.H, scale);
    }

    /**
     * Constructor for a vertical grid helper
     * @param {*} scale - d3 scale to initialize the grid
     * @return {gridBaseGenerator}
     */
    function gridVertical(scale) {
        return gridBase(DIR.V, scale);
    }

    return {
        gridHorizontal,
        gridVertical,
        grid
    };
});
