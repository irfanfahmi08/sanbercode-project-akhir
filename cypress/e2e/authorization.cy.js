import loginPages from "../support/pages/loginPages";

describe("User melakukan login", () => {
    it.skip("✅ User bisa melakukan login dengan menggunakan data valid", () => {
        loginPages.loginWith("Admin", "admin123", "dashboard/index");
    });

    it.skip("❌ User melakukan login tanpa input data", () => {
        loginPages.negativeCasesRequireMsg("", "", 2)
    });

    it.skip("❌ User melakukan login tanpa input Password", () => {
        loginPages.negativeCasesRequireMsg("Admin", "", 1)
    });

    it.skip("❌ User melakukan login tanpa input Username", () => {
        loginPages.negativeCasesRequireMsg("", "admin123", 1)
    });
    
    it.skip("❌ User melakukan login dengan kondisi username valid , password salah", () => {
        loginPages.negativeCasesAlertMsg("admin", "password", "Invalid credentials")
    })

    it.skip("❌ User melakukan login dengan kondisi username tidak valid", () => {
        loginPages.negativeCasesAlertMsg("irfan", "password", "Invalid credentials")
    })

    it.skip("❌ User melakukan login dengan kondisi input berisi spasi", () => {
        loginPages.negativeCasesRequireMsg(" ", " ", 2)
    })

    it.skip("❌ User melakukan login dengan kondisi input spasi di awal username", () => {
        loginPages.negativeCasesAlertMsg(" admin", "admin123", "Invalid credentials")
    })

    it.skip("❌ User melakukan login dengan kondisi input spasi di awal password", () => {
        loginPages.negativeCasesAlertMsg("admin", " admin123", "Invalid credentials")
    })

    it.skip("❌ User melakukan login dengan kondisi username dan password huruf kapital", () => {
        loginPages.negativeCasesAlertMsg("ADMIN", "ADMIN123", "Invalid credentials")
    })

    it.skip("❌ User melakukan login dengan kondisi username menggunakan format email", () => {
        loginPages.negativeCasesAlertMsg("admin@gmail.com", "admin123", "Invalid credentials")
    })

    it.skip("❌ User melakukan login XSS attempt", () => {
        loginPages.negativeCasesAlertMsg("<script>alert(1)</script>", "admin123", "Invalid credentials")
    })
});

describe("User melakukan forgot password", () => {
    it.skip("✅ User melakukan forgot password", () => {
        loginPages.resetPasswordWith("admin", "auth/requestPasswordResetCode")
        loginPages.submitResetBtn()
        loginPages.afterSubmitResetBtn("auth/sendPasswordReset")
    })

    it.skip("✅ User melakukan forgot password", () => {
        loginPages.resetPasswordWith("wayne", "auth/requestPasswordResetCode")
        loginPages.submitResetBtn()
        loginPages.afterSubmitResetBtn("auth/sendPasswordReset")
    })

    it.skip("✅ User melakukan input username dengan spasi di awal", () => {
        loginPages.resetPasswordWith(" admin", "auth/requestPasswordResetCode")
        loginPages.submitResetBtn()
        loginPages.afterSubmitResetBtn("auth/sendPasswordReset")
    })
    
    it.skip("❌ User melakukan forgot password tanpa input data", () => {
        loginPages.resetPasswordWith("", "auth/requestPasswordResetCode")
        loginPages.submitResetBtn()
        loginPages.assertRequiredMsg(1)
    })

    it.skip("❌ User melakukan forgot password menggunakan data tidak valid", () => {
        loginPages.resetPasswordWith(" ", "auth/requestPasswordResetCode")
        loginPages.submitResetBtn()
        loginPages.assertRequiredMsg(1)
    })

})
