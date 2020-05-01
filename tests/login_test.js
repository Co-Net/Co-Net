// Command: npm run testies -- ./tests/login_test
var assert = require("assert").strict;
var webdriver = require("selenium-webdriver");
const until = webdriver.until;

// App Server
const serverUri = `http://localhost:3000/signin`;

// Chrome Browser Config
var browser = new webdriver.Builder()
  .usingServer()
  .withCapabilities({ browserName: "chrome" })
  .build();

// Start Tests
describe("Login Page", function () {
  // Check Sign In UI Loaded
  it("Should load Sign In UI", function () {
    return new Promise((resolve, reject) => {
      browser.get(serverUri);
      browser
        .findElement({ id: "signinForm" })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  });

  // Check Login with
  // leoboi@gmail.com
  // password
  it("Should login", function () {
    return new Promise((resolve, reject) => {
      browser.findElement({ id: "email" }).sendKeys("leoboi@gmail.com");
      browser.findElement({ id: "password" }).sendKeys("password");
      browser.findElement({ id: "signinButton" }).click();
      browser
        .wait(until.elementLocated({ id: "TopMenu" }))
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  });

  // End Tests
  after(function () {
    browser.quit();
  });
});
