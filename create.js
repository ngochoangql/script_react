const fs = require('fs');
const path = require('path');

// Cấu trúc thư mục cần tạo
const baseFolders = {
    a: 'src/components/atoms',
    m: 'src/components/molecules',
    o: 'src/components/organisms',
    t: 'src/components/templates',
    p: 'src/components/pages'
};
const baseTitle = {
    a: 'Atoms/',
    m: 'Molecules/',
    o: 'Organisms/',
    t: 'Templates/',
    p: 'Pages/'
};

// Tạo template cho Storybook
const storyTemplate = (automic, folderName, Component) => `
import { Meta, StoryObj } from '@storybook/react';
import ${Component} from "./${folderName}";

const meta = {
   component: ${Component},
   title: "${baseTitle[automic]}${Component}"
} satisfies Meta<typeof ${Component}>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
   args: {
      // Thêm các args tại đây
   },
};
`;

// Tạo template cho component
const componentTemplate = (Component) => `
import React from "react";
import "./style.scss";

export interface ${Component}Props {
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  color?: string;
}

const ${Component} = ({ margin, padding, backgroundColor, color }: ${Component}Props) => {
  return (
    <div style={{ margin, padding, backgroundColor, color }} className={'${automic}-${folderName}__container'}>
    
    </div>
  );
};

export default ${Component};
`;

// Hàm tạo thư mục và file
const createFolder = (automic, basePath, folderName, ComponentName) => {
    const dirPath = path.join(__dirname, basePath, folderName);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Tạo thư mục: ${dirPath}`);

        // Tạo file tsx
        fs.writeFileSync(path.join(dirPath, `${folderName}.tsx`), componentTemplate(ComponentName), 'utf8');
        console.log(`Tạo file: ${folderName}.tsx`);

        // Tạo file scss
        fs.writeFileSync(path.join(dirPath, `style.scss`), `// Styles for ${folderName}\n`, 'utf8');
        console.log(`Tạo file: style.scss`);

        // Tạo file stories
        fs.writeFileSync(path.join(dirPath, `${folderName}.stories.ts`), storyTemplate(automic, folderName, ComponentName), 'utf8');
        console.log(`Tạo file: ${folderName}.stories.ts`);
    } else {
        console.log(`Thư mục đã tồn tại: ${dirPath}`);
    }
};

// Lấy tham số từ dòng lệnh
const args = process.argv.slice(2);

// Kiểm tra các điều kiện của các argument
if (args.length !== 3) {
    console.error("Lỗi: Cần nhập 3 tham số theo cú pháp: <automic> <folderName> <ComponentName>");
    process.exit(1);
}

const [automic, folderName, ComponentName] = args;

// Kiểm tra xem atomic có hợp lệ hay không
if (!['a', 'm', 'o', 't', 'p'].includes(automic)) {
    console.log("Cú pháp đúng: ");
    console.log("<automic> <folderName> <ComponentName>");
    console.log("Trong đó:");
    console.log("  automic: Ký tự xác định thư mục cần tạo, bao gồm:");
    console.log("    - a: atoms");
    console.log("    - m: molecules");
    console.log("    - o: organisms");
    console.log("    - t: templates");
    console.log("    - p: pages");
    console.log("  folderName: Tên thư mục cần tạo");
    console.log("  ComponentName: Tên component sẽ sử dụng trong các file");
    process.exit(1);
}

// Kiểm tra xem folderName và ComponentName có hợp lệ hay không
if (!folderName || !ComponentName) {
    console.error("Lỗi: Tham số 'folderName' và 'ComponentName' không được để trống.");
    process.exit(1);
}

// Tạo thư mục và file
createFolder(automic, baseFolders[automic], folderName, ComponentName);
