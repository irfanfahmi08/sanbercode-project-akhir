const apiUrl = Cypress.env("apiUrl");

export const stubSubUnit = () => {
    cy.intercept(
        "GET",
        `${apiUrl}/employees/subunit`,
        {
            statusCode: 200,
            body: {
                data: [
                    {
                        subunit: { id: 3, name: "Engineering" },
                        count: 2,
                    },
                    {
                        subunit: { id: 13, name: "Human Resources" },
                        count: 2,
                    },
                    {
                        subunit: { id: 2, name: "Administration" },
                        count: 1,
                    },
                    {
                        subunit: { id: 10, name: "Client Services" },
                        count: 1,
                    },
                ],
                meta: {
                    otherEmployeeCount: 0,
                    unassignedEmployeeCount: 0,
                    totalSubunitCount: 4,
                },
                rels: [],
            },
        }
    ).as("stubSubUnit");
};
