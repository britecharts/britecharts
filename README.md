Britecharts
====

Britecharts is a reusable charting library based on [D3.js](http://d3js.org/). It features AMD modules containing D3.js charts written with the Reusable API methodology and fully tested.

All this charts expose some basic API (width, height and margin) and more some specific methods that you can check in the docs.


### Requirements
node and npm


### Chart Documentation
Currently Britecharts exposes 3 charts:
* Bar Chart
* Line Chart
* Donut Chart

In order to generate and see the documentation for this charts and the project in general you would need to run, once in the repository root folder:
    
    grunt docs

This will open the docs interface where you will be able to check the specific methods for each chart and see some example uses under the "Tutorials" dropdown.


### To Contribute
1- Clone repository with:
    git clone git@github.com:eventbrite/britecharts.git

2- Get into the repository folder and install dependencies with:
    npm install
    npm install -g karma-cli

3- Run the tests with:
    karma start


## Next Steps
- Add documentation for donut chart
- Improve Demos
- Add getting started guide
