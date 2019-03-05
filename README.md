# codehort

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
open up appspot/public/index.html
or, `npm start` to run on a local server localhost:8080

### run codehort publically
copy www/ folder to appspot/public folder
when run, it will be in localhost:8080/www/demo or https://codehort.appspot.com/www/demo when deployed

### deploy to appspot
`npm run deploy`
It will be at https://codehort.appspot.com

### view

### switch appspot projects
`gcloud config set project codehort`
