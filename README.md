<h1>react-daterangepicker</h1>

<p> 
    The motive of this project is to create a pure react daterangepicker component that will get rid of all unnecessary dependancies like jquery, bootstrap, popperjs etc. which hampers the bundle size and page load performance in turn.
</p>

<div>
    <a href="https://travis-ci.org/technikhil314/react-datetimerangepicker">
		<img src="https://travis-ci.org/technikhil314/react-datetimerangepicker.svg?branch=master" width:"100%">
	</a>
    <a href='https://coveralls.io/github/technikhil314/react-datetimerangepicker?branch=master'>
        <img src='https://coveralls.io/repos/github/technikhil314/react-datetimerangepicker/badge.svg?branch=master' alt='Coverage Status' width:"100%"/>
    </a>
    <a href="https://github.com/technikhil314/react-datetimerangepicker/issues">
        <img src="https://img.shields.io/github/issues/technikhil314/react-datetimerangepicker.svg?style=social" width:"100%"/>
    </a>
    <a href="https://github.com/technikhil314/react-datetimerangepicker/network/members">
        <img src="https://img.shields.io/github/forks/technikhil314/react-datetimerangepicker.svg?style=social" width:"100%"/>
    </a>
    <a href="https://github.com/technikhil314/react-datetimerangepicker/stargazers">
        <img src="https://img.shields.io/github/stars/technikhil314/react-datetimerangepicker.svg?style=social" width:"100%"/>
    </a>
</div>
<div>
	<a href="https://www.npmjs.com/package/@technikhil/react-daterangepicker">
		<img src="https://img.shields.io/badge/dynamic/json.svg?label=npm&uri=https%3A%2F%2Fraw.githubusercontent.com%2Ftechnikhil314%2Freact-datetimerangepicker%2Fmaster%2Fpackage.json&query=%24.version&prefix=v&colorB=blue" width:"100%">
	</a>
	<a href="https://unpkg.com/@technikhil/react-daterangepicker/index.js">
		<img src="https://img.shields.io/badge/dynamic/json.svg?label=unpkg&uri=https%3A%2F%2Fraw.githubusercontent.com%2Ftechnikhil314%2Freact-datetimerangepicker%2Fmaster%2Fpackage.json&query=%24.version&prefix=v&colorB=blue" width:"100%">
	</a>
    <a href="https://yarnpkg.com/en/package/@technikhil/react-daterangepicker">
		<img src="https://img.shields.io/badge/dynamic/json.svg?label=yarn&uri=https%3A%2F%2Fraw.githubusercontent.com%2Ftechnikhil314%2Freact-datetimerangepicker%2Fmaster%2Fpackage.json&query=%24.version&prefix=v&colorB=blue" width:"100%">
	</a>
    <a href="https://github.com/technikhil314/react-datetimerangepicker/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/dynamic/json.svg?label=License&uri=https%3A%2F%2Fraw.githubusercontent.com%2Ftechnikhil314%2Freact-datetimerangepicker%2Fmaster%2Fpackage.json&query=%24.license&colorB=000000&colorA=0b5777" width:"100%"/>
    </a>
</div>

# About this package

<p>
Date/time rangepicker for React16 and above
</p>
<p>
It is a fully responsive daterangepicker with or without bootstrap.css. See <a href="#responsive-css">responsive section </a> below for more details.
</p>
<p>
This is a work in progress and you are always welcome to help me going forward with this project.
</p>
<p> 
    The motive of this project is to create a pure react daterangepicker component that will get rid of all unnecessary dependancies like jquery, bootstrap, popperjs etc. which hampers the bundle size and page load performance in turn.
</p>

# Announcements

<div>
<ul>
<li>
	Date: 13 Oct 2018
	<ul>
		First working draft of the component is in action. 
	</ul>
</li>
<li>
	Date: 21 Oct 2018
	<ul>
		Added two more options alwaysOpen and autoApply
	</ul>
</li>
</ul>
</div>

# Getting Started

## Install

```bash
$ npm install @technikhil/react-daterangepicker
```

or

```yarn
$ yarn add @technikhil/react-daterangepicker
```

## Demo

