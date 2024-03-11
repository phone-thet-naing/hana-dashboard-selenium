import { $, browser } from "@wdio/globals"
import * as fs from "fs"
import { addInterviewStatus, getCallCenterQuery, getCurrentDateTime } from "../../utility/util.js"

const dashboardUrl: string = "https://dashboard-uat.hanamicrofinance.net/login"
// const dashboardUrl: string = "https://www.youtube.com/";

interface CAFormData {
    mcixFamilyMember: string;
    loan_purpose: string;
    business_photo: string;
}

class DashboardPage {
    public get username() {
        return $('input[name="user_name"]')
    }

    public get caUsernameInput() {
        return $('input[name="username"]')
    }

    public get password() {
        return $('input[name="password"]')
    }

    public get loginBtn() {
        return $('button')
    }

    public async goToDashboard() {
        await browser.maximizeWindow();
        await browser.url(dashboardUrl);
    }

    public get firstInterviewResultsTab() {
        return $('span*=Interview Results')
    }

    public get secondInterviewResultsTab() {
        return $('a[href="https://dashboard-uat.hanamicrofinance.net/interview-results"]')
    }

    public get searchInput() {
        return $('input[type="search"]')
    }

    public get threeDotMenu() {
        return $('#root > div > div.row.mb-3 > div.col-8.text-end > svg:nth-child(4)')
    }

    public get changeRequestCommentBox() {
        return $('textarea.form-control[placeholder="Leave a comment here"]')
    }

    public get commentBox() {
        return $('textarea[name="comment"]');
    }

    public get feedbackToFoOptionBtn() {
        return $(`div*=Feedback To FO`)
    }

    public get viewAssessmentOptionBtn() {
        return $('#root > div > div.d-flex.flex-column.p-3.shadow.border.ca-radius.ca-popup-top.w-auto.ca-open > div > nav > div:nth-child(1)')
        // return $('div*=View Assessment')
    }
    
    public get undoNgasayaOptionBtn() {
        return $("div*=Undo Ngasaya");
    }

    public get feedbackToFoCommentBox() {
        return $('body > div:nth-child(13) > ons-dialog > div.dialog > div > div > div.row.p-1 > div.col-12.mb-2 > textarea');
    }

    public get feedbackToFoConfirmBtn() {
        return $("button*=Feedback");
    }

    public get processAlert() {
        return $('div[id="datatable_processing"]');
    }

    public get interviewStatusFilter() {
        return $('button[class="multiselect dropdown-toggle btn btn-default"][data-toggle="dropdown"]');
    }

    public get foFilter() {
        return $('select[id="filterFOStation"]')
    }

    public get btnFilter() {
        return $('button[id="btnSearchTable"]');
    }
    
    public get btnReset() {
        return $('button[id="btnResetTable"]');
    }

    public get changeRequestSuccessAlert() {
        return $('div*=change_request successfully.')
    }

    public get caReviewForm() {
        return $('div[class="ca-desktop-form"]')
    }

    public get caReviewFormHeader() {
        return $('h4*=Create CA Assessment')
    }

    public get loanPurposeSubMenu() {
        return $('#root > div > div.ca-desktop-form.ca-desktop-form-large.p-2.pt-2 > div.ca-form-container.ca-form-desktop-container > div > div:nth-child(1) > div:nth-child(2) > div > div > div.css-1hwfws3 > div.css-1uccc91-singleValue');
    }

    public get mcixFamilyMembersYesRadio() {
        return $('input[type="radio"][name="ca_mcix_family_members"][value="1001"]')
    }

    public get mcixFamilyMembersNoRadio() {
        return $('input[type="radio"][name="ca_mcix_family_members"][value="1002"]')
    }

    public get businessPhotoYesRadio() {
        return $('input[type="radio"][name="ca_business_photo"][value="1001"]');
    }

    public get businessPhotoNoRadio() {
        return $('input[type="radio"][name="ca_business_photo"][value="1002"]');
    }

    public get caFormSubmitBtn() {
        return $('button*=Submit');
    }

    public get loanPurposeOptionMenu() {
        // return $('div[class="26l3qy-menu"]');
        return $('#root > div > div.ca-desktop-form.p-2.pt-2 > div.ca-form-container.ca-form-desktop-container > div > div:nth-child(1) > div:nth-child(1) > div > div > div.css-1hwfws3')
    }

    public get interviewResultDetailInCaDashboard() {
        return $("h3*=Interview Result Detail");
    }

    public get btnApprove() {
        return $('button=Approve');
    }

    public async login(username: string, password: string) {
        console.table({
            username: username,
            password: password
        })
        await this.username.setValue(username)
        await this.password.setValue(password)
        await this.loginBtn.click()
    }

    public async caLogin(username: string, password: string) {
        console.log('username setValue for CA Login');
        await this.caUsernameInput.setValue(username);
        console.log('password setValue for CA Login');
        await this.password.setValue(password);

        console.log('clicking sign in button ca')
        await this.loginBtn.click()
    }

    public async navigateToInterviewResults() {
        if (await browser.isAlertOpen()) {
            await browser.dismissAlert();
        }
    
        // Navigate to Interview Results 
        const firstInterviewResultTab = await this.firstInterviewResultsTab;
        await firstInterviewResultTab.click();
        
        const secondInterviewResultTab = await this.secondInterviewResultsTab;
        await secondInterviewResultTab.click();
    
        const heading = "Interview Results"
        await expect(await $(`h1*=${heading}`)).toExist();
    }

