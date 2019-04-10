var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

  (async function() {
    let driver;
    try {
      driver = await new webdriver.Builder()
          .forBrowser('safari')
          .build();
      await driver.manage().window().maximize();

      console.log("open up app");
      await driver.get('file:///Users/lisa/Classes/6460%20Educational%20Technology/codehort/www/codehort.html#none');

      console.log("click preferences button");
      await driver.findElement(By.id('configBtn')).click();

      console.log('SUCCESS');
      return true;
    }
    catch (e) {
      console.log(err);
      console.log('FAILED');
      return false;
    } finally {
      //await driver && driver.quit();
    }
  })();
