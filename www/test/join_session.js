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
      await driver.get('file:///Users/lisa/Classes/6460%20Educational%20Technology/codehort/www/codehort.html#none');

      await driver.findElement(By.id('joinSessionBtn')).click();

      let id = "1234567890123456789";
      // input a session id
      await driver.findElement(By.id('sessionIdInput')).sendKeys(id);
      await driver.findElement(By.id('joinSessionButton')).click();

      // did we get the correct session id?
      //await driver.findElement(By.id('infoSessionBtn')).click();

      // parse through codehort-display for session id "id"

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
