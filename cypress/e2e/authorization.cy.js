import loginPages from "../support/pages/loginPages";

describe("User melakukan login", () => {
    it("✅ TC-OHM-001 User bisa melakukan login dengan menggunakan data valid", () => {
        loginPages.loginWith("Admin", "admin123", "dashboard/index");
    });

    it("❌ TC-OHM-002 User melakukan login tanpa input data", () => {
        loginPages.negativeCasesRequireMsg("", "", 2)
    });

    it("❌ TC-OHM-002 User melakukan login tanpa input Password", () => {
        loginPages.negativeCasesRequireMsg("Admin", "", 1)
    });

    it("❌ TC-OHM-003 User melakukan login tanpa input Username", () => {
        loginPages.negativeCasesRequireMsg("", "admin123", 1)
    });
    
    it("❌ TC-OHM-004 User melakukan login dengan kondisi username valid , password salah", () => {
        loginPages.negativeCasesAlertMsg("admin", "password", "Invalid credentials")
    })

    it("❌ TC-OHM-005 User melakukan login dengan kondisi username tidak valid", () => {
        loginPages.negativeCasesAlertMsg("irfan", "password", "Invalid credentials")
    })

    it("❌ TC-OHM-006 User melakukan login dengan kondisi input berisi spasi", () => {
        loginPages.negativeCasesRequireMsg(" ", " ", 2)
    })

    it("❌ TC-OHM-007 User melakukan login dengan kondisi input spasi di awal username", () => {
        loginPages.negativeCasesAlertMsg(" admin", "admin123", "Invalid credentials")
    })

    it("❌ TC-OHM-008 User melakukan login dengan kondisi input spasi di awal password", () => {
        loginPages.negativeCasesAlertMsg("admin", " admin123", "Invalid credentials")
    })

    it("❌ TC-OHM-009 User melakukan login dengan kondisi username dan password huruf kapital", () => {
        loginPages.negativeCasesAlertMsg("ADMIN", "ADMIN123", "Invalid credentials")
    })

    it("❌ TC-OHM-010 User melakukan login dengan kondisi username menggunakan format email", () => {
        loginPages.negativeCasesAlertMsg("admin@gmail.com", "admin123", "Invalid credentials")
    })

    it("❌ TC-OHM-011 User melakukan login XSS attempt", () => {
        loginPages.negativeCasesAlertMsg("<script>alert(1)</script>", "admin123", "Invalid credentials")
    })
});

describe("User melakukan forgot password", () => {
    it("✅ TC-OHM-001 User melakukan forgot password", () => {
        loginPages.resetPasswordWith("admin", "auth/requestPasswordResetCode")
        loginPages.submitResetBtn()
        loginPages.afterSubmitResetBtn("auth/sendPasswordReset")
    })

    it("✅ TC-OHM-002 User melakukan forgot password", () => {
        loginPages.resetPasswordWith("wayne", "auth/requestPasswordResetCode")
        loginPages.submitResetBtn()
        loginPages.afterSubmitResetBtn("auth/sendPasswordReset")
    })

    it("✅ TC-OHM-003 User melakukan input username dengan spasi di awal", () => {
        loginPages.resetPasswordWith(" admin", "auth/requestPasswordResetCode")
        loginPages.submitResetBtn()
        loginPages.afterSubmitResetBtn("auth/sendPasswordReset")
    })

    it("❌ TC-OHM-004 User melakukan forgot password tanpa input data", () => {
        loginPages.resetPasswordWith("", "auth/requestPasswordResetCode")
        loginPages.submitResetBtn()
        loginPages.assertRequiredMsg(1)
    })

    it("❌ TC-OHM-005 User melakukan forgot password menggunakan data tidak valid", () => {
        loginPages.resetPasswordWith(" ", "auth/requestPasswordResetCode")
        loginPages.submitResetBtn()
        loginPages.assertRequiredMsg(1)
    })
})
