2.9.3
2.9.2
--------------
* fix for animationDelays for each group of data in Grouped Bar chart (ConstantinoSchillebeeckx)
* Stacked bar chart not rendering all bars when `isAnimated(true)` (ConstantinoSchillebeeckx)

2.9.1
--------------
* Feature - implemented x and y axis labels with offsets for Bar (dalerasrorov-eb)
* Feat - Line chart data points highlight on all data shown (dalerasrorov-eb)
* Fix - scatter plot crosshair function set status with boolean (dalerasrorov-eb)

2.9.0 - Minor
--------------
* Fix - crosshair labels to be rendered on same level as lines (dalerasrorov-eb)
* Feature - Scatter Plot trendline based off linear regression formula (dalerasrorov-eb)
* Docs - added Scatter plot to sandbox (dalerasrorov-eb)
* Fix - line chart demo if both brush extent range values are null (dalerasrorov-eb)

2.8.9 - Patch
--------------
* Feature - Added filter helper that applies bounce effect to charts circles (dalerasrorov-eb)
* Fix - do not select tooltip text on frequent click, new class (dalerasrorov-eb)

2.8.8 - Patch
--------------
* Feature - Scatter Plot bounce on click animation (dalerasrorov-eb)

2.8.7 - Patch
--------------
* Feature - custom gradient color schema function for Bar chart (dalerasrorov-eb)
* Fix - Swap drawing order of area and line for sparkline charts (tobiasdierich)
* Docs - Give max space to stacked and grouped bars (dalerasrorov-eb)
* Docs - Allow stack area to take max space (dalerasrorov-eb)
* Docs - Added bullet chart to Kitchen Sink (dalerasrorov-eb)

2.8.6 - Patch
--------------
* Fix - mini-tooltip render bug in Firefox (dalerasrorov-eb)

2.8.5 - Patch
--------------
* Bullet Chart - visual improvement based off design for measure bars (dalerasrorov-eb)
* valueFormatter setter and getter in tooltip and mini-tooltip (adrm)
* Bullet Chart custom title and subtitle via data and chart API (dalerasrorov-eb)
* Bullet Chart - initial stage (dalerasrorov-eb)
* Improved bullet chart demos with data (DalerAsrorov)
* Fix programatic brush selection clear (namoscato)
* Add scatter-plot to kitchen sink (dalerasrorov-eb)
* Attached click handler to svg to react to voronoi polygon (dalerasrorov-eb)

2.8.4 - Patch
--------------
* Fix - scatter plot vertical gridlines use xTicks (dalerasrorov-eb)
* Update Contributing doc with Codepen bug template (Golodhros)
* Dispatch customBrushEnd event when clearing selection (namoscato)

2.8.3 - Patch
--------------
* Fix - crosshair lines have a lower priority than tooltip and overlays

2.8.2 - Patch
--------------
* Fix - crosshair lines have a lower priority than tooltip and overlays

2.8.1 - Patch
--------------
* Fix - Fixed label drawing interruptions with mousemove (dalerasrorov-eb)
* Fix - improved demos and polished Scatter chart code
* Fix - Fixed crosshair and mouseover event interruptions
* Feature - scatter plot data point value highlighter
* Feature - Scatter Plot's voronoi tooltip

2.8.0 - Minor
--------------
Features:
* Added Stacked Area Chart Loading state
* Scatter plot axis format and labels
* Scatter plot hollow area, demo, opacity and aspect ratio
* Highlight points in line chart

Fixes:
* Updated to D3 v5
* Documentation fix and color selector in scatter plot demo
* Brush documentation

2.7.0 - Minor
--------------
Features:
* Scatter plot
* Margin accessor improved flexibility
* Number format in tooltip

Fixes:
* Meta tags in docs
* Data refresh bug

2.6.0 - Minor
--------------
Features:
* Added customClick to Grouped and Stacked Bar Charts (dalerasrorov-eb)
* Added title to Sparkline (dalerasrorov-eb)
* Added yAxisLabelPadding to Line and Grouped bar charts (dalerasrorov-eb)
* Added yAxisLabel to Stacked Area, Grouped Bar and Stacked Bar (dalerasrorov-eb)
* Refactored Webpack configuration (amber-eb)
* Added Touchmove events to Line and Stacked Area (dalerasrorov-eb)
* Added Legend demo (violetlight)
* Added highlightedEntryId to Legend chart

