import { playAchievementSound } from '../utils/audio';

// Определение всех ачивок
export const ACHIEVEMENTS_DICT: Record<string, { emoji: string, title: string }> = {
    'first_blood': { emoji: '🚀', title: 'Инициализация (1 модуль)' },
    'half_way': { emoji: '🏰', title: 'Страж Крепости (5 модулей)' },
    'full_clear': { emoji: '🥷', title: 'Кибер-Ниндзя (Все модули)' },
    'incognito_master': { emoji: '🕵️‍♂️', title: 'Разоблачитель инкогнито' },
    'spy_buster': { emoji: '📱', title: 'Гроза шпионов' },
    'phishing_master': { emoji: '🎣', title: 'Анти-Фишер' },
    'stealer_aware': { emoji: '🎮', title: 'Повелитель Стилеров' },
    'geo_ninja': { emoji: '📍', title: 'Призрак в городе' },
    'osint_survivor': { emoji: '🧩', title: 'Неуловимый для OSINT' },
    'clean_past': { emoji: '🧹', title: 'Чистое прошлое' },
    'password_guru': { emoji: '🔐', title: 'Криптограф' }
};

// Функция разблокировки конкретной ачивки
export const grantAchievement = (achId: string, alertText?: string) => {
    const achsData = JSON.parse(localStorage.getItem('achievements') || '[]');
    const achs = Array.isArray(achsData) ? achsData : [];
    if (!achs.includes(achId)) {
        achs.push(achId);
        localStorage.setItem('achievements', JSON.stringify(achs));
        
        playAchievementSound();
        window.dispatchEvent(new CustomEvent('trigger-toast', { 
            detail: { 
                title: 'Достижение разблокировано 🏆', 
                text: alertText || ACHIEVEMENTS_DICT[achId]?.title || 'Секретное достижение'
            } 
        }));
        
        // Оповещаем другие компоненты об обновлении хранилища (Dashboard, Navbar и тд)
        window.dispatchEvent(new Event('storage'));
    }
};

// Проверка Milestone ачивок (Первая кровь, Половина, Финал)
export const checkMilestones = (completedModulesCount: number) => {
    if (completedModulesCount === 1) grantAchievement('first_blood');
    if (completedModulesCount === 5) grantAchievement('half_way');
    if (completedModulesCount === 9) grantAchievement('full_clear');
};
