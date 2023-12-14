import { $, browser } from "@wdio/globals"

const dashboardUrl = "https://dashboard-uat.hanamicrofinance.net/login"

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
}

export default new DashboardPage()