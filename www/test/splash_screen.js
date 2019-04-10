var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var assert = require('assert');

  (async function() {
    let driver;
    try {
      driver = await new webdriver.Builder()
          .forBrowser('safari')
          .build();

      await driver.manage().window().maximize();

      console.log("open up app");
      await driver.get('file:///Users/lisa/Classes/6460%20Educational%20Technology/codehort/www/codehort.html');

      // or test for not adding one and getting the default
      //await driver.findElement(By.id('usernameSplashInput')).sendKeys('');
      let username = "";
      console.log("input a username");
      let element = await driver.findElement(By.id('usernameSplashInput'));
      await driver.wait(until.elementIsVisible(element), 1000);
      await element.getAttribute('placeholder')
      .then(function(name) {
        username = name;
      });

      // next panel
      console.log("click next button for zoom panel");
      await driver.findElement(By.id('next1Btn')).click();

      // select the zoom, click zoom down twice
      // zoomSplashDown
      // zoomSplashUp
      driver.sleep(1000);
      console.log("click zoom down twice");
      await driver.findElement(By.id('zoomSplashDown')).click();
      driver.sleep(1000);
      await driver.findElement(By.id('zoomSplashDown')).click();

      // next panel
      console.log("click next button for theme panel");
      await driver.findElement(By.id('next2Btn')).click();

      // select theme, click dark theme
      // themeSplashLight
      // themeSplashDark
      console.log("click dark theme");
      await driver.findElement(By.id('themeSplashDark')).click();

      // next panel
      console.log("click next button for session panel");
      await driver.findElement(By.id('next3Btn')).click();

      // or join a new session
      // joinSessionSplashBtn
      // parse through successSplash

      // now we are going to see if the session is correct

      console.log("click finish button");
      await driver.findElement(By.id('finishBtn')).click();


      console.log("SUCCESS through the startup panel");

      driver.sleep(1000);
      driver.navigate().refresh();
      driver.sleep(1000);
      // did we get the correct session id?
      //console.log("click info session button");
      //await driver.findElement(By.id('infoSessionBtn')).click();

      // parse through codehort-display for session id

      // close out of the panel
      //console.log("click okay in info session panel");
      //await driver.findElement(By.id('sessionInfoBtn')).click();

      driver.sleep(1000);
      // now we are going to see if the config shows us what we picked
      console.log("click preferences button");
      await driver.findElement(By.id('configBtn')).click();

      // did we get the correct username?
      console.log('validating username value');
      let element2 = await driver.findElement(By.id('usernameInput'));
      await driver.wait(until.elementIsVisible(element2), 1000);
      await element2.getAttribute('value')
      .then(function(name) {
        assert.equal(username, name);

      });

      // did we get the correct zoom?
      console.log('validating zoom value');
      let element5 = await driver.findElement(By.id('zoom'));
      await driver.wait(until.elementIsVisible(element5), 5000);
      await element5.getAttribute('value')
      .then(function(value) {
        assert.equal(130, value);
        // value should be 150 - two clicks down
      });

/*
      // did we get the correct theme?
      let element6 = await driver.findElement(By.id('lightSwitch'));
      await driver.wait(until.elementIsVisible(element6), 5000);
      await element6.getAttribute('value')
      .then(function(value) {
        // no way to validate this!!!
        console.log(value);
      });
      */
      console.log('SUCCESS');
      return true;
    }
    catch (err) {
      console.log(err);
      console.log('FAILED');
      return false;
    } finally {
      //await driver && driver.quit();
    }
  })();
