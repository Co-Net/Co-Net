// Command: npm run testies -- ./tests/logout_test
var assert = require("assert").strict;
var webdriver = require("selenium-webdriver");
const until = webdriver.until;

// App Server
const serverUri = `http://localhost:3000/signin`;

// Chrome Browser Config
var browser = new webdriver.Builder()
    .usingServer()
    .withCapabilities({
        browserName: "chrome"
    })
    .build();

// Start Tests
describe("Logout", function () {
    // Check Sign In UI Loaded
    it("Should load Sign In UI", function () {
        return new Promise((resolve, reject) => {
            browser.get(serverUri);
            browser
                .findElement({
                    id: "signinForm"
                })
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    });

    // Check Login with
    // leoboi@gmail.com
    // password
    it("Should login", function () {
        return new Promise((resolve, reject) => {
            browser.findElement({
                id: "email"
            }).sendKeys("leoboi@gmail.com");
            browser.findElement({
                id: "password"
            }).sendKeys("password");
            browser.findElement({
                id: "signinButton"
            }).click();
            browser
                .wait(until.elementLocated({
                    id: "TopMenu"
                }))
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    });

    // Check logout
    it("Should logout", function () {
        return new Promise((resolve, reject) => {
            browser.wait(until.elementLocated({
                    id: "usermenu"
                }), 2000)
                .then(() => browser.findElement({
                    id: "usermenu"
                }).click());
            browser.wait(until.elementLocated({
                    id: "logout"
                }), 2000)
                .then(() => browser.findElement({
                    id: "logout"
                }).click())
                .then(() => resolve())
                .catch(err => reject(err));
        });
    });

    // Check Sign Up UI Loaded
    it("Should load Sign Up UI", function () {
        return new Promise((resolve, reject) => {
            browser.wait(until.elementLocated({
                    id: "server-modal-description"
                }), 2000)
                .then(() => browser
                    .findElement({
                        id: "server-modal-description"
                    })
                    .then((elem) => resolve())
                    .catch((err) => reject(err)));

        });
    });

    // End Tests
    after(function () {
        browser.quit();
    });
});