# 📌 Sanbercode Project Akhir – Cypress Automation Testing - OrangeHRM

## ✨ Deskripsi

Repository ini adalah implementasi Project Akhir Sanbercode yang kebutuhannya adalah end-to-end automation testing untuk aplikasi web OrangeHRM.
Testing ini dibuat menggunakan Cypress 15.7.1, dengan struktur yang modular mengikuti pendekatan Page Object Model (POM), intercept API, dan best practice untuk meminimalkan flaky test.

## 🚀 Fitur Utama

✔ Automation testing untuk berbagai skenario

✔ Struktur POM yang scalable

✔ Intercept API (spy & stub)

## 📁 Struktur Project

```Bash
📦cypress
 ┣ 📂e2e
 ┃ ┣ 📜authorization.cy.js
 ┃ ┗ 📜dashboard.cy.js
 ┣ 📂fixtures
 ┃ ┗ 📜example.json
 ┗ 📂support
 ┃ ┣ 📂intercept
 ┃ ┃ ┣ 📜dashboard.js
 ┃ ┃ ┗ 📜stubSubUnit.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜dashboardPages.js
 ┃ ┃ ┗ 📜loginPages.js
 ┃ ┣ 📜commands.js
 ┃ ┗ 📜e2e.js
```

## ⚙️ Instalasi & Running Test

#### 1️⃣ Clone repository

```Bash
git clone https://github.com/irfanfahmi08/sanbercode-project-akhir.git
```


#### 2️⃣ Masuk ke direktori project

```Bash
cd sanbercode-project-akhir
```

#### 3️⃣ Install dependencies

```Bash
npm install
```

### 📌 Running Test

#### Running with NPM
```bash
npm run cy:open
```

## 🛠 Testing Strategy

### 📍 Test terbagi menjadi:

#### 1️⃣ Smoke Tests

Pastikan UI utama load & critical elements tampil.

#### 2️⃣ Functional Tests

Uji logika aplikasi, klik tombol, validasi form.

#### 3️⃣ API Intercept Tests

Spy dan stub response API untuk memastikan frontend behavior berjalan sesuai kontrak.


## 📚 Catatan

Repository ini dibuat untuk tugas akhir bootcamp Sanbercode sebagai bukti penerapan Cypress dalam QA Automation. Seluruh struktur, naming convention, dan best practice mengikuti standar industri agar siap untuk scale ke project lebih besar.
