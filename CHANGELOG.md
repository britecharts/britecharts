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
