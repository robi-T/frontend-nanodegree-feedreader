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


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have URL defined and the URL isn\'t empty', function() {

            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            }
        });



        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have name defined and the name isn\'t empty', function() {

            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            }
        });


        /* Additional test that checks if 'URL syntax is correct'. This is slippery slope, but I felt sme kind of URL validator was needed.
         * Using modified regex originaly (c) by @imme_emosol [source: https://mathiasbynens.be/demo/url-regex]
         *
         */

        it('have correct URL syntax', function() {

            for (let feed of allFeeds) {
                expect(feed.url).toMatch("https?:\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s])*?");
            }
        });

    });



    /* Write a new test suite named "The menu" */

    describe('The menu', function() {


        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */


        it('element is hidden by default', function() {

            expect($('body').hasClass('menu-hidden')).toBe(true);

        });



        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('element changes visibility when the menu icon is clicked', function() {


            // Click once
            $(".menu-icon-link").trigger("click");
            //expect('click').toHaveBeenTriggeredOn('icon-list');
            expect($('body').hasClass('menu-hidden')).toBe(false); // the menu is hidden by default


            // Click again
            $(".menu-icon-link").trigger("click");
            //expect('click').toHaveBeenTriggeredOn('icon-list');
            expect($('body').hasClass('menu-hidden')).toBe(true); // the menu is shown after the 'next' click

        });


    });

    /* Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {



        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach((done) => {  // fetch 'Udacity blog' RSS feed
            loadFeed(0, done);
        })

        it('there is at least a single .entry element in .feed container mafter loadFeed function completes', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0); //Check if there is at least one entry inside feed-->entry
        });


    });

    /* Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {


        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let feedContentA, feedContentB;


        // Fetch 2 (different) RSS feeds and store the HTML content in the feedContentA and feedContentB variables.
        beforeEach((done) => {
            loadFeed(1, function() {    // fetch 'CSS Tricks' RSS feed
                feedContentA = $('.feed').html();
                done();
            })

            loadFeed(2, function() {     // fetch 'HTML5 Rocks' RSS feed
                feedContentB = $('.feed').html();
                done();
            })
        });


        it('content changes when a new feed is loaded by loadFeed function', function() {
            expect(feedContentA).not.toBe(feedContentB);
        });

    });

}());