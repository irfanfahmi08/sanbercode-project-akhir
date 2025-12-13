import loginPages from "./loginPages";

class DashboardPages {
    titleWidgets(expectedTitles = []) {
        cy.get(
            ".oxd-grid-item.oxd-grid-item--gutters.orangehrm-dashboard-widget"
        )
            .should("have.length", expectedTitles.length)
            .each(($el, index) => {
                cy.wrap($el).should("contain.text", expectedTitles[index]);
            });
    }

    assertDashboardLoaded() {
        const widgets = [
            ".employee-image",
            ".orangehrm-attendance-card-state",
            ".orangehrm-attendance-card-details",
        ];

        widgets.forEach(selector => {
            cy.get(selector).should("be.visible");
        });
    }

    elements = {
        profileImage: () => cy.get(".employee-image"),
        attendanceState: () => cy.get(".orangehrm-attendance-card-state"),
        attendanceDetails: () => cy.get(".orangehrm-attendance-card-state"),
        attendanceFulltime: () => cy.get(".orangehrm-attendance-card-fulltime"),
        attendanceBtn: () => cy.get(".orangehrm-attendance-card-action"),
        attendanceWeek: () => cy.get(".orangehrm-attendance-card-summary-week"),
        attendanceTotalTime: () =>
            cy.get(".orangehrm-attendance-card-summary-total"),
        attendanceChart: () => cy.get(".emp-attendance-chart"),
        toDoListPendingBtn: () => cy.contains("(1) Pending Self Review"),
        toDoListReady: () =>
            cy.get(
                "button[class='oxd-icon-button oxd-icon-button--info orangehrm-report-icon']"
            ),
        toDoListPendingText: () => cy.contains("(1) Pending Self Review"),
        todoList: () => cy.get(".orangehrm-todo-list"),
        todoItems: () =>
            cy.get(".orangehrm-todo-list .orangehrm-todo-list-item"),
        quickLaunchLeaveBtn: () => cy.get("button[title='Assign Leave']"),
        quickLaunchTimeSheetsBtn: () => cy.get("button[title='Timesheets']"),
        quickLaunchLeaveListBtn: () => cy.get("button[title='Leave List']"),
        quickLaunchApplyLeaveBtn: () => cy.get("button[title='Apply Leave']"),
        quickLaunchMyLeaveBtn: () => cy.get("button[title='My Leave']"),
        quickLaunchMyTimeSheetsBtn: () =>
            cy.get("button[title='My Timesheet']"),
        buzzLatestPost: index =>
            cy
                .get(".orangehrm-buzz-widget-header-text")
                .eq(index)
                .parents(".orangehrm-buzz-widget-header"),

        attendancePunchIn: () => cy.get("button[type='submit']"),
        employeeConfiguration: () =>
            cy.get(".oxd-icon.bi-gear-fill.orangehrm-leave-card-icon"),
    };

    menuItem(menu) {
        return cy.get("a.oxd-main-menu-item").contains(menu);
    }

    chartWidget(idx = 0) {
        return cy.get(".oxd-chart-legend").eq(idx);
    }

    toDoList(idx) {
        return cy.get(".orangehrm-todo-list").eq(idx);
    }

    chartLegendTitle(idx = 0, title) {
        return this.chartWidget(idx).find(`span[title='${title}']`);
    }

    employeeDistributionChart(index = 0) {
        return cy.get(".emp-distrib-chart").eq(index);
    }

    toDoListItem(index) {
        index.forEach(idx => {
            this.toDoList(idx).should("be.visible");
        });
    }

    assertChartLegendTitle(idx = 0, titles = []) {
        titles.forEach(title => {
            this.chartLegendTitle(idx, title).should("be.visible");
        });
    }

    asserEmployeetDistributionChart(index = 0) {
        this.employeeDistributionChart(index).within(() => {
            cy.get("canvas").should("be.visible");
            cy.get(".oxd-chart-legend").should("be.visible");
        });
    }

    assertAttendanceWidget() {
        this.elements.profileImage().should("be.visible");
        this.elements.attendanceDetails().should("be.visible");
        this.elements.attendanceFulltime().should("be.visible");
        this.elements.attendanceBtn().should("be.visible");
        this.elements.attendanceWeek().should("be.visible");
        this.elements.attendanceTotalTime().should("be.visible");
        this.elements.attendanceChart().should("be.visible");
    }

    assertToDoListWidget() {
        this.elements.toDoListPendingBtn().should("be.visible");
        this.elements.toDoListReady().should("be.visible");
    }

    assertQuickLaunchWidget() {
        this.elements.quickLaunchLeaveBtn().should("be.visible");
        this.elements.quickLaunchTimeSheetsBtn().should("be.visible");
        this.elements.quickLaunchLeaveListBtn().should("be.visible");
        this.elements.quickLaunchApplyLeaveBtn().should("be.visible");
        this.elements.quickLaunchMyLeaveBtn().should("be.visible");
        this.elements.quickLaunchMyTimeSheetsBtn().should("be.visible");
    }

    assertBuzzLatestPostWidget(index) {
        this.elements.buzzLatestPost(index).should("be.visible");
    }

    assertTodoListLoaded() {
        this.elements
            .todoItems()
            .should("have.length.greaterThan", 0)
            .each($item => {
                cy.wrap($item).should("be.visible");
            });
    }

    attendanceClickBtn(menu, status) {
        this.elements.attendanceBtn().click();
        loginPages.redirectUrl("attendance/punchIn");
        cy.get("button[type='submit']").click();
        cy.wait(10000);
        this.menuItem(menu).click();
        this.elements.attendanceState().should("contain", status);
    }

    clickTodoListPending(menu) {
        this.elements.toDoListPendingText().click();
        loginPages.redirectUrl("performance/myPerformanceReview");
        this.menuItem(menu).click();
    }

    clickTodoListReady() {
        this.elements.toDoListReady().click();
        loginPages.redirectUrl("recruitment/viewCandidates?statusId=4");
    }

    clickTodoItem() {
        this.elements.todoItems().then($items => {
            const randomIndex = Math.floor(Math.random() * $items.length);
            cy.wrap($items[randomIndex]).click();
        });
    }

    clickQuickLaunchBtn(menu) {
        this.elements.quickLaunchLeaveBtn().click();
        loginPages.redirectUrl("leave/assignLeave");
        this.menuItem(menu).click();
        this.elements.quickLaunchLeaveListBtn().click();
        loginPages.redirectUrl("leave/viewLeaveList");
        this.menuItem(menu).click();
        this.elements.quickLaunchTimeSheetsBtn().click();
        loginPages.redirectUrl("time/viewEmployeeTimesheet");
        this.menuItem(menu).click();
        this.elements.quickLaunchApplyLeaveBtn().click();
        loginPages.redirectUrl("leave/applyLeave");
        this.menuItem(menu).click();
        this.elements.quickLaunchMyLeaveBtn().click();
        loginPages.redirectUrl("leave/viewMyLeaveList");
        this.menuItem(menu).click();
        this.elements.quickLaunchMyTimeSheetsBtn().click();
        loginPages.redirectUrl("time/viewMyTimesheet");
    }

    clickBuzzPosts(idx) {
        this.elements.buzzLatestPost(idx).click();
        loginPages.redirectUrl("buzz/viewBuzz");
    }

    clickEmployeeConfiguration() {
        this.elements.employeeConfiguration().click();
        cy.contains("Configurations");
    }

    clickChartLegendTitle(idx = 0, titles = []) {
        titles.forEach(title => {
            this.chartLegendTitle(idx, title).click();
            cy.wait(1000);
        });
    }
}

export default new DashboardPages();
