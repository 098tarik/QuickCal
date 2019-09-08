Sherlock
========

https://github.com/neilgupta/Sherlock/

**Sherlock parses events written in plain English, and returns an object defining a basic event.
[Try demo](http://neilgupta.github.com/Sherlock/).**

It was designed to allow event creation using natural language. For example, *"The party is tomorrow from 3pm to 5pm."* will return:

```javascript
{
  eventTitle: 'The party',
  startDate: Sat Dec 01 2012 15:00:00 GMT-0600 (CST),
  endDate: Sat Dec 01 2012 17:00:00 GMT-0600 (CST),
  isAllDay: false
}
```

Sherlock can handle times, days, date ranges, event titles, and more. It supports a wide variety of input formats that are common in US English. [Try the demo!](http://neilgupta.github.com/Sherlock/)

Just like Sherlock the detective finds the clues needed to solve a mystery by looking at a crime scene, Sherlock.js finds the components needed to define an event by looking at a sentence. But Sherlock doesn't work alone...

# Watson

Sherlock is great for parsing sentences into basic events, but what if you need to manipulate the data for your specific use case or add some extra properties to the returned object? Just tell Watson to help Sherlock out!

Watson provides a preprocessor and postprocessor layer on Sherlock that allows you to customize Sherlock's input and output. With the preprocessor, you can manipulate the input string before it is parsed by Sherlock. The postprocessor allows you to modify the data returned by Sherlock, or add any additional properties.

For example, Tabule used Watson's preprocessor for app-specific logic, such as determining which course the user wants to add their assignment to. We used the postprocessor to validate the data, such as making sure the user provided a due date. [View an example watson.js processor](https://github.com/neilgupta/Sherlock/blob/gh-pages/watson.js).

Basically, Watson helps Sherlock fit in and interact with the world.

# Installation

You can install most simply with

    $ npm install sherlockjs

If you want Watson helpers, just create a valid `Watson` object somewhere before you use Sherlock. See `watson.js` for a sample Watson object.

# Usage

To parse a string, simply use

```javascript
var Sherlock = require('sherlockjs');
var sherlocked = Sherlock.parse('Homework 5 due next monday at 3pm');

// Basic properties
var title = sherlocked.eventTitle;    // 'Homework 5 due'
var startDate = sherlocked.startDate; // Date object pointing to next monday at 3pm
var endDate = sherlocked.endDate;     // null in this case, since no duration was given
var isAllDay = sherlocked.isAllDay;   // false, since a time is included with the event

// Example of an additional custom property added by Watson
var validated = sherlocked.validated; // true
```

That's it!

## Methods

There are 2 methods in Sherlock.js.

**Sherlock.parse(String)**

`Sherlock.parse()` takes a string representing some English phrase, and returns an object with the following properties:

* `eventTitle` - string representing Sherlock's best guess at what the event title should be, or `null` if no title found.
* `startDate` - Date object representing start of the event, or `null` if not found.
* `endDate` - Date object representing end of the event, or `null` if not found.
* `isAllDay` - `true` if the input string describes an all-day event, otherwise `false`.

**Sherlock._setNow(Date)**

`Sherlock._setNow()` allows you to change what time Sherlock thinks it is right now, regardless of the system clock.

Pass in a Date object, and Sherlock will parse strings as if they there were entered on that day and time.
Pass in `null` to clear your custom date and use the system time instead.

This method is primarily meant for debugging purposes.

## How does this compare to alternatives like Datejs?

[Datejs](http://www.datejs.com) is a date manipulation library, and is not built for handling user input. That means it can only parse very specific dates or times. If you are progrematically passing values or have a dedicated input field for times and a separate one for dates, then you can use Datejs. If you want to let users enter dates, you need Sherlock.

Oh, and Mr. Holmes could take on a ninja any day.

# Testing

You are encouraged to contribute to help improve Sherlock! When doing so, please make sure all tests in `tests.html` still pass. You should also add a test case to cover the situation you're trying to resolve.

`tests.html` is a very simple custom-rolled test framework. You can insert your test anywhere in the list in the following format:

```javascript
(function() {
  var start = getNow();

  start.setHours(0, 0, 0, 0);

  return test("Use Tabule today!", "Use Tabule", start, null, true);
})(),
```

You can adjust the setup as needed for your situation, but the `test` method takes the following 5 arguments:

* The input string that is being tested
* The eventTitle we expect Sherlock to spit back
* The startDate we expect back
* The endDate we expect back
* The isAllDay boolean we expect back

# License

The MIT License (MIT)
Copyright (c) 2018 Neil Gupta

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
