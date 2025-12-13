const baseUrl = Cypress.env("baseUrl");
const apiUrl = Cypress.env("apiUrl");

export const interceptDashboardApis = () => {
    cy.intercept("GET", `${baseUrl}/dashboard/index`).as("actionSummary");

    cy.intercept("GET", `${apiUrl}/shortcuts`).as("shortcuts");

    cy.intercept(
        "GET",
        `${apiUrl}/employees/subunit`
    ).as("subUnit");

    cy.intercept(
        "GET",
        `${apiUrl}/employees/locations`
    ).as("locations");
};