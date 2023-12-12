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

    public get feedbackToFoCommentBox() {
        return $('body > div:nth-child(13) > ons-dialog > div.dialog > div > div > div.row.p-1 > div.col-12.mb-2 > textarea');
    }

    public get feedbackToFoConfirmBtn() {
        return $("button*=Feedback");
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
}

export default new DashboardPage()