
export interface Article {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  type: 'past_revision' | 'passwords' | 'incognito' | 'gaming' | 'geolocation' | 'smartphone_spy' | 'phishing' | 'photos_profiling' | 'final_summary';
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  desc: string;
}

export interface PhishingTask {
  sender: string;
  url: string;
  text: string;
  is_phishing: boolean;
  hint: string;
}
