const dashboardUrl = "https://dashboard-uat.hanamicrofinance.net/login"

class DashboardPage {
    public get username() {
        return $('input[name="user_name"]')
    }

    public get password() {
        return $('input[name="password"]')
    }

    public get loginBtn() {
        return $('button')
    }

    public async goToDashboard() {
        await browser.url(dashboardUrl)
    }

    public async login(username: string, password: string) {
        await this.username.setValue(username)
        await this.password.setValue(password)
        await this.loginBtn.click()
    }
}

export default new DashboardPage()