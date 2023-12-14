import { When } from "@wdio/cucumber-framework"
import { browser } from "@wdio/globals"

import DashboardPage from "../pageobjects/dashboard.page.js"
import { NewData } from "./then.js";
import { addInterviewStatus, getCurrentDateTime, writeJSON } from "../../utility/util.js";

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
    const notFoundMsg = await $('h1*=404 Not Found');

    const button = await $(`=View CA Assessment`)
    await button.click()

    // Switch focus on the new window tab
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])

    // If 404 occurs, throw error and fail the test
    if (await notFoundMsg.isDisplayed()) {
        console.log("404 Not Found error occured")

        const error = "Unexpected 404 Not Found Error Occurred!"

        throw error;
    }

    // In test automation, since a blank Chrome profile is used, we have to login for the CA dashboard as well.    
    const title = await $('h3*=Welcome to CA Assessment')
    await title.waitForDisplayed({ timeoutMsg: "CA Assessment title was not displayed" })

    await DashboardPage.caLogin(username, password)    
})

When("I choose Feedback To FO", async () => {
    console.log("Reached")
    // Add interview status to json
    addInterviewStatus('change_request');

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
})

When("I choose {} option", async (option) => {
    // Possible option = View Assessment, Undo Ngasaya, Feedback To FO
    const mapper = {
        "View Assessment": "ca_review",
        "Undo Ngasaya": "undo_ngasaya",
        "Feedback To FO": "change_request"
    }

    // Add interview status to json
    addInterviewStatus(mapper[option]);

    // Open three dot menu
    const parentMenuIcon = await DashboardPage.threeDotMenu;
    await parentMenuIcon.waitForClickable({
        timeoutMsg: `Three-dot menu was not clickable`
    })
    await parentMenuIcon.click();

    // Might need, dont delete
    const buttonMapper = {
        "View Assessment": "viewAssessmentOptionBtn",
        "Undo Ngasaya": "undoNgasayaOptionBtn",
        "Feedback To FO": "feedbackToFoOptionBtn"
    }

    let selectedOption: any;
    // Setting the assigned option button based on input 
    if (option === "View Assessment") {
        selectedOption = await DashboardPage.viewAssessmentOptionBtn; 
    } else if (option === "Undo Ngasaya") {
        selectedOption = await DashboardPage.undoNgasayaOptionBtn;
    } else {
        selectedOption = await DashboardPage.feedbackToFoOptionBtn;
    }

    // Click the selected option
    await selectedOption.waitForClickable({
        timeoutMsg: option + " button was not clickable after timeout"
    });
    await selectedOption.click();
})

When("I filter interviews with interview status {}", async (interviewStatus) => {
    const interviewStatusFilter = await DashboardPage.interviewStatusFilter;
    console.log('Initial selected title on interview status filter => ', await interviewStatusFilter.getAttribute('title'));
    const interviewStatusOptions = await $$('input[type="checkbox"]');
    console.log('interview status option count => ', interviewStatusOptions.length);
    const selectedStatus = await $(`input[type="checkbox"][value="${interviewStatus}"]`);    

    await interviewStatusFilter.waitForClickable({ timeoutMsg: "Interview Status Filter was Not Clickable" });
    await interviewStatusFilter.click();
    await selectedStatus.waitForClickable({ timeout: 5000, timeoutMsg: `${interviewStatus} was not clickable` });
    await selectedStatus.click();

    // close the filter
    await interviewStatusFilter.click();

    // Search with selected filter options
    await (await DashboardPage.btnFilter).click();
})

When("I fill ca review form", async () => {
    const data = {
        mcixFamilyMember: "yes",
        // mcixFamilyMember: "no",
        loan_purpose: "Agriculture",
        // loan_purpose: "Livestock",
        // loan_purpose: "Production",
        // loan_purpose: "Service",
        // loan_purpose: "Trade",
        business_photo: "yes",
        // business_photo: "no",
    }

    // choosing mcix family members
    if (data.mcixFamilyMember === "yes") {
        await expect(await DashboardPage.mcixFamilyMembersYesRadio).toBeClickable();
        await (await DashboardPage.mcixFamilyMembersYesRadio).click();
    } else {
        await expect(await DashboardPage.mcixFamilyMembersNoRadio).toBeClickable();
        await (await DashboardPage.mcixFamilyMembersNoRadio).click();
    }

    // Choosing Loan Purpose
    const loanPurposeMenu = await DashboardPage.loanPurposeOptionMenu;
    await loanPurposeMenu.click();

    const chosenOption = await $(`div*=${data.loan_purpose}`);
    await chosenOption.click();

    // Choosing business description
    const businessDescriptionMenu = await (await $(`label*=${data.loan_purpose} (Business Description)`)).nextElement();
    await expect(businessDescriptionMenu).toBeClickable();
    await businessDescriptionMenu.click();
    
    // const options = await (await $('div[class="css-26l3qy-menu"]')).$$('div');
    // console.log("Option count: ", options.length)
    // const desiredBusinessDescriptionOption = "1000 - လယ်ယာ စိုက်ပျိုးရေး စပါး"
    const desiredBusinessDescriptionOption = "1103 - နှစ်ရှည်သီးနှံ စိုက်ပျိုးရေး ထောပတ်ပင်"
    const selectedSubOption = await $('div*=' + desiredBusinessDescriptionOption);
    await selectedSubOption.click();

    // Setting value in ချေးငွေကို မည်သည့်နေရာတွင်အသုံးပြုမည်နည်း input
    const placeToUseLoan = await (await $('label*=ချေးငွေကို မည်သည့်နေရာတွင်အသုံးပြုမည်နည်း')).nextElement();
    await placeToUseLoan.setValue("Automated Test");

    // Setting value in ယခုလုပ်ငန်းလုပ်ကိုင်သည်မှာ နှစ်မည်မျှကြာခဲ့သနည်း။ input
    const businessPeriod = await (await $('label*=ယခုလုပ်ငန်းလုပ်ကိုင်သည်မှာ နှစ်မည်မျှကြာခဲ့သနည်း။')).nextElement();
    await businessPeriod.setValue(1); 

    // Choosing business photo radio option
    if (data.business_photo === "yes") {
        await expect(await DashboardPage.businessPhotoYesRadio).toBeClickable()
        await (await DashboardPage.businessPhotoYesRadio).click()
    } else {
        await expect(await DashboardPage.businessPhotoNoRadio).toBeClickable()
        await (await DashboardPage.businessPhotoNoRadio).click()
    }

    // CA approved amount
    const caApprovedAmountInput = await (await $('label*=CA မှ ထောက်ခံသော ပမာဏ')).nextElement();
    await caApprovedAmountInput.setValue(100000);

    await expect(await DashboardPage.caFormSubmitBtn).toBeClickable();
    await (await DashboardPage.caFormSubmitBtn).click();

    // await browser.pause(5000);
})

When("I insrt call center queries", async function () {
    const databaseGroup = await $('li[class="last navGroup"]');
    await expect(databaseGroup).toBeClickable();
    await databaseGroup.click();
    
    // const dbUatDashboard = await $('li[class="database database"]');
    const dbUatDashboard = await $('=uat_dashboard');
    await expect(dbUatDashboard).toBeClickable();
    await dbUatDashboard.click();
 })