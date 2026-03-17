This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 6. Minh chứng Ứng dụng AI trong Phát triển (AI-Assisted Development)
Dự án "Vietnam Blueprint" ứng dụng triệt để các công cụ Trí tuệ Nhân tạo (AI) xuyên suốt từ khâu phân tích yêu cầu, thiết kế Game Design Document (GDD) cho đến lúc lập trình, nhằm đảm bảo tiến độ và độ chính xác của các thuật ngữ kinh tế.
### 6.1. Nghiên cứu & Thiết kế Cơ chế Game (Sử dụng AI Notebook)
Thay vì đọc chay và tự bóc tách các tài liệu chính trị/kinh tế vĩ mô, dự án sử dụng AI Notebook (như Google NotebookLM) để xử lý lượng lớn văn bản và chuyển đổi thành hệ thống luật chơi:
* **Tổng hợp và Trích xuất**: Upload các Báo cáo, Nghị quyết về Kinh tế thị trường định hướng XHCN vào Notebook. AI sẽ đóng vai trò là "Cố vấn nội dung", giúp tóm tắt các ý chính thành các gạch đầu dòng ngắn gọn.
* **Thiết kế Thẻ Chính sách (Policy Cards)**: Dùng prompt yêu cầu Notebook phân tích tài liệu và tự động sinh ra ý tưởng cho các thẻ bài (Ví dụ: Thẻ Hỗ trợ Nông nghiệp Công nghệ cao, Thẻ Chống Độc quyền), bao gồm cả hệ quả nhân - quả (tăng/giảm Ngân sách, GDP, An sinh) sao cho bám sát lý luận thực tế.
* **Chuyển đổi Dữ liệu**: Yêu cầu AI xuất trực tiếp các thẻ chính sách đã bóc tách được thành mảng dữ liệu định dạng JSON để sẵn sàng đưa vào source code.
### 6.2. Hỗ trợ Lập trình & Kiến trúc Hệ thống (AI Coding & Agents)
Các trợ lý AI (như Gemini) và các AI Agents được tích hợp trực tiếp vào quy trình code để giải quyết các bài toán kỹ thuật đặc thù:
* **Xây dựng Global State (Zustand)**: AI hỗ trợ viết các bộ khung (boilerplate) cho Zustand store, đặc biệt là việc lên ý tưởng cho hàm useGameLoop – trái tim của game, nơi xử lý các công thức toán học tính toán GDP và mức độ lạm phát sau mỗi lượt chơi.
* **Kết nối Context thông minh (MCP)**: Ứng dụng giao thức Model Context Protocol (MCP) để AI có thể đọc hiểu trực tiếp cấu trúc thư mục Next.js (App Router) đang làm việc. Điều này giúp AI gợi ý code chính xác hơn khi cần kết nối các UI components với logic game hoặc khi thiết lập schema cho database trên Supabase.
* **Tạo Database Schema**: Yêu cầu AI viết các đoạn script SQL cho Supabase để lưu trữ tiến trình chơi (Save/Load game) và tạo Bảng xếp hạng (Leaderboard) điểm số của người chơi.
### 6.3. Tối ưu Giao diện UI/UX (Tailwind CSS & Animation)
* **Sinh mã UI Component**: Đưa bản phác thảo giao diện (wireframe) dạng text cho AI để tạo ra các component React sử dụng Tailwind CSS (ví dụ: các Card hiển thị 3 thành phần kinh tế, các thanh Slider phân bổ ngân sách).
* **Hiệu ứng trực quan**: Nhờ AI tư vấn và viết code tích hợp Framer Motion để tạo các hiệu ứng mượt mà, thân thiện với người dùng (đặc biệt là học sinh cấp 2), chẳng hạn như hiệu ứng lật thẻ bài, thông báo nảy lên (popup) khi có sự kiện khủng hoảng kinh tế xảy ra.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
