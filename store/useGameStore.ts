import { create } from 'zustand';
import { GameState, GameActions, TurnEffect } from '@/types/game';

const INITIAL_STATE: GameState = {
    budget: 1000,
    gdp: 5000, 
    socialWelfare: 60,
    gini: 35, // Hệ số Gini an toàn
    currentYear: 2024,
    turn: 1,
    politicalPower: 10,
    collectiveOwnership: 40, // Bắt đầu với mức sở hữu tập thể trung bình
    classStruggle: 20, // Mức đấu tranh giai cấp thấp
    socialistDevelopment: 50, // Mức phát triển XHCN trung bình
    taxRate: 20, // Thuế thu nhập 20%
    isGameOver: false,
    gameOverReason: null,
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
    ...INITIAL_STATE,

    // --- ACTIONS CHO NGƯỜI CHƠI TƯƠNG TÁC KHI TRONG LƯỢT ---

    setTaxRate: (rate: number) => set({ taxRate: rate }),

    investStateSector: (amount: number) => set((state: GameState) => {
        if (state.budget < amount) return state; // Không đủ tiền
        return {
            budget: state.budget - amount,
            socialWelfare: Math.min(100, state.socialWelfare + (amount * 0.05)), // Tăng an sinh
            gdp: state.gdp + (amount * 1.2), // Đầu tư công tạo ra GDP thực
            politicalPower: state.politicalPower + 2
        };
    }),

    supportCollectiveSector: (amount: number) => set((state: GameState) => {
        if (state.budget < amount) return state;
        return {
            budget: state.budget - amount,
            socialWelfare: Math.min(100, state.socialWelfare + (amount * 0.08)), // Giải quyết việc làm tốt
            gini: Math.max(0, state.gini - 2), // Giảm bất bình đẳng
            gdp: state.gdp + (amount * 1.1)
        };
    }),

    deregulatePrivateSector: () => set((state: GameState) => ({
        // Nới lỏng quy định không tốn ngân sách, nhưng tốn điểm chính trị
        politicalPower: state.politicalPower >= 5 ? state.politicalPower - 5 : state.politicalPower,
        gdp: state.gdp * 1.05, // Tăng trưởng nóng
        gini: state.gini + 3, // Hệ lụy phân hóa giàu nghèo
        collectiveOwnership: Math.max(0, state.collectiveOwnership - 5), // Giảm sở hữu tập thể
        classStruggle: state.classStruggle + 2 // Tăng đấu tranh giai cấp
    })),

    // --- ACTIONS KINH TẾ CHÍNH TRỊ MÁC-LÊNIN ---

    strengthenCollectiveOwnership: (amount: number) => set((state: GameState) => {
        if (state.budget < amount) return state;
        return {
            budget: state.budget - amount,
            collectiveOwnership: Math.min(100, state.collectiveOwnership + 8),
            socialWelfare: Math.min(100, state.socialWelfare + (amount * 0.04)),
            gini: Math.max(0, state.gini - 3),
            politicalPower: state.politicalPower + 1
        };
    }),

    promoteClassStruggle: () => set((state: GameState) => ({
        // Thúc đẩy đấu tranh giai cấp không tốn ngân sách nhưng tốn điểm chính trị
        politicalPower: state.politicalPower >= 3 ? state.politicalPower - 3 : state.politicalPower,
        classStruggle: Math.min(100, state.classStruggle + 10),
        gini: Math.max(0, state.gini - 4), // Giảm bất bình đẳng thông qua đấu tranh
        collectiveOwnership: Math.min(100, state.collectiveOwnership + 3)
    })),

    developSocialistEconomy: (amount: number) => set((state: GameState) => {
        if (state.budget < amount) return state;
        return {
            budget: state.budget - amount,
            socialistDevelopment: Math.min(100, state.socialistDevelopment + 6),
            gdp: state.gdp + (amount * 0.8), // Phát triển bền vững
            socialWelfare: Math.min(100, state.socialWelfare + (amount * 0.03)),
            collectiveOwnership: Math.min(100, state.collectiveOwnership + 4),
            politicalPower: state.politicalPower + 2
        };
    }),

    // --- ACTIONS CHO HỆ THỐNG / YẾU TỐ BÊN NGOÀI ---

    triggerEvent: (effect: TurnEffect) => set((state: GameState) => ({
        budget: state.budget + (effect.budgetDelta || 0),
        gdp: state.gdp * (effect.gdpMultiplier || 1),
        socialWelfare: Math.min(100, Math.max(0, state.socialWelfare + (effect.welfareDelta || 0))),
        gini: Math.max(0, state.gini + (effect.giniDelta || 0)),
        politicalPower: state.politicalPower + (effect.ppDelta || 0)
    })),

    // Hàm chuyển lượt cốt lõi (sẽ được gọi bởi useGameLoop)
    advanceTurn: (eventsEffect?: TurnEffect) => set((state: GameState) => {
        if (state.isGameOver) return state;

        // 1. Tính toán logic tự nhiên theo từng năm
        const taxRevenue = state.gdp * (state.taxRate / 100) * 0.1; // Giả lập tỷ lệ thu thực tế
        const baseWelfareDecay = -1; // Mỗi năm an sinh tự động giảm nhẹ nếu không được chăm lo

        let newBudget = state.budget + taxRevenue;
        let newGdp = state.gdp * 1.02; // Base GDP growth 2%
        let newWelfare = state.socialWelfare + baseWelfareDecay;
        let newGini = state.gini;
        let newPP = state.politicalPower + 5; // Hồi điểm chính trị mỗi năm
        let newCollectiveOwnership = state.collectiveOwnership;
        let newClassStruggle = Math.max(0, state.classStruggle - 1); // Đấu tranh giai cấp giảm dần nếu không thúc đẩy
        let newSocialistDevelopment = state.socialistDevelopment;

        // Logic tự nhiên cho các chỉ số Mác-Lênin
        if (state.collectiveOwnership > 60) {
            newGdp *= 1.01; // Sở hữu tập thể cao giúp tăng trưởng bền vững
            newGini = Math.max(0, newGini - 0.5);
        }
        if (state.classStruggle > 50) {
            newGini = Math.max(0, newGini - 1); // Đấu tranh giai cấp giúp giảm bất bình đẳng
        }
        if (state.socialistDevelopment > 70) {
            newWelfare += 0.5; // Phát triển XHCN tăng an sinh
        }

        // 2. Áp dụng hiệu ứng từ Random Events (nếu có)
        if (eventsEffect) {
            newBudget += (eventsEffect.budgetDelta || 0);
            newGdp *= (eventsEffect.gdpMultiplier || 1);
            newWelfare += (eventsEffect.welfareDelta || 0);
            newGini += (eventsEffect.giniDelta || 0);
            newPP += (eventsEffect.ppDelta || 0);
            newCollectiveOwnership += (eventsEffect.collectiveOwnershipDelta || 0);
            newClassStruggle += (eventsEffect.classStruggleDelta || 0);
            newSocialistDevelopment += (eventsEffect.socialistDevelopmentDelta || 0);
        }

        // Giới hạn các chỉ số
        newCollectiveOwnership = Math.max(0, Math.min(100, newCollectiveOwnership));
        newClassStruggle = Math.max(0, Math.min(100, newClassStruggle));
        newSocialistDevelopment = Math.max(0, Math.min(100, newSocialistDevelopment));

        // 3. Kiểm tra điều kiện Game Over
        let gameOver = false;
        let reason = null;

        if (newGini > 70) {
            gameOver = true;
            reason = "Bất bình đẳng quá mức dẫn đến khủng hoảng xã hội nghiêm trọng.";
        } else if (newWelfare < 20) {
            gameOver = true;
            reason = "Chỉ số an sinh xuống mốc báo động, mất niềm tin của nhân dân.";
        } else if (newBudget < -5000) {
            gameOver = true;
            reason = "Vỡ nợ quốc gia. Ngân sách thâm hụt không thể kiểm soát.";
        } else if (newCollectiveOwnership < 10) {
            gameOver = true;
            reason = "Sở hữu tập thể suy yếu, chủ nghĩa tư bản thống trị nền kinh tế.";
        } else if (newSocialistDevelopment < 20) {
            gameOver = true;
            reason = "Phát triển xã hội chủ nghĩa thụt lùi, mất định hướng xã hội chủ nghĩa.";
        }

        return {
            budget: newBudget,
            gdp: newGdp,
            socialWelfare: newWelfare,
            gini: newGini,
            politicalPower: newPP,
            collectiveOwnership: newCollectiveOwnership,
            classStruggle: newClassStruggle,
            socialistDevelopment: newSocialistDevelopment,
            currentYear: state.currentYear + 1,
            turn: state.turn + 1,
            isGameOver: gameOver,
            gameOverReason: reason
        };
    }),

    resetGame: () => set(INITIAL_STATE)
}));
