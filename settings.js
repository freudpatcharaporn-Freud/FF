const bcrypt = require('bcryptjs');

// ดึงค่ารหัสผ่านจาก Render Environment (ถ้าไม่มีจะใช้ 'admin1234' เป็นค่าเริ่มต้น)
const adminPassword = process.env.ADMIN_PASSWORD || "admin1234";

// สร้าง Hash จากรหัสผ่านที่ตั้งไว้
const passwordHash = bcrypt.hashSync(adminPassword, 8);

module.exports = {
    uiPort: process.env.PORT || 1880,
    credentialSecret: process.env.NODE_RED_CREDENTIAL_SECRET || "fallback-secret-do-not-use-in-prod",
    adminAuth: {
        type: "credentials",
        users: [{
            username: process.env.ADMIN_USER || "admin",
            password: passwordHash, // ใช้ค่าที่ Hash แล้วแบบ Dynamic
            permissions: "*"
        }]
    },

    // ส่วนอื่นๆ คงเดิม
    httpNodeAuth: null,
    userDir: './',
    flowFile: 'flows.json',
    functionGlobalContext: {
        timezone: "Asia/Bangkok"
    },
    ui: { path: "ui" }
};
