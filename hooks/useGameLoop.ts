import { useCallback, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { TurnEffect } from '@/types/game';

export interface GameEvent {
    title: string;
    description: string;
    effect: TurnEffect;
}

// Lấy event ngẫu nhiên - Sự kiện kinh tế chính trị Mác-Lênin
const RANDOM_EVENTS: GameEvent[] = [
    // Sự kiện kinh tế toàn cầu
    {
        title: "Khủng hoảng kinh tế toàn cầu",
        description: "Sự khủng hoảng của chủ nghĩa tư bản toàn cầu ảnh hưởng đến xuất khẩu. Theo Mác, khủng hoảng là quy luật tất yếu của chủ nghĩa tư bản.",
        effect: { gdpMultiplier: 0.9, budgetDelta: -200, welfareDelta: -5 }
    },
    {
        title: "Vốn FDI đổ bộ",
        description: "Các tập đoàn tư bản nước ngoài đầu tư lớn. Cơ hội tăng trưởng nhưng tăng nguy cơ lệ thuộc kinh tế.",
        effect: { gdpMultiplier: 1.05, budgetDelta: 500, giniDelta: 2 }
    },
    {
        title: "Nông nghiệp được mùa",
        description: "Sở hữu tập thể trong nông nghiệp phát huy hiệu quả, đảm bảo an ninh lương thực quốc gia.",
        effect: { budgetDelta: 100, welfareDelta: +3, giniDelta: -1 }
    },
    // Sự kiện đấu tranh giai cấp
    {
        title: "Phong trào công nhân đòi quyền",
        description: "Công nhân đấu tranh chống áp bức giai cấp tư sản. Theo Mác, đấu tranh giai cấp là động lực phát triển xã hội.",
        effect: { ppDelta: 3, welfareDelta: -2, giniDelta: -3, classStruggleDelta: 15, collectiveOwnershipDelta: 2 }
    },
    {
        title: "Tập đoàn tư bản thao túng thị trường",
        description: "Các tập đoàn độc quyền tăng giá, bóc lột nhân dân. Thể hiện bản chất bóc lột của chủ nghĩa tư bản.",
        effect: { budgetDelta: -150, giniDelta: 4, welfareDelta: -3, classStruggleDelta: 8, collectiveOwnershipDelta: -3 }
    },
    // Sự kiện chuyển đổi kinh tế
    {
        title: "Đổi mới kinh tế thành công",
        description: "Chuyển đổi từ kinh tế kế hoạch hóa tập trung sang kinh tế thị trường định hướng xã hội chủ nghĩa.",
        effect: { gdpMultiplier: 1.08, welfareDelta: 2, ppDelta: 2, socialistDevelopmentDelta: 10, collectiveOwnershipDelta: 5 }
    },
    {
        title: "Cải cách ruộng đất hiệu quả",
        description: "Chủ nghĩa xã hội chủ nghĩa về ruộng đất giúp nông dân thoát nghèo, tăng năng suất lao động.",
        effect: { budgetDelta: 80, welfareDelta: 4, giniDelta: -2, collectiveOwnershipDelta: 8, socialistDevelopmentDelta: 5 }
    },
    // Sự kiện sở hữu tập thể
    {
        title: "Hợp tác xã phát triển mạnh",
        description: "Sở hữu tập thể trong nông nghiệp và công nghiệp nhỏ phát huy vai trò, giảm bất bình đẳng.",
        effect: { gdpMultiplier: 1.03, welfareDelta: 3, giniDelta: -2, collectiveOwnershipDelta: 12, socialistDevelopmentDelta: 3 }
    },
    {
        title: "Doanh nghiệp nhà nước hiệu quả",
        description: "Sở hữu toàn dân qua doanh nghiệp nhà nước đóng góp lớn cho ngân sách, đảm bảo phúc lợi xã hội.",
        effect: { budgetDelta: 300, welfareDelta: 2, ppDelta: 1, collectiveOwnershipDelta: 6, socialistDevelopmentDelta: 4 }
    },
    // Sự kiện giá trị thặng dư và bóc lột
    {
        title: "Tăng lương tối thiểu",
        description: "Chính sách bảo vệ quyền lợi người lao động, hạn chế bóc lột giá trị thặng dư.",
        effect: { budgetDelta: -100, welfareDelta: 4, giniDelta: -1, ppDelta: 2, classStruggleDelta: -5, collectiveOwnershipDelta: 2 }
    },
    {
        title: "Lạm phát do đầu cơ",
        description: "Thương nhân tư bản đầu cơ tăng giá, làm giàu nhanh chóng. Thể hiện bản chất vô chính phủ của sản xuất tư bản chủ nghĩa.",
        effect: { budgetDelta: -250, welfareDelta: -4, giniDelta: 3, classStruggleDelta: 10, collectiveOwnershipDelta: -4 }
    },
    // Sự kiện phát triển bền vững
    {
        title: "Công nghiệp hóa thành công",
        description: "Chuyển đổi cơ cấu kinh tế từ nông nghiệp sang công nghiệp, nâng cao năng suất xã hội.",
        effect: { gdpMultiplier: 1.06, budgetDelta: 200, ppDelta: 1, socialistDevelopmentDelta: 8, collectiveOwnershipDelta: 3 }
    },
    {
        title: "Phát triển khoa học công nghệ",
        description: "Đầu tư vào KH&CN, chuyển đổi số. Theo Mác, lực lượng sản xuất quyết định quan hệ sản xuất.",
        effect: { gdpMultiplier: 1.04, welfareDelta: 1, ppDelta: 1, socialistDevelopmentDelta: 6, collectiveOwnershipDelta: 2 }
    },
    // Sự kiện xã hội chủ nghĩa
    {
        title: "Giảm nghèo thành công",
        description: "Chính sách xóa đói giảm nghèo hiệu quả, thu hẹp khoảng cách giai cấp.",
        effect: { welfareDelta: 5, giniDelta: -3, ppDelta: 3, socialistDevelopmentDelta: 7, collectiveOwnershipDelta: 4 }
    },
    {
        title: "Bảo hiểm xã hội toàn dân",
        description: "Mở rộng bảo hiểm xã hội, đảm bảo an sinh cho mọi người lao động.",
        effect: { budgetDelta: -150, welfareDelta: 4, ppDelta: 2, socialistDevelopmentDelta: 5, collectiveOwnershipDelta: 3 }
    }
];

export const useGameLoop = () => {
    const { advanceTurn, isGameOver, turn } = useGameStore();
    const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);

    const handleNextTurn = useCallback(() => {
        if (isGameOver) return;

        // Reset old event
        setCurrentEvent(null);

        // Xác định ngẫu nhiên có sự kiện xảy ra hay không (30% tỷ lệ xảy ra mỗi lượt)
        const isEventHappening = Math.random() < 0.3;
        let eventEffect: TurnEffect | undefined = undefined;

        if (isEventHappening) {
            // Bốc ngẫu nhiên 1 sự kiện
            const randomEvent = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
            setCurrentEvent(randomEvent);
            eventEffect = randomEvent.effect;
            console.log(`[SỰ KIỆN NĂM ${turn}]:`, randomEvent.title);
        }

        // Chuyển lượt và áp dụng tự động các công thức tính toán
        advanceTurn(eventEffect);

    }, [isGameOver, advanceTurn, turn]);

    // Optionally allow component to clear event modal
    const clearEvent = useCallback(() => setCurrentEvent(null), []);

    return { handleNextTurn, currentEvent, clearEvent };
};