Fixes:
* Removed logic to figure out number of yTicks for small values on Line and Stacked Area
* Added demo reference to demos (dalerasrorov-eb)
* Fixed legend updates
* Fixed Bar label updates (dalerasrorov-eb)
* Fixed Gridlines updates on Bar, Grouped Bar and Stacked Bar charts


2.5.1 - Patch
--------------
* Updating bundle paths (Golodhros)
* Refactoring Helpers (Golodhros)
* Adding refactorings to PR options and polishing issue template (Golodhros)
* Added API description, moved eslint to dev dep (dalerasrorov-eb)
* Upgraded grunt-jsdoc and jsdoc (dalerasrorov-eb)
* Feature - allow ability to configure stacked area curve (dalerasrorov-eb)
* Feature - new Bar chart API method to highlight bars (dalerasrorov-eb)

2.5.0 - Minor
--------------
* Feature - ability to reverse stacks (sound-matt)
* Feature - allow ability to switch Bar's hover behavior (dalerasrorov-eb)
* Eased compilation requirement for ESlint and updated CHANGELOG (dalerasrorov-eb)
* Feature - added text formatter function to Donut's API (dalerasrorov-eb)

2.4.12 - Patch
--------------
* Added ESlint task to webpack for demos and added critical rules (dalerasrorov-eb)
* Eliminated mutation of data in cleanData of the Line chart (dalerasrorov-eb)
* Allow valueFormat to be an empty string  (sound-matt)
* Feat: add possibility to precise the unit of the values in legend (sound-matt)
* Fix: stackedbar get nearest datapoint (sound-matt)
* Fix: stacked-bar no more choosing random color (sound-matt)
* Stacked bar chart hasPercentage impl (dalerasrorov-eb)
* Adding anchors to loading states and updating bar demo (Golodhros)
* Updating changelog (Golodhros)
* Replace .enablePercentageLabels with .enableLabels (mrbongiolo)
* Removed .usePercentage for good from BarChart (mrbongiolo)
* Feature - Added .numberFormat to MiniTooltip (mrbongiolo)

2.4.11 - Minor
--------------
Features:
* Added loading states (@amber-eb)
* Added betweenBarsPadding option to bar charts
* Docs update with demos in frontpage and more tweaks
* Doc update for data format (@interdigitize)
* Custom click handler in bar chart (@dalerasrorov-eb)
* Custom click handler in donut chart (@dalerasrorov-eb)

Bug fixes:
* Fixed brush drag and drop (@brandon-vaughan)

2.4.9 - Patch
--------------
Features:
* Added donut chart empty state (@amber-eb)
* Additional donut configurations (@amber-eb)

2.4.7 - Patch
--------------
Features:
* Docs build on release

2.4.4 - Patch
--------------
Bug fixes:
* Added style build to build process

2.4.3 - Patch
--------------
Bug fixes:
* Defensive check on text helper

2.4.0 - Minor
--------------
Features:
* Added glow in highlight points of line and area charts
* Added Donut and line chart number formatting (@dalerasrorov-eb)
* Legend adjustments (@jchen-eb)

Bug fixes:
* Removed transition from yAxis (@CoryDuncan)
* Fixes line chart not rendering gradient on unique line constant values
* Stacked Area x line fix (@jchen-eb)

2.3.2 - Patch
--------------
Features:
* Added ordering in bar chart (@dalerasrorov-eb)
* Added optional axis labels to line chart

Bug fixes:
* Fixed Tick calculation (@jchen-eb)
* Fixed Sparkline for multiple instances (@amber-eb)
* Fixed broken link in docs

2.3.1 - Patch
--------------
Features:
* Ability to set sort order for donut (@dalerasrorov-eb)
* Getter/setter for marginRatio-Legend and tooltipOffset-Stacked Area
* Tooltip title improvements (@rpheath)

2.2.0

2.1.1 - Patch
--------------
Features:
* Added barchart padding

Bug fixes:
* Fixed IE11 tooltip bug

