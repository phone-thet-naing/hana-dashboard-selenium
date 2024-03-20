import DashboardPage from "./dashboard.page.js";

class CAdashboardPage {
    public get caFormMaximizeBtn () {
        return $('#root > div > div.ca-desktop-form.p-2.pt-2 > div.pl-4.pr-4 > div > div > div > svg:nth-child(2)');
    }

    public async createCAassessment() {
        await DashboardPage.chooseCAassessmentOption() 
        const data = {
            mcixFamilyMember: "yes",
            // loan_purpose: "Agriculture",
            loan_purpose: "Livestock",
            // loan_purpose: "Production",
            // loan_purpose: "Service",
            // loan_purpose: "Trade",
            business_photo: "yes",
            // business_photo: "no",
            descriptionOption: "2000 - မွေးမြူရေး အသားတိုးကြက်",
        }
    
        await DashboardPage.createCAForm(data);
    }
}

export default new CAdashboardPage();