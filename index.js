const fs = require('fs');
const path = require('path');

// Cấu trúc thư mục cần tạo
const folderStructure = [
    'src/components/atoms',
    'src/components/molecules',
    'src/components/organisms',
    'src/components/templates',
    'src/components/pages'
];

// Hàm tạo thư mục
const createFolders = (folders) => {
    folders.forEach(folder => {
        const dirPath = path.join(__dirname, folder);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Tạo thư mục: ${dirPath}`);
        } else {
            console.log(`Thư mục đã tồn tại: ${dirPath}`);
        }
    });
};

// Gọi hàm để tạo thư mục
createFolders(folderStructure);
