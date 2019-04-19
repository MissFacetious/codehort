# Codehort
Codehort is a tool that allows you to share coding sessions together while on separate machines. Have your team or class learn how to code Javascript together.

## Can I see this working?
There is a working demo at https://codehort.appspot.com/tool/demo. Beware not all operating systems or browsers are supported. Codehort is being build as a standalone application for Mac and Windows.

Connecting two browsers to a shared session so that you can share code: https://youtu.be/H3AiBBbKZzM

The startup wizard/preferences for Codehort. A code challenge is chosen through the interface, implemented by the user, and then executed successfully by the application: https://youtu.be/-EdfBnxnswQ

Mobbing session functionality (expertly narrated by Lisa): https://youtu.be/GrYF5koNjAQ

## technology stack
### Code Language
EMCAScript & Javascript, HTML5, CSS

### Database
Firebase

### Libraries
Codemirror, Firepad, FireSaver

## run locally

### open up in web browser
open up www/codehort.html in any web browser

## build with Cordova

### install apache cordova
`sudo npm install -g cordova`

### create an app
`cordova create codehort`

### add a platform
`cordova platform add osx`
`cordova platform add windows`

### run the executable
`cordova run osx`
`cordova run windows`

## codehort website

### run locally

### open up in web browsers
open up www/public/index.html
or, `npm start` to run on a local server localhost:8080

### run codehort publically
Copy www/ folder to appspot/public folder and rename to tool

When run, it will be in localhost:8080/tool/demo or https://codehort.appspot.com/tool/demo when deployed

## testing codehort
There is a suite of Selenium Tests that can be run at different stages of the development and deploy.
`npm test` will kick off the test suite.

### deploy to appspot
`npm run deploy`
It will be at https://codehort.appspot.com

### continuous delivery
<img src="https://github.com/MissFacetious/codehort/blob/master/cdfd.png?raw=true">
