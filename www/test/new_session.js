var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var testName = "New Session";

  (async function() {
    let driver;
    try {
      driver = await new webdriver.Builder()
          .forBrowser('safari')
          .build();
      await driver.manage().window().maximize();

      console.log("");
      console.log("========== "+testName+" TEST ==========");
      console.log("");

      var path = 'file://' + process.cwd() + '/www/codehort.html#none';
      path = path.replace(/ /g, '%20');
      await driver.get(path);

      await driver.findElement(By.id('newSessionBtn')).click();

      //await driver.findElement(By.id('newSessionButton')).click();

      // did we get the correct session id?
      //await driver.findElement(By.id('infoSessionBtn')).click();

      // parse through codehort-display for session id
      // we don't even care as long as there is a number there, we happy

      console.log(":) " + testName + " SUCCESS");
      return true;
    }
    catch (e) {
      console.log(e);
      console.log(":( " + testName + " FAILED");
      return false;
    } finally {
      //await driver && driver.quit();
    }
  })();
