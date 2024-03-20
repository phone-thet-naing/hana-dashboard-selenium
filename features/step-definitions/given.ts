import {Given, When} from "@wdio/cucumber-framework"

import DashboardPage from "../pageobjects/dashboard.page.js"
import getUserInput from "../../utility/terminalPrompt.js"
import {browser} from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboard.page.js";

Given("I am on login page", async () => {
    await DashboardPage.goToDashboard()
})

Given("I am in Interview Results page", async function () {
    await DashboardPage.goToDashboard()
    await DashboardPage.login("dadmin", "Hana123")
})

Given("I am on the dashboard page", async () => {
    console.info("I am on the dashboard page")
    const title = "Hana Finance"
    await expect(await $('span[class="logo-lg"]')).toHaveText(title);
})

Given("I have successfully logged in with {} and {}", async (username, password) => {
    await DashboardPage.goToDashboard()
    await DashboardPage.login(username, password)
})

Given("I have logged into database", async () => {
    // Log into Database
    await browser.maximizeWindow();
    await browser.url("https://db-uat.hanamicrofinance.net/");

    const usernameInput = await $('input[id="input_username"]');
    const passwordInput = await $('input[id="input_password"]');
    const btnGo = await $('input[id="input_go"]');

    await usernameInput.setValue('phonetn');
    await passwordInput.setValue('APwXE9ifl@');
    await btnGo.click();

    const phpMyAdminImg = await $('img[id="imgpmalogo"]');
    await expect(phpMyAdminImg).toExist();


    // Insert Call Center Data
    
})

Given("I am on CA Login for {} and {}", async (interviewId, caId) => {

    const credentials = {
        username: "chanmk",
        password: "train"
    }

    await browser.maximizeWindow();
    await browser.url(`https://ca-uat.hanamicrofinance.net/caassessment/${interviewId}/${caId}`);

    async function waitForElementExistence(selector: string, timeoutMs: number) {
        const startTime = Date.now();

        while (Date.now() - startTime < timeoutMs) {
            const isExisting = await $(selector).isExisting();
            if (isExisting) {
                return true; // Element found within the duration
            }
            await browser.pause(100); // Add a small pause between checks
        }

        return false; // Element not found before timeout
    }

    const elementSelector = 'h3=Welcome to CA Assessment';
    const timeoutMs = 5000; // 5 seconds

    const isElementFound = await waitForElementExistence(elementSelector, timeoutMs);

    if (isElementFound) {
        await DashboardPage.caLogin(credentials.username, credentials.password);
    }
})

Given("I am on {} details", async (interviewClientId) => {
    await browser.url(`https://dashboard-uat.hanamicrofinance.net/data-changed-interview-clients/${interviewClientId}`);
    
    const selector = `button[type="submit"]`;
    const timeout = 5000;
    const loginScreenFound = await DashboardPage.waitForElementExistence(selector, timeout);

    console.log("screen found: ", loginScreenFound);

    if (loginScreenFound) {
        await DashboardPage.login("chanmk", "train");
    } else {
        await browser.maximizeWindow();
    }
})