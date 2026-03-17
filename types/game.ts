export interface GameState {
  // 1. Chỉ số vĩ mô cốt lõi
  budget: number;       // Ngân sách Nhà nước (Tỷ VNĐ / Tỷ USD)
  gdp: number;          // Quy mô nền kinh tế
  socialWelfare: number;// Chỉ số An sinh / Hạnh phúc (0 - 100)
  gini: number;         // Chỉ số Bất bình đẳng Gini (0 - 100, càng cao càng nguy hiểm)
  
  // 2. Trạng thái thời gian
  currentYear: number;  // Bắt đầu từ 1986 hoặc năm tùy chọn
  turn: number;         // Tổng số lượt đã trôi qua
  
  // 3. Các điểm tài nguyên phụ
  politicalPower: number; // Điểm Chính trị dùng để ban hành luật
  
  // 4. Chỉ số kinh tế chính trị Mác-Lênin
  collectiveOwnership: number; // Mức độ sở hữu tập thể (0-100) - phản ánh sở hữu xã hội chủ nghĩa
  classStruggle: number;       // Mức độ đấu tranh giai cấp (0-100) - thể hiện xung đột giai cấp
  socialistDevelopment: number; // Mức độ phát triển xã hội chủ nghĩa (0-100)
  
  // 5. Cấu hình & Lịch sử
  taxRate: number;      // Thuế TNDN cơ bản (%)
  isGameOver: boolean;
  gameOverReason: string | null;
}

export interface GameActions {
  // Actions cơ bản
  setTaxRate: (rate: number) => void;
  investStateSector: (budgetAmount: number) => void;
  supportCollectiveSector: (budgetAmount: number) => void;
  deregulatePrivateSector: () => void;
  
  // Actions kinh tế chính trị Mác-Lênin
  strengthenCollectiveOwnership: (budgetAmount: number) => void; // Tăng cường sở hữu tập thể
  promoteClassStruggle: () => void; // Thúc đẩy đấu tranh giai cấp
  developSocialistEconomy: (budgetAmount: number) => void; // Phát triển kinh tế xã hội chủ nghĩa
  
  // Action cho cốt lõi Game Loop
  advanceTurn: (eventsEffect?: TurnEffect) => void;
  triggerEvent: (effect: TurnEffect) => void;
  resetGame: () => void;
}

// Interface định nghĩa sự tác động lên state trong 1 lượt
export interface TurnEffect {
  budgetDelta?: number;
  gdpMultiplier?: number;
  welfareDelta?: number;
  giniDelta?: number;
  ppDelta?: number;
  collectiveOwnershipDelta?: number;
  classStruggleDelta?: number;
  socialistDevelopmentDelta?: number;
}
