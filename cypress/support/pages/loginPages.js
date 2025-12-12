class LoginPages {
    constructor() {
        this.baseUrl = Cypress.env("baseUrl");
    }

    visit() {
        cy.visit(this.baseUrl);
        cy.contains("Login").should("be.visible");
    }

    submitBtn() {
        return cy.get("button[type='submit']").click();
    }

    fillUsername(username) {
        if (username !== "") {
            cy.get("input[placeholder='Username']")
                .type(username)
                .should("have.value", username);
        }
    }

    fillPassword(password) {
        if (password !== "") {
            cy.get("input[placeholder='Password']")
                .type(password)
                .should("have.value", password);
        }
    }

    redirectUrl(path) {
        return cy.url().should("include", `${this.baseUrl}/${path}`);
    }

    loginWith(username, password, path) {
        this.visit();
        this.fillUsername(username);
        this.fillPassword(password);
        this.submitBtn();
        this.redirectUrl(path);
    }

    negativeCasesRequireMsg(username, password, count) {
        this.visit();
        this.fillUsername(username);
        this.fillPassword(password);
        this.submitBtn();
        this.assertRequiredMsg(count);
    }

    negativeCasesAlertMsg(username, password, msg) {
        this.visit();
        this.fillUsername(username);
        this.fillPassword(password);
        this.submitBtn();
        this.assertAlertMsg(msg);
    }

    assertRequiredMsg(count) {
        return cy
            .get(".oxd-input-field-error-message")
            .should("have.length", count) 
            .each($el => {
                expect($el).to.contain("Required");
            });
    }

    assertAlertMsg(msg) {
        return cy.contains(msg).should("be.visible").and("have.css", "color", "rgb(235, 9, 16)")
    }

    forgotPasswordPage(path) {
        this.visit()
        cy.wait(500)
        cy.get(".oxd-text.oxd-text--p.orangehrm-login-forgot-header").click()
        this.redirectUrl(path)
        cy.contains("Reset Password").should("be.visible")
    }

    resetPasswordWith(username, path) {
        this.forgotPasswordPage(path)
        this.fillUsername(username)
    }

    submitResetBtn() {
        return cy.get("button[type='submit']").click()
    }

    afterSubmitResetBtn(path) {
        this.redirectUrl(path)
        cy.contains("Reset Password link sent successfully").should("be.visible")
        cy.contains("A reset password link has been sent to you via email.").should("be.visible")
        cy.contains("You can follow that link and select a new password.").should("be.visible")
        cy.contains("Note:").should("be.visible")
        cy.contains("If the email does not arrive, please contact your OrangeHRM Administrator.").should("be.visible")
    }

    cancelBtn() {
        return cy.get(".orangehrm-forgot-password-button--cancel").click()
    }
}

export default new LoginPages();
