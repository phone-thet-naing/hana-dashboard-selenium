import { Given } from "@wdio/cucumber-framework"

import DashboardPage from "../pageobjects/dashboard.page.js"
import getUserInput from "../../utility/terminalPrompt.js"

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