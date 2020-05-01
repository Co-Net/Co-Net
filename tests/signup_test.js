// Command: npm run testies -- ./tests/signup_test
var assert = require("assert").strict;
var webdriver = require("selenium-webdriver");

// App Server
const serverUri = `http://localhost:3000`;
const appTitle = `Co-Net`;

// Chrome Browser Config
var browser = new webdriver.Builder()
  .usingServer()
  .withCapabilities({ browserName: "chrome" })
  .build();

// Get Browser Title
function logTitle() {
  return new Promise((resolve, reject) => {
    browser.getTitle().then((title) => {
      resolve(title);
    });
  });
}

// Start Tests
describe("Sign Up Page", function () {
  // Check Home Page Title
  it("Should load home page and get title", function () {
    return new Promise((resolve, reject) => {
      browser
        .get(serverUri)
        .then(logTitle)
        .then((title) => {
          assert.strictEqual(title, appTitle);
          resolve();
        })
        .catch((err) => reject(err));
    });
  });

  // Check Sign Up UI Loaded
  it("Should load Sign Up UI", function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: "server-modal-description" })
        .then((elem) => resolve())
        .catch((err) => reject(err));
    });
  });

  // Check Sign Up Successful with
  // seleniboi
  // password
  it("Should Sign Up new user", function () {
    return new Promise((resolve, reject) => {
      browser.navigate().to("http://localhost:3000/signup");
      browser.findElement({ id: "firstName" }).sendKeys("selenium");
      browser.findElement({ id: "lastName" }).sendKeys("boi");
      browser.findElement({ id: "username" }).sendKeys("seleniboi");
      browser.findElement({ id: "email" }).sendKeys("seleniboi@gmail.com");
      browser.findElement({ id: "cEmail" }).sendKeys("seleniboi@gmail.com");
      browser.findElement({ id: "password" }).sendKeys("password!");
      browser.findElement({ id: "cPassword" }).sendKeys("password!");
      browser
        .findElement({ id: "signupButton" })
        .click()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  });

  // End Tests
  after(function () {
    browser.quit();
  });
});
