import DashboardPage from "./dashboard.page.js";

class CAdashboardPage {
    public async createCAassessment() {
        await DashboardPage.chooseCAassessmentOption()
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
    }
}

export default new CAdashboardPage();