import { interceptDashboardApis } from "../support/intercept/dashboard";
import { stubSubUnit } from "../support/intercept/stubSubUnit";
import dashboardPages from "../support/pages/dashboardPages";
import loginPages from "../support/pages/loginPages";

const baseUrl = Cypress.env("baseUrl");

describe("Dashboard Page", () => {
    beforeEach(() => {
        loginPages.loginWith("admin", "admin123", "dashboard/index");
        cy.get(
            ".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module"
        ).should("be.visible");
        dashboardPages.titleWidgets([
            "Time at Work",
            "My Actions",
            "Quick Launch",
            "Buzz Latest Posts",
            "Employees on Leave Today",
            "Employee Distribution by Sub Unit",
            "Employee Distribution by Location",
        ]);
    });

    it("Memastikan seluruh widget tampil", () => {
        dashboardPages.assertAttendanceWidget();
        dashboardPages.assertTodoListLoaded();
        dashboardPages.assertQuickLaunchWidget();
        dashboardPages.assertBuzzLatestPostWidget(0);
        dashboardPages.asserEmployeetDistributionChart(0);
        dashboardPages.asserEmployeetDistributionChart(1);
        dashboardPages.assertChartLegendTitle(0, [
            "Engineering",
            "Human Resources",
            "Administration",
            "Client Services",
            "Unassigned",
        ]);
        dashboardPages.assertChartLegendTitle(1, [
            "Texas R&D",
            "New York Sales Office",
            "Unassigned",
        ]);
    });

    it("User melakukan attendance", () => {
        dashboardPages.attendanceClickBtn("Dashboard", "Punched In");
    });

    it("User melihat list interview", () => {
        dashboardPages.clickTodoItem();
    });

    it("User melakukan click tiap button pada quick Launch widget", () => {
        dashboardPages.clickQuickLaunchBtn("Dashboard");
    });

    it("User melihat posts", () => {
        dashboardPages.clickBuzzPosts(0);
    });

    it("User melihat employee configurations", () => {
        dashboardPages.clickEmployeeConfiguration();
    });

    it("User view chart per title pada employee distribution sub unit", () => {
        dashboardPages.clickChartLegendTitle(0, [
            "Engineering",
            "Human Resources",
            "Administration",
            "Client Services",
            "Unassigned",
        ]);
    });

    it("User view chart per title pada employee distribution location", () => {
        dashboardPages.clickChartLegendTitle(1, [
            "Texas R&D",
            "New York Sales Office",
            "Unassigned",
        ]);
    });
});

describe("Melakukan Intercept", () => {
    beforeEach(() => {
        loginPages.visit();
        loginPages.fillUsername("admin");
        loginPages.fillPassword("admin123");
        interceptDashboardApis()
        loginPages.submitBtn();
    });

    it("Intercept action summary", () => {
        cy.wait("@actionSummary");
    });

    it("Intercept shortcuts", () => {
        cy.wait("@shortcuts");
    });

    it("Intercept sub unit", () => {
        cy.wait("@subUnit");
    });

    it("Intercept locations", () => {
        cy.wait("@locations");
    });

    it("Intecept response body shortcuts", () => {
        cy.intercept(
            "GET",
            "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts",
            {
                statusCode: 200,
                body: {
                    data: {
                        "leave.assign_leave": false,
                        "leave.leave_list": false,
                        "leave.apply_leave": false,
                        "leave.my_leave": true,
                        "time.employee_timesheet": true,
                        "time.my_timesheet": true,
                    },
                },
            }
        ).as("quickLaunch");
        cy.wait("@quickLaunch");
    });

    it("Intecept response body subunit", () => {
        stubSubUnit()
        cy.wait("@stubSubUnit");
    });
});
