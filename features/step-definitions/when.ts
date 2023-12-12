import { When } from "@wdio/cucumber-framework"
import { browser } from "@wdio/globals"

import DashboardPage from "../pageobjects/dashboard.page.js"

When("I login with {word} and {word}", async (username, password) => {
    await DashboardPage.login(username, password)
})

When("I click on Interview Results tab", async () => {
    console.log("I click on Interview Results tab")
    console.log("isAlertOpen", await browser.isAlertOpen())

    // If an alert box pops up, dismiss it
    if (await browser.isAlertOpen()) {
        await browser.dismissAlert();
    }

    // Navigate to Interview Results 
    const firstInterviewResultTab = await DashboardPage.firstInterviewResultsTab;
    await firstInterviewResultTab.click();
    
    const secondInterviewResultTab = await DashboardPage.secondInterviewResultsTab;
    await secondInterviewResultTab.click();
})

When("I search {} in search box", async (input) => {
    await DashboardPage.searchInput.setValue(input);
})

When("I click on {} button", async (buttonName) => {
    const button = await $(`=${buttonName}`)
    await button.click()
})

When("I click on Feedback To FO option", async () => {
    const threeDotMenu = await $("#root > div > div.row.mb-3 > div.col-8.text-end > svg:nth-child(4)")
    await threeDotMenu.click()
})

When("I navigate to Interview Results tab", async () => {
    await DashboardPage.navigateToInterviewResults();
})

When("I click on View CA Assessment credentials: {word} {word}", async (username, password) => {
    const button = await $(`=View CA Assessment`)
    await button.click()

    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])

    const title = await $('h3*=Welcome to CA Assessment')
    await title.waitForDisplayed({ timeoutMsg: "CA Assessment title was not displayed" })

    await DashboardPage.caLogin(username, password)
})

When("I choose Feedback To FO option", async () => {
    const parentMenuIcon = await DashboardPage.threeDotMenu;
    await parentMenuIcon.waitForDisplayed({
        timeoutMsg: `${parentMenuIcon} was not displayed`
    })
    await parentMenuIcon.click()

    const label = await DashboardPage.feedbackToFoOptionBtn;
    await label.waitForClickable({
        timeoutMsg: `${label} was not clickable`
    })
    await label.click();
    
    const commentBox = await DashboardPage.feedbackToFoCommentBox;    
    await commentBox.waitForClickable({ timeoutMsg: "comment box was not clickable after 5s", timeout: 5000})
    await commentBox.setValue("Change Request Cucumber Test");

    const confirmBtn = await DashboardPage.feedbackToFoConfirmBtn;
    await confirmBtn.click();
    await browser.pause(3000);
})