see [Demo](https://technikhil314.github.io/react-datetimerangepicker/) to how to consume this module or You can play around with the code on <a href="https://stackblitz.com/edit/react-daterangepicker-demo">stackblitz here</a>

# Usage

## How to make it work for you

Import DaterangepickerModule into your module as following

```js
import React, { Component, Fragment } from "react";
import ReactDateRangePicker from "@technikhil/react-daterangepicker";
export default class DemoApp extends Component {
  render() {
    return (
      <Fragment>
        <HeaderComponent />
        <div className="container-fluid h-100 row">
          <div className="col-md-6 border-right">
            <h3>Configuration options tester</h3>
          </div>
          <div className="col-md-6 h-100">
            <div className="offset-md-3 col-md-6 row">
              <ReactDateRangePicker
                open="left"
                theme="dark"
                startDate="07.12.2018"
                endDate="07.12.2018"
                format="DD.MM.YYYY"
                onRangeSelected={range => {
                  console.log(range);
                }}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
```

## Options

Currently, very minimum number of options are available but I will keep on developing and adding more and more options

<table>
    <thead>
        <tr>
            <th>Prop Name</th>
            <th>Type</th>
            <th>Purpose</th>
            <th>Default Value</th>
            <th>Possible Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>format</td>
            <td>string</td>
            <td>format that this daterangepicker will use to communicate with your code</td>
            <td>"DD.MM.YYYY"</td>
            <td>As per <a href="https://momentjs.com/"> momentjs </a> standard formats</td>
        </tr>
        <tr>
            <td>startDate</td>
            <td>string</td>
            <td>Default start date when this components is rendered for first time. Format of this date should be in line with format option's value above</td>
            <td>""(Empty String)</td>
            <td>date string in line with "format" prop's value above</td>
        </tr>
        <tr>
            <td>endDate</td>
            <td>string</td>
            <td>Default end date when this components is rendered for first time. Format of this date should be in line with "format" prop's value above</td>
            <td>Current Systetm Date</td>
            <td>date string in line with format option's value above</td>
        </tr>
        <tr>
            <td>open</td>
            <td>string</td>
            <td>position of the flyout which will open. By default it opens on left edge of input box</td>
            <td>'left'</td>
            <td>'left','right'</td>
        </tr>
        <tr>
            <td>theme</td>
            <td>string</td>
            <td>The theme i.e background/font color of the input box and flyout</td>
            <td>'light'</td>
            <td>'light','dark' See <a href="theming">theme</a> section below for more/custom theming</td>
        </tr>
        <tr>
            <td>alwaysOpen</td>
            <td>boolean</td>
            <td>Will keep the calendars always open. And will hide the main input box showing range. Will hide the cancel button from the popup</td>
            <td>false</td>
            <td>true, false</td>
        </tr>
        <tr>
            <td>autoApply</td>
            <td>boolean</td>
            <td>Will automatically apply range as soon as user selects date from right calendar. Will hide apply button from the bottom of popup</td>
            <td>false</td>
            <td>true, false</td>
        </tr>
    </tbody>
</table>

## Callback

Pass in onRangeSelected callback as

```html
<ReactDateRangePicker
    open="left"
    theme="dark"
    startDate="07.12.2018"
    endDate="07.12.2018"
    format="DD.MM.YYYY"
    onRangeSelected={(range) => {
        console.log(range)
    }}
/>
```

the callback will receive a javascript object containing

```js
{
  fromDate: "moment object representing start date selected by user",
  toDate: "moment object representing end date selected by user";
}
```

# Theming

If you want to have your own theme defined for the component. You can

<ol>
    <li>
        Override the css of the component
    </li>
    or
    <li>
        You can pass your theming colors to the component via theme prop as follows. It override all the colors of theme used.
    </li>
</ol>

```js
 {
    "daterangepicker-flyout-background": "#FFF",
    "daterangepicker-flyout-foreground": "#000",
    "daterangepicker-flyout-box-shadow-color": "#777",
    "daterangepicker-flyout-border-color": "#777",
    "daterangepicker-date-hover": "#444",
    "daterangepicker-date-selected": "#777",
    "daterangepicker-date-inSelectedRange": "#777",
    "daterangepicker-input-background": "#FFF",
    "daterangepicker-input-foreground": "#000",
    "daterangepicker-input-box-shadow-color": "rgba(0,0,0,.075)",
    "daterangepicker-input-border-color": "#777",
    "daterangepicker-icon-color": "#000",
    "daterangepicker-font-size": "14px",
    "daterangepicker-clear-button-foreground": "#000",
    "daterangepicker-apply-button-background": "green",
    "daterangepicker-apply-button-foreground": "#FFF",
    "daterangepicker-cancel-button-background": "#DEDEDE",
    "daterangepicker-cancel-button-foreground": "#000"
}
```

# Dependencies

[moment.js](http://momentjs.com/) version greater than 2.17.1<br/>
[moment-range.js](https://github.com/gf3/moment-range) version 2.2.0 <br/>
[css-vars-ponyfill](https://github.com/jhildenbiddle/css-vars-ponyfill)

# Issues/Problems

Please let me know if you are facing any issues [here](https://github.com/technikhil314/react-datetimerangepicker/issues)

# Want to contribute. You are welcome!!! :)

<ol>
    <li>Fork this repo</li>
    <li>"npm install" or "yarn install"</li>
    <li>run "npm run serve" or "yarn serve"</li>
    <li>open browser at <a href="http://localhost:8080/" target="_blank">http://localhost:8080/</a></li>
    <li>You are all set.</li>
    <li>Add features. Fix issues. Open Pull requests.</li>
</ol>
