// Command: npm run testies -- ./tests/forumpost_test
var assert = require("assert").strict;
var webdriver = require("selenium-webdriver");
const until = webdriver.until;
const Key = webdriver.Key;
const By = webdriver.By;

// App Server
const serverUri = `http://localhost:3000/signin`;

// Chrome Browser Config
var browser = new webdriver.Builder()
  .usingServer()
  .withCapabilities({ browserName: "chrome" })
  .build();

// Start Tests
describe("Forum Page", function () {
  // Check Sign In UI Loaded
  it("Should load Sign In UI", function () {
    return new Promise((resolve, reject) => {
      browser.get(serverUri);
      browser.wait(until.elementLocated(By.id("signinForm")), 1000).then(() => {
        browser
          .findElement({ id: "signinForm" })
          .then(() => resolve())
          .catch((err) => reject(err));
      });
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
        .wait(until.elementLocated({ id: "TopMenu" }), 1000)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  });

  // Check navigate to Forum
  it("Should navigate to Forum", function () {
    return new Promise((resolve, reject) => {
      browser.navigate().to("http://localhost:3000/forum");
      browser
        .wait(until.elementLocated({ id: "Forum" }), 1000)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  });

  // Check navigate to Create Forum Post
  it("Should navigate to createForumPost", function () {
    return new Promise((resolve, reject) => {
      browser.findElement({ id: "createForumPost" }).click();
      browser
        .wait(until.elementLocated({ id: "createPostButton" }), 1000)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  });

  // Check create post with required fields
  it("Should create a forum post", function () {
    return new Promise((resolve, reject) => {
      browser.findElement({ id: "title" }).sendKeys("Test Post");
      browser.findElement({ id: "tagsbox" }).sendKeys("limbo");
      browser.findElement({ id: "tagsbox" }).sendKeys(Key.ARROW_DOWN);
      browser.findElement({ id: "tagsbox" }).sendKeys(Key.ENTER);
      browser
        .findElement({ id: "postbody" })
        .sendKeys("This post should not exist");
      browser.findElement({ id: "createPostButton" }).click();
      browser
        .wait(until.elementLocated({ id: "post0" }), 2000)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  });

  // Check post is created
  it("Should open a forum post", function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement(By.xpath("//a[contains(text(),'Test Post')]"))
        .click();
      browser
        .wait(
          until.elementLocated(
            By.xpath(
              "//button[@id='editpostButton']//span[@class='MuiButton-label']//*[local-name()='svg']"
            )
          ),
          1000
        )
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  });

  //   // Check post is deleted
  //   it("Should delete a forum post", function () {
  //     return new Promise((resolve, reject) => {
  //       browser
  //         .wait(
  //           until.elementLocated(By.xpath("//button[@id='editpostButton']")),
  //           2000
  //         )
  //         .then((elem) => {
  //           elem.click();
  //           console.log('clicked');
  //           browser
  //             .wait(
  //               until.elementLocated(By.xpath("//button[@id='deletepostButton']")),
  //               2000
  //             )
  //             .then(() => {
  //               console.log('deleting');
  //               browser
  //                 .findElement(By.xpath("//button[@id='deletepostButton']"))
  //                 .click()
  //                 .then(() => resolve())
  //                 .catch((err) => reject(err));
  //             });
  //         });
  //     });
  //   });

  // End Tests
  after(function () {
    browser.quit();
  });
});
