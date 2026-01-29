
import { past_revision_content } from './past_revision';
import { passwords_content } from './passwords';
import { incognito_content } from './incognito';
import { gaming_content } from './gaming';
import { geolocation_content } from './geolocation';
import { smartphone_spy_content } from './smartphone_spy';
import { phishing_content } from './phishing';
import { ai_photos_content } from './ai_photos';
import { final_summary_content } from './final';

export const BIG_ARTICLES_STORAGE: Record<string, string> = {
    "past_revision": past_revision_content,
    "passwords": passwords_content,
    "incognito": incognito_content,
    "gaming": gaming_content,
    "geolocation": geolocation_content,
    "smartphone_spy": smartphone_spy_content,
    "phishing": phishing_content,
    "aiandyourphotos": ai_photos_content,
    "final_summary": final_summary_content
};
