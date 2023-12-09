import { When } from "@wdio/cucumber-framework"

import DashboardPage from "../pageobjects/dashboard.page.js"

When("I login with {word} and {word}", async (username, password) => {
    await DashboardPage.login(username, password)
})

When("I click on Interview Results tab", async () => {
    await (await DashboardPage.firstInterviewResultsTab).waitForClickable({ 
        timeout: 3000, timeoutMsg: "First interview tab did not become clickable"
    });
    (await DashboardPage.firstInterviewResultsTab).click();
    await (await DashboardPage.secondInterviewResultsTab).waitForClickable({
        timeout: 3000, timeoutMsg: "Second interview tab did not become clickable"
    });
    (await DashboardPage.secondInterviewResultsTab).click();
})

When("I search {} in search box", async (input) => {
    await DashboardPage.searchInput.setValue(input);
})