2.1.0 - Minor
---------------------
Features:
* Added interactivity to highlight points in line and area charts
* Added skeleton for docs rework

Bug fixes:
* Fixed stacked area, ste, sparkline and line chart reload
* Fixed step chart label rotation
* Fixed donut slice highlighting
* Updated cleanData functions to not override custom properties in data

2.0.4 - Patch
---------------------
Bug Fixes:
* Check for window in export chart file

2.0.3 - Patch
---------------------
Features:
* Moved into Webpack 3 (thanks @rwholey)
* Allow empty data on Stacked Area (thanks @jaylumChen)
* Added Outline to Stacked Area Chart (thanks @jaylumChen)
* Added locale to brush and stacked bar charts (thanks @martinmanzo)
* Added Ytick text offset to grouped bar chart (thanks @martinmanzo)

Bug Fixes:
* Fixed Donut + Legend bug
* Fixed data reload on stacked bar chart and grouped bar chart
* Updated docs, Donut demo and CDN links

2.0.2 - Failed release

2.0.1 - Patch
---------------------
Bug Fixes:
* Fixed missing transitions on grouped bar chart and stacked area (thanks @martinmanzo)
* Moved into Yarn (thanks @rwholey)
* Fixed color schema not being updated on bar charts (thanks @biovisualize)
* Fixed object cleaning on bar chart (thanks @jaylumChen)
* Fixed data reload on Donut charts
* Fixed Firefox markup issues
* Added Twitter link on docs
* Fixed CDN demo page on docs

Features:
* Created first version of the Britecharts sandbox (thanks @rwholey)
* Added curve interpolation attribute to line chart (thanks @dylanmoz)