    public async insertCallCenterQuery(interviewList: string[]) {
        const uatPlusIcon = await $('li.last.navGroup img.ic_b_plus');
        await expect(uatPlusIcon).toBeClickable();
        await uatPlusIcon.click();

        const dbUatDashboard = await $('a*=uat_dashboard');
        await expect(dbUatDashboard).toBeClickable();
        await dbUatDashboard.click();

        const actionEventsTableName = await $('a*=action_events');
        await actionEventsTableName.waitForExist({ timeoutMsg: "Action Event table not visible" });

        // await browser.pause(10000)

        const sqlTab = await $('a*=SQL');
        await expect(sqlTab).toBeClickable();
        await sqlTab.click();

        // Converting Interview IDs into Queries
        // Inserting Call Center Query Data
        const callCenterQueries = interviewList.map((interview_id) => {
            const currentDateTime = getCurrentDateTime("yyyy-mm-dd");
            
            const queryData = {
                interview_id: interview_id, 
                call_date: currentDateTime, 
                created_at: currentDateTime, 
                updated_at: currentDateTime, 
                ca_assessment_date: currentDateTime
            }

            const callCenterQuery = getCallCenterQuery(queryData);

            return callCenterQuery;
        })    

        const submitQueryBtn = await $('input[id="button_submit_query"][value="Go"]');
        await submitQueryBtn.waitForClickable({ timeoutMsg: "Submit button not clickable" });

        fs.appendFile('./data/query.txt', callCenterQueries.join("\n"), function (error) {
            if (error) throw error;
            console.log("File saved!")
        })

        await browser.keys(callCenterQueries.join("\n"));

        await submitQueryBtn.click();
    }

    public async createCAForm(data: CAFormData) {
        try {            
            // choosing mcix family members
            if (data.mcixFamilyMember === "yes") {
                await expect(await this.mcixFamilyMembersYesRadio).toBeClickable();
                await (await this.mcixFamilyMembersYesRadio).click();
            } else {
                await expect(await this.mcixFamilyMembersNoRadio).toBeClickable();
                await (await this.mcixFamilyMembersNoRadio).click();
            }

            // Choosing Loan Purpose
            const loanPurposeMenu = await this.loanPurposeOptionMenu;
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
                await expect(await this.businessPhotoYesRadio).toBeClickable()
                await (await this.businessPhotoYesRadio).click()
            } else {
                await expect(await this.businessPhotoNoRadio).toBeClickable()
                await (await this.businessPhotoNoRadio).click()
            }

            // CA approved amount
            const caApprovedAmountInput = await (await $('label*=CA မှ ထောက်ခံသော ပမာဏ')).nextElement();
            await caApprovedAmountInput.setValue(100000);

            await (await this.caFormSubmitBtn).waitForClickable({ timeout: 5000, timeoutMsg: "CA Form Submit Button was not Clickable" });
            await (await this.caFormSubmitBtn).click();
        } catch (error) {
            console.log("Create CA Form Error: ", error);
        }
    }

    public async gotoCAassessment(username: string, password: string) {
        const notFoundMsg = await $('h1*=404 Not Found');

        const button = await $(`=View CA Assessment`)
        await button.click()
    
        // Switch focus on the new window tab
        const handles = await browser.getWindowHandles();
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
    
        await this.caLogin(username, password)           
    }

    public async gotoCAassessmentWhenDoingMultipleInterviews(username: string, password: string) {
        // Take the link to `View CA Assessment` button
        const button = await $(`=View CA Assessment`);
        await expect(button).toHaveAttribute("href");
        const caAssessmentBtnUrl = await button.getAttribute("href");
        // await button.click()

        // Switch to CA Dashboard View
        await browser.newWindow(caAssessmentBtnUrl, { windowName: "ca_view" });
    
        /*
        // Switch focus on the new window tab
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1])
        */
    
        const notFoundMsg = await $('h1*=404 Not Found');
        // If 404 occurs, throw error and fail the test
        if (await notFoundMsg.isDisplayed()) {
            console.log("404 Not Found error occured")
    
            const error = "Unexpected 404 Not Found Error Occurred!"
    
            throw error;
        }
    
        // In test automation, since a blank Chrome profile is used, we have to login for the CA dashboard as well.    
        const title = await $('h3*=Welcome to CA Assessment');

        try {
            await title.waitForDisplayed({ timeout: 5000 });
            console.log("Welcome to CA Assessment was displayed, performing caLogin");
            await this.caLogin(username, password);           
        } catch (error) {
            console.log("Welcome to CA Assessment was not displayed");
        } 
    }

    public async chooseCAassessmentOption() {
        // Add interview status to json
        addInterviewStatus("View Assessment");

        // Open three dot menu
        const parentMenuIcon = await this.threeDotMenu;

        try {
            await parentMenuIcon.waitForExist({
                timeout: 10000,
                timeoutMsg: `Three-dot menu was not visible after 10 seconds`
            })
            await parentMenuIcon.click();
        } catch (error) {
            console.error("Three dot menu was not clicked!");
            throw error
        }        

        const caAssessmentBtn = await this.viewAssessmentOptionBtn;
        // Click the selected option

        try {
            await caAssessmentBtn.waitForClickable({
                timeout: 5000,
                timeoutMsg: "CA Assessment button was not clickable after timeout"
            });
            await caAssessmentBtn.click();  
        } catch (error) {
            console.error("CA Assessment button was not clicked!");
            throw error;
        }    
    }

    public async approveMultipleInterviews() {
        // Enter comment in comment box
        const commentBox = await $('textarea[name="comment"]');
        await commentBox.setValue("Testing Approve");

        await browser.pause(3000);
    }
}

export default new DashboardPage()