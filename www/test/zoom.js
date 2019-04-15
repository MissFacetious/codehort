var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var testName = "Zoom";

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

      console.log("open up app");
      var path = 'file://' + process.cwd() + '/www/codehort.html#none';
      path = path.replace(/ /g, '%20');
      await driver.get(path);

      console.log("click zoom out button");
      await driver.findElement(By.id('zoomOutBtn')).click();

      console.log("click zoom in button");
      await driver.findElement(By.id('zoomInBtn')).click();

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