[2.0.0][https://github.com/eventbrite/britecharts/compare/1.7.2...2.0.0] - Major Release
-----------------

Features:
* Added number format accessor for legend (thanks @martinmanzo)
* Added reverseColorList accessor for bar chart (thanks @martinmanzo)
* Added custom tooltip formatting option (thanks @harrisreynolds)

API Changes:
Boolean accessors
* from horizontal to isHorizontal
* from usePercentage to hasPercentage
* from reverseColorList to shouldReverseColorList

Removed ‘force’ prefixes
* from forceAxisFormat to xAxisFormat
* from forcedXFormat to xAxisFormat
* from forceDateRange to dateFormat
* from forceOrder to topicsOrder
* from forcedXTicks to xTicks

Renamed axis and tick related accessors
* from numOfHorizontalTicks into xTicks
* from numOfVerticalTicks to yTicks
* from verticalTicks to yTicks

Normalized callbacks with dispatchers
* from onBrush callback to a .on(‘customBrushEnd’, fn) event

Color schemas
* from britechartsColorSchema to britecharts
* from britechartsGreySchema to grey
* from extendedOrangeColorSchema to orange
* from extendedBlueColorSchema to blueGreen
* from extendedLightBlueColorSchema to teal
* from extendedGreenColorSchema to green
* from extendedYellowColorSchema to yellow
* from extendedPinkColorSchema to pink
* from extendedPurpleColorSchema to purple
* from extendedRedColorSchema to red

Bug Fixes:
* Normalized Chart names between bundle and UMD
* Updated eslint configuration and cleaned all issues
* Added tests to stacked and grouped bar charts
* Polished Grouped Bar Chart
* Fixed tooltip rounding error

Docs
* Updated Readme (thanks @perborgen)
* Update docs (thanks @nikkistonge)
* Added license badge to readme
* Created Code Styleguide document with API Guidelines: https://github.com/eventbrite/britecharts/blob/master/CODESTYLEGUIDE.md
* Updated the Contributing guide


1.7.2 - Patch
---------------------
* Updated dist with new changes

1.7.1 - Patch
---------------------
* Remove find from stacked area, fixing IE11 bug

[1.7.0][https://github.com/eventbrite/britecharts/compare/1.7.0...1.6.0] - Minor Release]
---------------------
* Put safety check for Intl on uncompatible browsers
* Finalize addition of new feature date localization

1.6.1 - Patch
---------------------
* Locale added to stacked area and line
* Stacked bar made it in to the dist bundle

[1.6.0][https://github.com/eventbrite/britecharts/compare/1.6.0...1.5.0] - Minor Release
---------------------
Features:
* New Stacked bar chart (thanks @bung87)
* New Grouped bar chart (thanks @bung87)
* Animations configuration for all charts
* Automatic computing of Donut percentages (thanks @jenjwong)
* Docs improvements (thanks @bung87)
* Donut highlights
* Removed bowser dependency
* Added singleLineGradientColors accessor

Bug Fixes:
* Tooltip now alphabetical order by default
* More agressive npmignore (thanks @nobitagit)
* Normalized margins on charts
* Fixing CDN demo
* Fixed env arguments in Windows (thanks @Tobbe)
* Ensure data entry is there in Stacked Area (thanks @tgallice)

1.5.3 - Patch
---------------------
Bug Fixes:
* Fixed release task problem

1.5.2 - Patch
---------------------
Changes:
* Docs improvements
* Horizontal legend item wrapping

Bug Fixes:
* Fixed demo resizes on scroll on mobile
* Fixed bundle export structure


1.5.1 - Patch
---------------------
Changes:
* Several docs improvements

[1.5.0][https://github.com/eventbrite/britecharts/compare/1.5.0...1.4.0] - Minor Release
---------------------
Changes:
* Adding Grid options to area and line charts
* Allow configuration of Y axis ticks on area and line charts
* Added custom x format and x tick numbers

1.4.8 - Patch
---------------------
Bug Fixes:
* Removing d3 dependency from legend chart

1.4.7 - Patch
---------------------
Bug Fixes:
* Fixed css bundle link on docs and demos
* Fixed broken links on readme
* Adjusted hourly x axis config

Changes:
* Updated eslint files
* Adding twitter cards to docs homepage
* Added namespaces to bundles when loading via script tags
* Updated horizontal bar chart to not default to percentages
* Updated getting started guide


1.4.6 - Patch
---------------------
Bug Fixes:
* Fixing Legend colors
* Fixing brush styles


1.4.5 - Patch
---------------------
Bug Fixes:
* Fixing Docs font

Changes:
* Docs navigation styling
* Renaming css bundle
* Normalizing stacked area x axis


1.4.4 - Patch
---------------------
Bug Fixes:
* Fixed stacked area chart input date formatting
* Changed stacked area chart curve interpolation

Changes:
* Added Travis configuration

1.4.3 - Patch
---------------------
Changes:
* Updated Brush styling
* Added tests for export chart

Bug Fixes:
* Fixed export chart with unicode characters on title

1.4.2 - Patch
---------------------
Bug Fixes:
* Updated color selection on bar chart

1.4.1
--------------
Failed bump

[1.4.0][https://github.com/eventbrite/britecharts/compare/1.4.0...1.3.0] - Minor Release
---------------------
Changes:
* Brush on Line Chart Demo
* Brush date format changes
* Added colors to bar chart

1.3.4 - Patch
---------------------
Bug Fixes:
* Stacked Area fix
* Bar chart axis

1.3.3 - Patch
---------------------
* Update label line wrapping on bar chart

1.3.2, 1.3.1
--------------
Failed bumps

[1.3.0][https://github.com/eventbrite/britecharts/compare/1.3.0...1.2.0] - Minor Release
---------------------
Changes:
* Logo Update
* Bar Chart Percentage setting and axis rework
* Contributing guide update
* Added PR and Issue templates

Bug Fixes:
* Docs hamburger menu styling

[1.2.0][https://github.com/eventbrite/britecharts/compare/1.2.0...1.1.16] - Minor Release
---------------------
Changes:
* Changed data input of Line Chart
* Added value, key and topic label accessors to line and stacked are charts
* Updated docs
* Added ratio setting to Stacked Area Chart

1.1.17, 1.1.18
--------------
Failed bumps

[1.1.16][https://github.com/eventbrite/britecharts/compare/1.1.16...1.1.15] - Patch
----------
Bug Fixes:

* Fixing hour format on Tooltip
* Removing ES2015 Set for the moment

docs:

* Updating docs and configs, and adding bower config to get ready to publish.
* Updating package, npmignore, readme and cleaning old index.html file

1.1.15
----------
Failed bump

1.1.14 - Patch
----------
Fixed d3Transition dependency

1.1.13
----------
Failed bump
