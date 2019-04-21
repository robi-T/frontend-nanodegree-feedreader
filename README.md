# Project Overview

In this project I have completed the test suites for the web-based application that reads RSS feeds. This assignement is a part of [Udacity](www.udacity.com) Front-End Web Developer Nanodegree Program. The web-based app was already provided by Udacity. Jasmine framework was used for writing unit tests. All test suites and test cases reside within the [`feedreader.js`](https://github.com/robi-T/frontend-nanodegree-feedreader/blob/master/jasmine/spec/feedreader.js) file.


## The test cases

In total there are 8 test cases and all of them should pass. 
1 TC was already written, I wrote 6 TCs according to the spec (TODO comments) and 1 additional TC that checks if RSS feeds have correct URL syntax (URL validator). The name and the url of the feeds are defined in the `allFeeds` array in the `app.js` file. Additional TC checks if the url syntax is valid.


## How to run the specs?

[Jasmin](https://jasmine.github.io/) framework is referenced in the `index.html` file, so it is enough to [download](https://github.com/robi-T/frontend-nanodegree-feedreader/archive/master.zip) the zip of the project from github, unpack it and open `index.html` in the web browser. You could also clone the repo `git clone https://github.com/robi-T/frontend-nanodegree-feedreader.git` to your local machine and load index.html in the web browser.
