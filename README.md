# 🛡️ Smart Contract Development & Security Portfolio

Chào mừng bạn đến với kho lưu trữ lộ trình phát triển Smart Contract của tôi. Repo này không chỉ là nơi lưu trữ code, mà là bằng chứng về quá trình học tập, rèn luyện tư duy lập trình chặt chẽ và kỹ năng kiểm thử bảo mật trên nền tảng Ethereum.

## 👤 Thông tin cá nhân
* **Họ và tên:** Ngô Minh Chung
* **Vị trí mục tiêu:** Smart Contract Developer Intern / Blockchain Security Auditor
* **Công nghệ trọng tâm:** Solidity, Hardhat v3, TypeScript, OpenZeppelin.

---

## 🚀 Danh sách dự án (Learning Roadmap)

### 1. Workshop 01: Counter Foundation (`/workshop_01`)
* **Mô tả:** Dự án thực hành cấu hình Hardhat v3 chuẩn chuyên nghiệp.
* **Kỹ thuật:** TypeScript, Hardhat Ignition, Ethers.js.
* **Security:** Áp dụng Unit Testing chặt chẽ cho từng hàm thay đổi trạng thái (state).

### 2. Crypto Bank Smart Contract (`/Crypto-Bank-Smart-Contract`)
* **Mô tả:** Hệ thống ngân hàng phi tập trung cơ bản (Deposit/Withdraw ETH).
* **Kỹ thuật:** Mapping, Global Variables (`msg.sender`, `msg.value`), Access Control.
* **Security:** Kiểm soát lỗi logic rút tiền và xử lý lỗi bằng `require` string.

### 3. ERC20 Token & Advanced Features (Đang phát triển)
* **Mô tả:** Triển khai Token theo chuẩn OpenZeppelin với các tính năng mở rộng.
* **Kỹ thuật:** Inheritance (Kế thừa), Minting, Burning.

---

## 🛠️ Kỹ năng chuyên môn (Tech Stack)

| Lĩnh vực | Công cụ & Ngôn ngữ |
| :--- | :--- |
| **Blockchain** | Solidity, Ethereum, Sepolia Testnet |
| **Framework** | Hardhat v3, Foundry (Researching) |
| **Languages** | TypeScript, JavaScript, Rust (Beginner) |
| **Tools** | Alchemy RPC, Etherscan API, Dotenv |

---

## 📖 Hướng dẫn cài đặt & Chạy dự án

Để kiểm tra code và chạy thử các bài test, vui lòng làm theo các bước sau:

1. **Clone repo:**
   ```bash
   git clone [https://github.com/pitrian/Smart-Contract-Developer.git](https://github.com/pitrian/Smart-Contract-Developer.git)
   
2. Cài đặt môi trường (Ví dụ cho Workshop 01):
  Bash
  cd workshop_01
  npm install

3. Cấu hình biến môi trường:
Tạo file .env từ mẫu .env.example và điền PRIVATE_KEY của bạn.

4. Biên dịch và Kiểm thử:

Bash
npx hardhat compile
npx hardhat test
-------------------
🛡️ Tư duy bảo mật (Security Mindset)
Trong vai trò là một người hướng tới Security Auditor, tôi cam kết:

Zero-Leak Policy: Luôn quản lý Private Key qua biến môi trường, không bao giờ push lên Git.

Test-Driven Development: Viết test trước hoặc song song khi viết code để đảm bảo logic không kẽ hở.

Gas Optimization: Luôn cân nhắc việc tối ưu hóa code để giảm chi phí giao dịch cho người dùng.
