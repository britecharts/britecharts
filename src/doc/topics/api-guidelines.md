## API Guidelines

Creating new features and charts for Britecharts is easy. However, naming the API methods is hard. We have created these API guidelines to help our contributors choosing the right names for their accessors and variables.

The guidelines help developers to improve the consistency of the library and lower the entry barrier to start contributing to Britecharts. They also help reviewers at the time of doing code reviews.

### General Considerations

Variable and accessor names should be on camelCase, and we try to use only one word that coincides with the internal variable we are using. Variables probably are nouns, while commands are verbs.

For example: _height, width, margin, title_.

### Variable and function names length

We will usually follow the 'Scope Rule':

-   Variable names:
    -   short in small scopes (d)
    -   long in large scopes (percentageLabelMargin)
-   Functions names:
    -   short in large scopes like public commands (hide, width)
    -   long in small scopes (drawVerticalExtendedLine)

### Event dispatchers

The custom events that are attached to the charts always are added using ‘on’.

As in: _.on('customHover')_

### Booleans

We want them to be predicates. They are prefixed with one of the following:

-   should
-   has
-   is

As in: _isAnimated, hasFixedHighlightedSlice_.

### Commands

They must be a verb, and keep them as one word when possible.

As in: _hide, show, exportChart_

### Data labels

For API entries that configure the keys of the input data, we use the property name and the suffix ‘label’.

As in: _dateLabel, valueLabel_

### Formats

A simple name with the property name and ‘format’ suffix.

As in: _numberFormat, xLabelFormat_

### Ticks and Axis

We use the axis name and the 'axis' and ‘ticks’ suffix:

As in: _xTicks, yTicks_
