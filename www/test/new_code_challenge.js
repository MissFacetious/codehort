var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var testName = "New Code Challenge";

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

      console.log("click new code challenge button");
      await driver.findElement(By.id('newBtn')).click();

      console.log("click 1st challenge button");
      await driver.findElement(By.id('challenge1')).click();

      console.log("click 2nd challenge button");
      await driver.findElement(By.id('challenge2')).click();

      console.log("click 3rd challenge button");
      await driver.findElement(By.id('challenge3')).click();

      console.log("click 4th challenge button");
      await driver.findElement(By.id('challenge4')).click();

      console.log("click 5th challenge button");
      await driver.findElement(By.id('challenge5')).click();

      console.log("click 6th challenge button");
      await driver.findElement(By.id('challenge6')).click();

      console.log("click 7th challenge button");
      await driver.findElement(By.id('challenge7')).click();

      console.log("click new challenge button");
      await driver.findElement(By.id('newEditorBtn')).click();

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
