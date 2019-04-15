var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var testName = "Find / Replace";

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

      console.log("click search button");
      await driver.findElement(By.id('searchBtn')).click();

      console.log("click replace button");
      await driver.findElement(By.id('replaceBtn')).click();

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
