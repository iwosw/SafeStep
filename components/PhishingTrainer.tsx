
import React, { useState } from 'react';

interface PhishingEmail {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  linkText: string;
  actualUrl: string;
  isScam: boolean;
  explanation: string;
}

// Added onComplete prop to support marking the module as finished
export const PhishingTrainer: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [currentEmailIdx, setCurrentEmailIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [hoverLink, setHoverLink] = useState(false);

  const emails: PhishingEmail[] = [
    {
      id: 1,
      sender: "Служба безопасности VK",
      senderEmail: "admin@v-kontakte.io",
      subject: "Подозрительный вход в аккаунт",
      body: "В ваш аккаунт вошли из г. Пекин, Китай. Если это были не вы, срочно подтвердите свою личность, иначе доступ будет ограничен через 24 часа.",
      linkText: "Подтвердить вход",
      actualUrl: "http://vk-login-safe.cc/verify",
      isScam: true,
      explanation: "Домен v-kontakte.io — подделка. Официальные письма приходят только с vk.com. Также используется тактика запугивания ('ограничен через 24 часа')."
    },
    {
      id: 2,
      sender: "Steam Support",
      senderEmail: "noreply@steampowered.com",
      subject: "Ваш код Steam Guard",
      body: "Кто-то пытается войти в ваш аккаунт. Если это не вы, просто проигнорируйте это письмо. Ваш код:",
      linkText: "6J7F8",
      actualUrl: "https://steampowered.com",
      isScam: false,
      explanation: "Это настоящее письмо. Адрес отправителя верный, а ссылка ведет на официальный домен без лишних редиректов."
    },
    {
      id: 3,
      sender: "Госуслуги",
      senderEmail: "info@gosuslugi-pay.ru",
      subject: "Вам начислена компенсация",
      body: "Вам положена выплата в размере 15 400 руб. согласно указу №42-ФЗ. Для получения средств укажите реквизиты карты для перевода.",
      linkText: "Заполнить анкету",
      actualUrl: "http://gos-compensations.xyz/pay",
      isScam: true,
      explanation: "Госуслуги никогда не присылают ссылки на 'компенсации' с вводом данных карты на сторонних сайтах (.xyz). Также домен отправителя подозрительный."
    }
  ];

  const handleDecision = (userThinksScam: boolean) => {
    const isCorrect = userThinksScam === emails[currentEmailIdx].isScam;
    if (isCorrect) setScore(s => s + 1);
    setShowResult({ isCorrect, text: emails[currentEmailIdx].explanation });
  };

  const nextEmail = () => {
    setShowResult(null);
    // Notify parent when the last email is processed
    if (currentEmailIdx === emails.length - 1) {
      if (onComplete) onComplete();
    }
    setCurrentEmailIdx((currentEmailIdx + 1) % emails.length);
  };

  const email = emails[currentEmailIdx];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-black text-[#1e3c72] dark:text-blue-400 uppercase tracking-tighter">Лаборатория Фишинга 🎣</h3>
        <p className="text-slate-500 dark:text-slate-400">Внимательно изучи письмо и реши: это подделка или оригинал?</p>
        <div className="mt-2 text-sm font-bold bg-blue-50 dark:bg-blue-900/30 inline-block px-4 py-1 rounded-full text-blue-600 dark:text-blue-400">Очков: {score} / {emails.length}</div>
      </div>

      <div className="bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 rounded-[30px] shadow-xl overflow-hidden max-w-2xl mx-auto flex flex-col relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=800&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Background Pattern" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 flex flex-col h-full">
          {/* Email Header UI */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase">От:</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{email.sender}</span>
              <span className="text-xs text-blue-500 italic font-mono">&lt;{email.senderEmail}&gt;</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Тема:</span>
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{email.subject}</span>
            </div>
          </div>

          {/* Email Body UI */}
          <div className="p-8 min-h-[200px] flex flex-col justify-center text-center">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">{email.body}</p>
            <div className="relative inline-block mx-auto group">
              <button 
                onMouseEnter={() => setHoverLink(true)}
                onMouseLeave={() => setHoverLink(false)}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors cursor-default"
              >
                {email.linkText}
              </button>
              {hoverLink && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap animate-in fade-in zoom-in duration-200">
                  👉 {email.actualUrl}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {!showResult && (
            <div className="grid grid-cols-2 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={() => handleDecision(false)}
                className="p-5 font-black text-green-600 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors border-r border-slate-100 dark:border-slate-800"
              >
                ЭТО ОРИГИНАЛ ✅
              </button>
              <button 
                onClick={() => handleDecision(true)}
                className="p-5 font-black text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
              >
                ЭТО ФИШИНГ! 🏴‍☠️
              </button>
            </div>
          )}

          {showResult && (
            <div className={`p-6 border-t animate-in slide-in-from-bottom duration-300 ${showResult.isCorrect ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'}`}>
              <div className={`text-lg font-black mb-2 ${showResult.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {showResult.isCorrect ? 'Абсолютно верно! 🎯' : 'Ты попался на уловку! 💥'}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{showResult.text}</p>
              <button onClick={nextEmail} className="w-full bg-[#1e3c72] dark:bg-blue-600 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform">Следующее письмо →</button>
            </div>
          )}
        </div>
      </div>
      <p className="text-center text-xs text-slate-400"><b>Подсказка:</b> Наведи на кнопку в письме, чтобы увидеть реальный адрес (внизу под кнопкой).</p>
    </div>
  );
};
