# codehort

## can I see this working?
There is a working demo at https://codehort.appspot.com/tool/demo. Beware not all operating systems or browsers are supported.

Connecting two browsers to a shared session so that you can share code: https://youtu.be/H3AiBBbKZzM

The startup wizard/preferences for Codehort. A code challenge is chosen through the interface, implemented by the user, and then executed successfully by the application: https://youtu.be/-EdfBnxnswQ

Mobbing session functionality (expertly narrated by Lisa): https://youtu.be/GrYF5koNjAQ

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
copy www/ folder to appspot/public folder
when run, it will be in localhost:8080/tool/demo or https://codehort.appspot.com/tool/demo when deployed

### deploy to appspot
`npm run deploy`
It will be at https://codehort.appspot.com

### view

### switch appspot projects
`gcloud config set project codehort`
