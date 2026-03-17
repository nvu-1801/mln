import React from 'react';
import { BrainCircuit, FileText, Video, Bot, Code, Megaphone } from 'lucide-react';

const AIShowcasePage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Minh chứng Ứng dụng AI
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Dự án ứng dụng triệt để các công cụ Trí tuệ Nhân tạo (AI) như một thế hệ <strong>Tư liệu sản xuất mới</strong>, xuyên suốt từ khâu R&D, lập trình cho đến vận hành tương tác.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1 */}
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl shadow-lg hover:border-purple-500 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-900/40 rounded-lg text-purple-400">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100">6.1. Tri thức hóa Dữ liệu Vĩ mô</h2>
            </div>
            <p className="text-slate-400 mb-6">Sử dụng AI Notebook làm "nhà máy tinh chế" dữ liệu trung tâm, thay thế sức lao động cơ bắp.</p>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Tổng hợp & Lập báo cáo</h4>
                  <p className="text-sm text-slate-400">"Nhai" dữ liệu thô từ các văn kiện, nghị quyết và xuất ra Báo cáo phân tích chuẩn xác làm nền tảng cho luật chơi.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Video className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Sản xuất Video Briefing</h4>
                  <p className="text-sm text-slate-400">Tự động sinh kịch bản và tài nguyên media để dựng video giới thiệu cơ chế game, tối ưu hóa quá trình onboarding.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl shadow-lg hover:border-pink-500 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-pink-900/40 rounded-lg text-pink-400">
                <Megaphone className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100">6.2. Kỹ nghệ Nội dung & Truyền thông</h2>
            </div>
            <p className="text-slate-400 mb-6">Dùng Gemini như "cỗ máy biến đổi", dịch lý thuyết vĩ mô thành các nội dung thực chiến.</p>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <Megaphone className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Phân tích & Tự động hóa Content</h4>
                  <p className="text-sm text-slate-400">Bóc tách khái niệm học thuật, biến chúng thành các bài đăng mạng xã hội sắc bén để thu hút người dùng (User Acquisition).</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl shadow-lg hover:border-sky-500 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-sky-900/40 rounded-lg text-sky-400">
                <Code className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100">6.3. Tự động hóa Lực lượng Sản xuất</h2>
            </div>
            <p className="text-slate-400 mb-6">Đưa AI vào workflow như một Co-pilot lập trình cấp cao, giảm 60% thời gian lao động xã hội cần thiết.</p>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <Code className="w-5 h-5 text-sky-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Lập trình Core Game & Giao diện</h4>
                  <p className="text-sm text-slate-400">AI trực tiếp hỗ trợ viết thuật toán phức tạp (tính GDP, lạm phát), thiết lập Global State (Zustand) và gen code UI/UX.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl shadow-lg hover:border-emerald-500 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-900/40 rounded-lg text-emerald-400">
                <Bot className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100">6.4. Tối ưu Vận hành & CSKH</h2>
            </div>
            <p className="text-slate-400 mb-6">Triển khai AI Agent để đưa Chi phí biên (Marginal Cost) trong vận hành về 0.</p>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <Bot className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Thiết lập Chatbot tự động hóa</h4>
                  <p className="text-sm text-slate-400">Xây dựng AI Agent (Coze) được train bằng dữ liệu dự án để giải đáp, hỗ trợ người chơi 24/7, giúp dễ dàng Scale-up.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <footer className="text-center mt-16">
          <h3 className="text-xl font-bold text-slate-100 mb-4">Nguồn</h3>
          <p className="text-slate-400">Nội dung được tạo từ NotebookLM: <a href="https://notebooklm.google.com/notebook/bb7b84b5-b541-42d8-8eda-1d4640d9e4ef" className="text-purple-400 hover:text-purple-300 underline">Xem notebook gốc</a></p>
        </footer>
      </div>
    </div>
  );
};

export default AIShowcasePage;
