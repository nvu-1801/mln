'use client';

import Link from 'next/link';
import { AreaChart, ChevronRight, Activity, Users, Globe2, BookOpen, X } from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
    const [showGuide, setShowGuide] = useState(false);

    return (
        <div className="bg-slate-950 text-slate-300">
            <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-4">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-indigo-900/20 rounded-full blur-[140px] pointer-events-none" />

                {/* Main Content */}
                <main className="z-10 text-center max-w-4xl flex flex-col items-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Activity className="w-8 h-8 text-blue-500" />
                        <h2 className="text-sm font-medium tracking-widest text-blue-500 uppercase">Mô phỏng</h2>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-slate-100 to-slate-400 bg-clip-text text-transparent">
                        Vietnam Blueprint
                    </h1>

                    <p className="text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Đảm nhận vai trò Cơ quan Quản lý Kinh tế Vĩ mô. Cân bằng tăng trưởng kinh tế, công bằng xã hội và đối phó với khủng hoảng trong mô phỏng theo lượt này.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Link
                            href="/play"
                            className="group flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-base transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-blue-600/20 w-full sm:w-auto"
                        >
                            Bắt đầu Thời kỳ Mới
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button
                            onClick={() => setShowGuide(true)}
                            className="group flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold text-base transition-colors duration-300 w-full sm:w-auto"
                        >
                            <BookOpen className="w-5 h-5" />
                            Hướng dẫn Chơi
                        </button>
                    </div>

                    {/* Feature Highlights */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-900/50 border border-slate-800/70">
                            <div className="p-3 bg-blue-900/40 rounded-lg text-blue-400">
                                <AreaChart className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold text-slate-100">Quản lý Kinh tế</h3>
                                <p className="text-sm text-slate-400 mt-1">Kiểm soát ngân sách & tăng trưởng GDP.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-900/50 border border-slate-800/70">
                            <div className="p-3 bg-pink-900/40 rounded-lg text-pink-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold text-slate-100">Công bằng Xã hội</h3>
                                <p className="text-sm text-slate-400 mt-1">Cân bằng hệ số Gini và an sinh.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-900/50 border border-slate-800/70">
                            <div className="p-3 bg-purple-900/40 rounded-lg text-purple-400">
                                <Globe2 className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold text-slate-100">Sự kiện Toàn cầu</h3>
                                <p className="text-sm text-slate-400 mt-1">Phản ứng với các cú sốc kinh tế vĩ mô.</p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Guide Modal */}
                {showGuide && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                            onClick={() => setShowGuide(false)}
                        />

                        <div className="relative bg-slate-900/95 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50">
                            <div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-slate-900/95 z-10">
                                <div className="flex items-center gap-3">
                                    <BookOpen className="w-6 h-6 text-blue-400" />
                                    <h3 className="text-lg font-semibold text-slate-100">Hướng dẫn Chơi</h3>
                                </div>
                                <button
                                    onClick={() => setShowGuide(false)}
                                    className="p-2 text-slate-500 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-8 text-slate-300">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                🎯 Mục tiêu
                                            </h4>
                                            <p className="text-sm leading-relaxed">Quản lý nền kinh tế Việt Nam, cân bằng giữa tăng trưởng kinh tế và công bằng xã hội, phát triển xã hội chủ nghĩa.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                📊 Các chỉ số chính
                                            </h4>
                                            <ul className="space-y-2 text-sm">
                                                <li><strong>Ngân sách:</strong> Tài chính nhà nước (tỷ VNĐ)</li>
                                                <li><strong>GDP:</strong> Tổng sản phẩm quốc nội</li>
                                                <li><strong>An sinh xã hội:</strong> Mức độ hạnh phúc (0-100)</li>
                                                <li><strong>Gini:</strong> Bất bình đẳng (càng thấp càng tốt)</li>
                                                <li><strong>Sở hữu tập thể:</strong> Sở hữu xã hội chủ nghĩa (0-100)</li>
                                                <li><strong>Đấu tranh giai cấp:</strong> Xung đột giai cấp (0-100)</li>
                                                <li><strong>Phát triển XHCN:</strong> Mức độ xã hội chủ nghĩa (0-100)</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                                🎮 Cách chơi
                                            </h4>
                                            <ol className="space-y-2 text-sm list-decimal list-inside">
                                                <li>Theo dõi các chỉ số kinh tế và xã hội.</li>
                                                <li>Đầu tư vào các lĩnh vực: Nhà nước, Hợp tác xã, Tư nhân.</li>
                                                <li>Áp dụng chính sách kinh tế chính trị Mác-Lênin.</li>
                                                <li>Đối phó với sự kiện ngẫu nhiên.</li>
                                                <li>Tránh các điều kiện game over.</li>
                                            </ol>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                ⚠️ Điều kiện thua
                                            </h4>
                                            <ul className="space-y-2 text-sm">
                                                <li>Bất bình đẳng quá cao (Gini &gt; 70)</li>
                                                <li>An sinh xã hội quá thấp (&lt; 20)</li>
                                                <li>Vỡ nợ quốc gia (Ngân sách &lt; -5000 tỷ)</li>
                                                <li>Sở hữu tập thể suy yếu (&lt; 10)</li>
                                                <li>Phát triển XHCN thụt lùi (&lt; 20)</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                                📚 Học được
                                            </h4>
                                            <ul className="space-y-2 text-sm">
                                                <li>Nguyên lý kinh tế chính trị Mác-Lênin.</li>
                                                <li>Sở hữu tập thể vs sở hữu tư nhân.</li>
                                                <li>Đấu tranh giai cấp và chuyển đổi xã hội.</li>
                                                <li>Kinh tế thị trường định hướng XHCN.</li>
                                                <li>Cân bằng tăng trưởng và công bằng.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
