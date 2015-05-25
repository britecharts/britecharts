define(function(require, exports, module) {
    // Imports
    // make require load jquery and jasmine-jquery
    require('jquery');
    require('jasmine-jquery');

    // jquery-jasmine
    // now getFixtures() will be available.
    jasmine.getFixtures().fixturesPath = '/base/test/fixtures';

}); // eof define