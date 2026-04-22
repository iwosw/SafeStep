
import { PhishingTask } from "../types";

export async function askMentor(question: string) {
  const responses = [
    "Отличный вопрос! Помни, что в кибербезопасности главное — бдительность. Проверь настройки приватности прямо сейчас.",
    "Хм, это серьезно. Рекомендую использовать менеджер паролей и никогда не переходить по подозрительным ссылкам.",
    "Безопасность — это процесс, а не точка. Постоянно обновляй свои знания и софт!",
    "Твой цифровой след — это твоя репутация. Думай дважды, прежде чем постить что-то в открытый доступ.",
    "Двухфакторная аутентификация (2FA) — твой лучший друг. Включи её везде, где это возможно!"
  ];
  
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

export async function simulateOsintScan(nickname: string, name: string) {
  const templates = [
    `Найден на форуме lolz.guru (2021): привязанный email ${nickname}@mail.ru`,
    `Утечка геолокации по фото в ВК: школа №12, район Южное Бутово`,
    `Старый профиль на Ask.fm (2019): "Люблю играть в Minecraft и гулять у пруда"`,
    `Связанный аккаунт в Steam: 142 игры, инвентарь скрыт настройками приватности`,
    `Упоминание в комментариях YouTube: "Я живу на улице Ленина, заходите в гости"`,
    `Найден в базе данных утечки "Доставка Еды" (2022): адрес доставки совпадает с IP`,
    `Привязанный номер телефона заканчивается на **-**-42`
  ];

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return a random subset of findings
  const count = 4 + Math.floor(Math.random() * 3);
  const shuffled = [...templates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function generatePhishingTask(): Promise<PhishingTask> {
  const tasks: PhishingTask[] = [
    {
      sender: "support@steampowered-security.com",
      url: "https://steam-login-verify.com/auth",
      text: "Ваш аккаунт Steam будет заблокирован через 24 часа из-за подозрительной активности. Срочно подтвердите владение аккаунтом по ссылке.",
      is_phishing: true,
      hint: "Обрати внимание на домен: официальная поддержка Steam использует только steampowered.com. 'security' в названии — типичный признак фишинга."
    },
    {
      sender: "noreply@google.com",
      url: "https://myaccount.google.com/security",
      text: "Выполнен вход в ваш аккаунт с нового устройства (Linux, Chrome). Если это не вы, проверьте список активных сессий.",
      is_phishing: false,
      hint: "Это легитимное письмо. Ссылка ведет на официальный домен google.com, а текст носит информационный характер без угроз немедленной блокировки."
    },
    {
      sender: "admin@discord-nitro-gift.ru",
      url: "https://discord.gift/nitro-promo-2024",
      text: "Поздравляем! Вы получили 3 месяца Discord Nitro бесплатно. Нажмите кнопку ниже, чтобы активировать подарок.",
      is_phishing: true,
      hint: "Бесплатный сыр только в мышеловке. Официальные подарки Nitro отображаются прямо в приложении Discord, а не приходят со сторонних доменов .ru."
    },
    {
      sender: "billing@netflix.com",
      url: "https://netflix-payment-update.net",
      text: "Ваша подписка приостановлена из-за проблем с оплатой. Пожалуйста, обновите данные вашей карты, чтобы продолжить просмотр.",
      is_phishing: true,
      hint: "Домен .net вместо .com и странный адрес 'payment-update' — явные признаки подделки. Всегда проверяй адрес в строке браузера."
    }
  ];

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const randomIndex = Math.floor(Math.random() * tasks.length);
  return tasks[randomIndex];
}
