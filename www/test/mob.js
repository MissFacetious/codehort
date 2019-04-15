var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var testName = "Mobbing";

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

      console.log("click mob button");
      await driver.findElement(By.id('mobBtn')).click();
      //

      console.log("click minus button 3 times");
      await driver.findElement(By.id('minusTimer')).click(); // 4
      await driver.findElement(By.id('minusTimer')).click(); // 3
      await driver.findElement(By.id('minusTimer')).click(); // 2
      console.log("click plus button 1 time");
      await driver.findElement(By.id('plusTimer')).click(); // 3

      // the value should be at 3 now
      console.log("click start mobbing button");
      await driver.findElement(By.id('startTimerBtn')).click();

      // wait awhile before stopping the mobbing
      driver.sleep(1000);

      // stop the mobbing
      console.log("click stop mobbing button");
      await driver.findElement(By.id('startTimerBtn')).click();

      console.log(":) " + testName + " SUCCESS");
      return true;
    }
    catch (e) {
      console.log(e);
      console.log(":( " + testName + " FAILED");
      return false;
    } finally {
      //await driver && driver.quit();

      console.log("");
    }
  })();
