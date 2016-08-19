/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have non-empty URL defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                //expect the url to be defined and its string is not empty
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        it('have non-empty name defined', function() {
            //expect the name to be defined and its string is not empty
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    describe('The Menu', function() {
        it('has meny hidden by default', function() {
            //expect the default class of body to be menu-hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        it('can show/hide menu when menu icon is clicked', function() {
            //if the menu is hidden, trigger a click on menu icon and then
            //expect the menu to be not hidden
            //if the menu is not hidden, trigger a click on menu icon and then
            //expect the menu to be hidden
            if ($('body').hasClass('menu-hidden') === true) {
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(false);
            } else {
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(true);
            }
        });
    });


    describe('Initial Entries', function() {
        //call loadFeed first and use done() for asynchronous function
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('has at least one .entry elem in .feed container', function(done) {
            //grab the first entry element in .feed container and make sure it
            //exists and its string is not empty
            expect($('.feed .entry')[0]).toBeDefined();
            expect($('.feed .entry')[0]).not.toBe('');
            done();
        });
    });


    describe('New Feed Selection', function() {
        var entries0;
        var entries1;
        //run loadFeed() twice and store the first result in entries0 and
        //store the second result in entries1
        //compare entries0 and entries1 and make sure they are not equal,
        //therefore proving the content changes when a new feed is loaded.
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, function() {
                entries0 = $('.feed').find("h2").text();
                done();
            });
        });

        it('changes the content when new feed is loaded', function(done) {
            loadFeed(1, function() {
                entries1 = $('.feed').find("h2").text();
                expect(entries0).not.toEqual(entries1);
                done();
            });
        });
    });

}());
