"use client";
import { useGameStore } from '@/store/useGameStore';
import { useGameLoop } from '@/hooks/useGameLoop';
import {
    Building2,
    Landmark,
    Store,
    TrendingUp,
    TrendingDown,
    Users,
    AlertTriangle,
    Coins,
    BookOpen,
    Globe2,
    Shield,
    Target,
    Star
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const state = useGameStore();
    const { handleNextTurn, currentEvent, clearEvent } = useGameLoop();

    if (state.isGameOver) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-900/20 pointer-events-none" />
                <AlertTriangle className="w-24 h-24 text-red-500 mb-8 animate-pulse" />
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-orange-500 mb-6 tracking-tight">
                    THỜI KỲ SỤP ĐỔ
                </h1>
                <p className="text-xl text-slate-300 max-w-lg text-center mb-12 border-l-4 border-red-500 pl-4 py-2 bg-slate-900/50 backdrop-blur rounded-r-lg">
                    {state.gameOverReason}
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={state.resetGame}
                        className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(220,38,38,0.5)]"
                    >
                        Khởi động Lại Lịch sử
                    </button>
                    <Link
                        href="/"
                        className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full transition-all"
                    >
                        Menu Chính
                    </Link>
                </div>
            </div>
        );
    }

    // Helper macro formatters
    const formatNumber = (num: number) => Math.round(num).toLocaleString('vi-VN');

    // Status Colors
    const giniColor = state.gini < 40 ? 'text-green-400' : state.gini < 60 ? 'text-yellow-400' : 'text-red-400';
    const welfareColor = state.socialWelfare > 70 ? 'text-green-400' : state.socialWelfare > 40 ? 'text-yellow-400' : 'text-red-400';
    const budgetColor = state.budget > 1000 ? 'text-green-400' : state.budget > 0 ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">

            {/* Event Modal / Overlay */}
            {currentEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-lg w-full transform animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl">
                                <Globe2 className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold">Sự kiện Toàn cầu Xảy ra</h2>
                        </div>
                        <h3 className="text-xl font-semibold text-blue-300 mb-2">{currentEvent.title}</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            {currentEvent.description}
                        </p>
                        <div className="bg-slate-950/50 p-4 rounded-xl mb-8 space-y-2 text-sm">
                            <p className="font-semibold text-slate-300 mb-1">Tác động Dự kiến:</p>
                            {currentEvent.effect.gdpMultiplier && <p className={currentEvent.effect.gdpMultiplier >= 1 ? "text-green-400" : "text-red-400"}>• GDP: x{currentEvent.effect.gdpMultiplier}</p>}
                            {currentEvent.effect.budgetDelta && <p className={currentEvent.effect.budgetDelta >= 0 ? "text-green-400" : "text-red-400"}>• Ngân sách: {currentEvent.effect.budgetDelta > 0 ? '+' : ''}{currentEvent.effect.budgetDelta}B</p>}
                            {currentEvent.effect.welfareDelta && <p className={currentEvent.effect.welfareDelta >= 0 ? "text-green-400" : "text-red-400"}>• Chỉ số An sinh: {currentEvent.effect.welfareDelta > 0 ? '+' : ''}{currentEvent.effect.welfareDelta}</p>}
                        </div>
                        <button
                            onClick={clearEvent}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-colors"
                        >
                            Xác nhận & Tiếp tục
                        </button>
                    </div>
                </div>
            )}

            {/* TOP NAVIGATION / STATUS BAR */}
            <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row gap-6 justify-between items-center bg-slate-900/50 backdrop-blur p-6 rounded-3xl border border-slate-800">
                <div className="flex items-center gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Năm Hiện tại</p>
                        <p className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">{state.currentYear}</p>
                    </div>
                    <div className="w-px h-12 bg-slate-800 hidden md:block"></div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Lượt</p>
                        <p className="text-2xl font-bold text-slate-300">{state.turn}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Hướng dẫn chơi */}
                    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 max-w-md">
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-4 h-4 text-blue-400" />
                            <h4 className="font-semibold text-slate-200 text-sm">Hướng dẫn</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Quản lý kinh tế Việt Nam: cân bằng GDP, an sinh xã hội và bất bình đẳng. 
                            Đầu tư vào các lĩnh vực để phát triển bền vững. Tránh khủng hoảng kinh tế!
                        </p>
                    </div>

                    <button
                        onClick={handleNextTurn}
                        className="group relative px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_-10px_rgba(59,130,246,0.6)]"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        TIẾN HÀNH THỜI KỲ
                    </button>
                </div>
            </header>

            {/* MACRO INDICATORS */}
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl transition-all hover:border-slate-700">
                    <div className="flex items-center gap-3 mb-4 text-slate-400">
                        <Landmark className="w-5 h-5" />
                        <h3 className="font-semibold">Ngân sách Nhà nước</h3>
                    </div>
                    <p className={`text-3xl font-bold ${budgetColor}`}>{formatNumber(state.budget)}<span className="text-lg text-slate-500 ml-1">Tỷ</span></p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl transition-all hover:border-slate-700">
                    <div className="flex items-center gap-3 mb-4 text-slate-400">
                        <TrendingUp className="w-5 h-5" />
                        <h3 className="font-semibold">Quy mô GDP</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-400">{formatNumber(state.gdp)}<span className="text-lg text-slate-500 ml-1">Tỷ</span></p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl transition-all hover:border-slate-700">
                    <div className="flex items-center gap-3 mb-4 text-slate-400">
                        <Users className="w-5 h-5" />
                        <h3 className="font-semibold">An sinh Xã hội</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <p className={`text-3xl font-bold ${welfareColor}`}>{formatNumber(state.socialWelfare)}<span className="text-lg text-slate-500 ml-1">/100</span></p>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
                        <div className={`h-full ${welfareColor.replace('text-', 'bg-')}`} style={{ width: `${Math.min(100, Math.max(0, state.socialWelfare))}%` }}></div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl transition-all hover:border-slate-700">
                    <div className="flex items-center gap-3 mb-4 text-slate-400">
                        <TrendingDown className="w-5 h-5" />
                        <h3 className="font-semibold text-sm">Bất bình đẳng (Gini)</h3>
                    </div>
                    <p className={`text-3xl font-bold ${giniColor}`}>{formatNumber(state.gini)}<span className="text-lg text-slate-500 ml-1">/100</span></p>
                    <div className="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden flex">
                        {/* Reverse progress bar for Gini since high is bad */}
                        <div className={`h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500`} style={{ width: `${state.gini}%` }}></div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl transition-all hover:border-slate-700">
                    <div className="flex items-center gap-3 mb-4 text-slate-400">
                        <Shield className="w-5 h-5" />
                        <h3 className="font-semibold text-sm">Sở hữu Tập thể</h3>
                    </div>
                    <p className="text-3xl font-bold text-purple-400">{formatNumber(state.collectiveOwnership)}<span className="text-lg text-slate-500 ml-1">/100</span></p>
                    <div className="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
                        <div className={`h-full bg-purple-500`} style={{ width: `${state.collectiveOwnership}%` }}></div>
                    </div>
                </div>
            </div>

            {/* MARXIST-LENINIST INDICATORS */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl transition-all hover:border-slate-700">
                    <div className="flex items-center gap-3 mb-4 text-slate-400">
                        <Target className="w-5 h-5" />
                        <h3 className="font-semibold text-sm">Đấu tranh Giai cấp</h3>
                    </div>
                    <p className="text-3xl font-bold text-red-400">{formatNumber(state.classStruggle)}<span className="text-lg text-slate-500 ml-1">/100</span></p>
                    <div className="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
                        <div className={`h-full bg-red-500`} style={{ width: `${state.classStruggle}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Động lực phát triển xã hội</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl transition-all hover:border-slate-700">
                    <div className="flex items-center gap-3 mb-4 text-slate-400">
                        <Star className="w-5 h-5" />
                        <h3 className="font-semibold text-sm">Phát triển XHCN</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-400">{formatNumber(state.socialistDevelopment)}<span className="text-lg text-slate-500 ml-1">/100</span></p>
                    <div className="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
                        <div className={`h-full bg-green-500`} style={{ width: `${state.socialistDevelopment}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Định hướng xã hội chủ nghĩa</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl transition-all hover:border-slate-700">
                    <div className="flex items-center gap-3 mb-4 text-slate-400">
                        <Coins className="w-5 h-5" />
                        <h3 className="font-semibold text-sm">Điểm Chính trị</h3>
                    </div>
                    <p className="text-3xl font-bold text-yellow-400">{formatNumber(state.politicalPower)}</p>
                    <p className="text-xs text-slate-500 mt-2">Dùng để ban hành chính sách</p>
                </div>
            </div>

            {/* POLICY / SECTOR ACTIONS */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Đầu tư Lĩnh vực</h2>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full border border-slate-800 text-sm">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium">Điểm Chính trị:</span>
                        <span className="font-bold text-yellow-400 text-lg">{formatNumber(state.politicalPower)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* State Sector */}
                    <button
                        onClick={() => state.investStateSector(200)}
                        disabled={state.budget < 200}
                        className="group flex flex-col items-start p-8 bg-slate-900 rounded-3xl border border-slate-800 hover:border-blue-500 hover:bg-slate-900/80 transition-all disabled:opacity-50 disabled:hover:border-slate-800 disabled:cursor-not-allowed text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Landmark className="w-32 h-32" />
                        </div>
                        <div className="p-4 bg-blue-500/10 rounded-2xl mb-6">
                            <Landmark className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Cơ sở hạ tầng Nhà nước</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Đầu tư mạnh vào công trình công cộng, bệnh viện và trường học. Rất ổn định nhưng tốn kém.
                        </p>
                        <div className="mt-auto flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold">-200T Ngân sách</span>
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-semibold">+An sinh & GDP</span>
                        </div>
                    </button>

                    {/* Collective Sector */}
                    <button
                        onClick={() => state.supportCollectiveSector(100)}
                        disabled={state.budget < 100}
                        className="group flex flex-col items-start p-8 bg-slate-900 rounded-3xl border border-slate-800 hover:border-emerald-500 hover:bg-slate-900/80 transition-all disabled:opacity-50 disabled:hover:border-slate-800 disabled:cursor-not-allowed text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Users className="w-32 h-32" />
                        </div>
                        <div className="p-4 bg-emerald-500/10 rounded-2xl mb-6">
                            <Users className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Hỗ trợ Hợp tác xã</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Hỗ trợ nông nghiệp tập thể và công đoàn thủ công địa phương. Xuất sắc trong việc thu hẹp khoảng cách giàu nghèo.
                        </p>
                        <div className="mt-auto flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold">-100T Ngân sách</span>
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-semibold">-Gini</span>
                        </div>
                    </button>

                    {/* Private Sector */}
                    <button
                        onClick={() => state.deregulatePrivateSector()}
                        disabled={state.politicalPower < 5}
                        className="group flex flex-col items-start p-8 bg-slate-900 rounded-3xl border border-slate-800 hover:border-purple-500 hover:bg-slate-900/80 transition-all disabled:opacity-50 disabled:hover:border-slate-800 disabled:cursor-not-allowed text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Store className="w-32 h-32" />
                        </div>
                        <div className="p-4 bg-purple-500/10 rounded-2xl mb-6">
                            <Store className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Bãi bỏ Quy định Tư nhân</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Loại bỏ giấy phép đỏ cho doanh nghiệp. Gây tăng trưởng GDP bùng nổ nhưng nhanh chóng mở rộng khoảng cách giàu nghèo.
                        </p>
                        <div className="mt-auto flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-lg text-xs font-semibold">-5 Điểm Chính trị</span>
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-semibold">++GDP</span>
                            <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold">+Gini</span>
                        </div>
                    </button>
                </div>

                {/* MARXIST-LENINIST ACTIONS */}
                <h2 className="text-2xl font-bold mb-6">Chính sách Kinh tế Chính trị</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Strengthen Collective Ownership */}
                    <button
                        onClick={() => state.strengthenCollectiveOwnership(150)}
                        disabled={state.budget < 150}
                        className="group flex flex-col items-start p-8 bg-slate-900 rounded-3xl border border-slate-800 hover:border-indigo-500 hover:bg-slate-900/80 transition-all disabled:opacity-50 disabled:hover:border-slate-800 disabled:cursor-not-allowed text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Shield className="w-32 h-32" />
                        </div>
                        <div className="p-4 bg-indigo-500/10 rounded-2xl mb-6">
                            <Shield className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Tăng cường Sở hữu Tập thể</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Phát triển sở hữu xã hội chủ nghĩa, tăng cường hợp tác xã và doanh nghiệp nhà nước. Giảm bất bình đẳng giai cấp.
                        </p>
                        <div className="mt-auto flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold">-150T Ngân sách</span>
                            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-semibold">+Sở hữu Tập thể</span>
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-semibold">-Gini</span>
                        </div>
                    </button>

                    {/* Promote Class Struggle */}
                    <button
                        onClick={() => state.promoteClassStruggle()}
                        disabled={state.politicalPower < 3}
                        className="group flex flex-col items-start p-8 bg-slate-900 rounded-3xl border border-slate-800 hover:border-red-500 hover:bg-slate-900/80 transition-all disabled:opacity-50 disabled:hover:border-slate-800 disabled:cursor-not-allowed text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Target className="w-32 h-32" />
                        </div>
                        <div className="p-4 bg-red-500/10 rounded-2xl mb-6">
                            <Target className="w-8 h-8 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Thúc đẩy Đấu tranh Giai cấp</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Tăng cường đấu tranh chống áp bức giai cấp, bảo vệ quyền lợi người lao động. Theo Mác, đấu tranh giai cấp là động lực phát triển xã hội.
                        </p>
                        <div className="mt-auto flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-lg text-xs font-semibold">-3 Điểm Chính trị</span>
                            <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold">+Đấu tranh Giai cấp</span>
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-semibold">-Gini</span>
                        </div>
                    </button>

                    {/* Develop Socialist Economy */}
                    <button
                        onClick={() => state.developSocialistEconomy(250)}
                        disabled={state.budget < 250}
                        className="group flex flex-col items-start p-8 bg-slate-900 rounded-3xl border border-slate-800 hover:border-green-500 hover:bg-slate-900/80 transition-all disabled:opacity-50 disabled:hover:border-slate-800 disabled:cursor-not-allowed text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Star className="w-32 h-32" />
                        </div>
                        <div className="p-4 bg-green-500/10 rounded-2xl mb-6">
                            <Star className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Phát triển Kinh tế XHCN</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Đầu tư vào kinh tế thị trường định hướng xã hội chủ nghĩa, phát triển lực lượng sản xuất và quan hệ sản xuất xã hội chủ nghĩa.
                        </p>
                        <div className="mt-auto flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold">-250T Ngân sách</span>
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-semibold">+Phát triển XHCN</span>
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-semibold">+GDP Bền vững</span>
                        </div>
                    </button>
                </div>
            </div>

        </div>
    );
}
// Add to globals.css:
// @keyframes shimmer {
//   100% { transform: translateX(100%); }
// }
