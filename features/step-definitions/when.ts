import { When } from "@wdio/cucumber-framework"
import { browser } from "@wdio/globals";

import DashboardPage from "../pageobjects/dashboard.page.js"
import { addInterviewStatus, getCallCenterQuery, getCurrentDateTime, getCurrentEpochTime, writeJSON } from "../../utility/util.js";
import CAdashboardPage from "../pageobjects/ca-dashboard.page.js";

interface MapperType {
    "View Assessment": string
    "Undo Ngasaya": string
    "Feedback To FO": string
}

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
    await DashboardPage.gotoCAassessment(username, password);
})

When("I choose Feedback To FO", async () => {
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
    await commentBox.waitForClickable({ timeoutMsg: "comment box was not clickable after 5s", timeout: 5000 })
    await commentBox.setValue("Change Request Cucumber Test");

    const confirmBtn = await DashboardPage.feedbackToFoConfirmBtn;
    await confirmBtn.click();
})

When("I choose {} option", async (option: string) => {
    // Possible option = View Assessment, Undo Ngasaya, Feedback To FO
    const mapper: MapperType = {
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

    let selectedOption: WebdriverIO.Element;
    console.log("Reached here!");
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

    const commentBox = await $('textarea[class="form-control"]');
    const comment = option === "View Assessment" ? "CA Assessment Sample"
        : option === "Undo Ngasaya" ? "Undo Ngasaya Sample"
            : option === "Feedback To FO" ? "Not Valid"
                : "None of the above";
    await commentBox.setValue(comment);
})

When("I filter interviews with interview status {}", async (interviewStatus) => {
    const interviewStatusFilter = await DashboardPage.interviewStatusFilter;
    const interviewStatusOptions = await $$('input[type="checkbox"]');
    const selectedStatus = await $(`input[type="checkbox"][value="${interviewStatus}"]`);

    await interviewStatusFilter.waitForClickable({ timeoutMsg: "Interview Status Filter was Not Clickable" });
    await interviewStatusFilter.click();
    await selectedStatus.waitForClickable({ timeout: 5000, timeoutMsg: `${interviewStatus} was not clickable` });
    await selectedStatus.click();

    // Close the filter
    await interviewStatusFilter.click();

    // Search with selected filter options
    await (await DashboardPage.btnFilter).click();
})

When("I set interview status to {}", async (interviewStatus) => {
    const interviewStatusFilter = await DashboardPage.interviewStatusFilter;
    const interviewStatusOptions = await $$('input[type="checkbox"]');
    const selectedStatus = await $(`input[type="checkbox"][value="${interviewStatus}"]`);

    await interviewStatusFilter.waitForClickable({ timeoutMsg: "Interview Status Filter was Not Clickable" });
    await interviewStatusFilter.click();
    await selectedStatus.waitForClickable({ timeout: 5000, timeoutMsg: `${interviewStatus} was not clickable` });
    await selectedStatus.click();

    // Close the filter
    await interviewStatusFilter.click();
})

When("I filter", async () => {
    const filterBtn = await DashboardPage.btnFilter;
    await filterBtn.click();
})

When("I create CA Review Form", async function () {
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

    await DashboardPage.createCAForm(data);
})

When("I insert call center queries: {}", async function (interviewListInput) {
    const interviewList: string[] = interviewListInput.split(" ").join("").split("[").join("").split("]").join("").split(",");

    await DashboardPage.insertCallCenterQuery(interviewList);

    await browser.pause(5000);
})

When("I make multiple CA Reviews: CA credentials {}, {}", async function (username, password) {
    const interviewList = await browser.waitUntil(async function () {
        const btnList = await $$('a=View');
        const dataProcessingAlert = await DashboardPage.processAlert;
        return await dataProcessingAlert.isDisplayed() === false ? btnList : false
    })

    console.log('view btn count: ', interviewList.length)
    let index = 0;

    for (const viewBtn of interviewList) {
        // get the original window handle
        const originalWindowHandle = await browser.getWindowHandle();
        console.log("original window handle: ", originalWindowHandle);

        // Go to interview
        await expect(viewBtn).toHaveAttribute("href");
        const btnUrl = await viewBtn.getAttribute("href");

        console.log("url: ", btnUrl);

        // open new tab with the link
        const interviewTab = "interview_detail_page" + index;
        await browser.newWindow(btnUrl, { windowName: interviewTab });

        // switch to new tab
        await browser.switchToWindow(interviewTab);

        // If you have to login again
        if (await browser.getUrl() === "https://dashboard-uat.hanamicrofinance.net/login") {
            await DashboardPage.login(username, password);
        }

        // Go to CA Assessment
        await DashboardPage.gotoCAassessmentWhenDoingMultipleInterviews(username, password);

        // Create CA Assessment
        await CAdashboardPage.createCAassessment();

        // Should see success message
        try {
            await (await $('div*=CA assessment create/update successfully.')).waitForDisplayed({ timeout: 5000, timeoutMsg: "CA Assessment Creation Success Message was not Displayed" });
        } catch (error) {
            const screenshotName = "ca_review_message_" + getCurrentEpochTime();
            await browser.saveScreenshot(`./screenshots/${screenshotName}.png`);
            // throw error;
        }

        // close the new tab when done
        await browser.closeWindow();

        // Switch focus back to main window tab
        await browser.switchToWindow(originalWindowHandle);

        index++;
    }

    // await (await DashboardPage.btnFilter).click();

    // await browser.waitUntil(async function () {
    //     return await (await DashboardPage.processAlert).isDisplayed() === false;
    // })

    // const interviewStatusList = await $$('small[class="badge alert-warning"]');
    // let j = 0;
    // for (const status of interviewStatusList) {
    //     console.log("Interview Status " + j + 1 + " ", await status.getText());
    //     await expect(await status.getText()).toBe("ca_reviewed");
    // }
})

When("I approve multiple interviews: CAC credentials {}, {}", async function (username, password) {
    // Fetch the interview list after the processing alert disappears
    const interviewList = await browser.waitUntil(async function () {
        const btnList = await $$('a=View');
        const dataProcessingAlert = await DashboardPage.processAlert;
        return await dataProcessingAlert.isDisplayed() === false ? btnList : false;
    });

    let index = 0;

    for await (const interview of interviewList) {
        // Get the reference of the main page (Interview Results)
        const mainWindowHandle = await browser.getWindowHandle();

        // After that, open the interview in a new window tab
        const interviewUrl = await interview.getAttribute("href");
        await browser.newWindow(interviewUrl, { windowName: "interview_detail_" + index });
        await browser.switchToWindow("interview_detail_" + index);
        index++; // Increment index for the next interview

        // If you have to login again
        if (await browser.getUrl() === "https://dashboard-uat.hanamicrofinance.net/login") {
            await DashboardPage.login(username, password);
        }

        // Provide Comment in Comment Box
        await (await DashboardPage.commentBox).setValue("Testing Approve");

        // Click Approve button
        const btnApprove = await DashboardPage.btnApprove;
        await btnApprove.waitForClickable({ timeoutMsg: "Approve button was not clickabe" });
        await btnApprove.click();

        await expect(await $('h5=Please set your approve Amount')).toExist();

        // Enter Disbursement Date
        try {
            const disbursementDateInput = await $('input[name="last_disbursement_date"]');
            const disbursementDateValue = await disbursementDateInput.getValue();
            await disbursementDateInput.setValue(disbursementDateValue);
        } catch (error) {
            console.log("Disbursement Date Error: ", error);
        }

        // Enter First Repayment Date
        try {
            const firstRepaymentDateInput = await $('input[name="approval_first_repayment_date"]');
            const repaymentDateValue = await firstRepaymentDateInput.getValue();
            await firstRepaymentDateInput.setValue(repaymentDateValue);
        } catch (error) {
            console.log("First Repayment Date Error: ", error);
        }

        // Enter Amount 
        try {
            const approvedAmount = (await (await $('#approve-popup > div > div > div.modal-body > div.form-group.first > div > p > b')).getText()).split(",").join("");
            const approvedAmountInput = await $('input[name="approve_amount"]');
            await approvedAmountInput.setValue(approvedAmount);
        } catch (error) {

        }

        await (await DashboardPage.btnApprove).click();

        await browser.pause(3000);
        return;
    }
})

When("I set FO to {}", async (foName) => {
    const foFilter = await DashboardPage.foFilter;
    console.log(await foFilter.getText()); // expected value: -- Select FO name --
    await foFilter.selectByVisibleText(foName);
})

