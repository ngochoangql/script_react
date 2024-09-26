const fs = require('fs');
const path = require('path');

// Đường dẫn tới file package.json của dự án
const packageJsonPath = path.join(process.cwd(), 'package.json');

// Đọc nội dung của package.json
fs.readFile(packageJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error("Không thể đọc file package.json:", err);
    return;
  }

  // Chuyển dữ liệu thành đối tượng JSON
  let packageJson = JSON.parse(data);

  // Kiểm tra nếu chưa có lệnh create-folders trong scripts
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
  if (!packageJson.scripts['comp']) {
    // Thêm lệnh create-folders vào scripts
    packageJson.scripts['comp'] = 'node ./node_modules/repository/create.js';
  }
  if (!packageJson.scripts['fol']) {
    // Thêm lệnh create-folders vào scripts
    packageJson.scripts['fol'] = 'node ./node_modules/repository/index.js';
  }
  // Ghi lại package.json
  fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8', (err) => {
    if (err) {
      console.error("Không thể ghi vào package.json:", err);
    } else {
      console.log("Lệnh create-folders đã được thêm vào package.json");
    }
  });
});
