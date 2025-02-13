# ppPlaces - Travel & Review Platform

ppPlaces là một nền tảng cho phép người dùng khám phá, đánh giá và chia sẻ các địa điểm du lịch. Dự án bao gồm một backend API được xây dựng bằng Node.js và Express.js, kết hợp với frontend React để tạo trải nghiệm người dùng mượt mà.

## Tính năng chính
- **Đăng ký/Đăng nhập**: Xác thực người dùng bằng JWT.
- **Quản lý địa điểm**: Thêm, sửa, xóa địa điểm (chỉ chủ sở hữu).
- **Đánh giá**: Thêm và xóa đánh giá.
- **Dashboard**: Xem danh sách địa điểm của người dùng.

## Công nghệ sử dụng

### Backend
- **Node.js + Express.js**: Xây dựng REST API.
- **MongoDB + Mongoose**: Quản lý cơ sở dữ liệu.
- **JWT**: Xác thực người dùng.
- **Bcryptjs**: Mã hóa mật khẩu.

### Frontend
- **React**: Xây dựng giao diện người dùng.
- **React Router**: Định tuyến trang.
- **Axios**: Gọi API từ frontend.
- **Context API**: Quản lý trạng thái người dùng.

## Cài đặt

### Yêu cầu
- **Node.js** (v18 trở lên).
- **MongoDB** (local hoặc Atlas).

### Hướng dẫn
#### Clone repository:
```bash
git clone https://github.com/your-username/ppPlaces.git
cd ppPlaces
```

#### Cài đặt dependencies:
**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

#### Cấu hình biến môi trường:
Tạo file `.env` trong thư mục `backend` với nội dung:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ppPlaces
JWT_SECRET=your_jwt_secret
```

#### Chạy ứng dụng:
**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd ../frontend
npm run dev
```

### Truy cập ứng dụng:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## Cấu trúc thư mục
```
ppPlaces/
├── backend/               # Backend code
│   ├── controllers/       # Logic xử lý request
│   ├── middleware/        # Middleware (auth, ownership)
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── server.js          # Server entry point
├── frontend/              # Frontend code
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Context API
│   │   ├── pages/         # Page components
│   │   └── main.jsx       # React entry point
│   └── vite.config.js     # Vite configuration
└── README.md              # Tài liệu dự án
```

## Thông báo về HTML/CSS
Hiện tại, giao diện của dự án đang sử dụng các style cơ bản và chưa được tối ưu hóa. Lý do là nhóm đang tập trung phát triển **backend và REST API với React** trước. Các file HTML và CSS tùy chỉnh sẽ được triển khai sau để cải thiện trải nghiệm người dùng(Mong vậy). 
Các tính năng sau sẽ được thêm:
- **Responsive Design**: Hỗ trợ mọi thiết bị.
- **Custom Themes**: Dark/Light mode.

## Kế hoạch phát triển
- Triển khai upload ảnh với Multer và Cloudinary.
- Thêm tính năng realtime với Socket.io.
- Mở rộng authentication bằng Passport.js + OAuth


