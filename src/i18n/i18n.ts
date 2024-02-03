import { createI18n } from "vue-i18n";
import * as enUS from "./langs/en-US.json";
import * as svSE from "./langs/sv-SE.json";

// Type-define 'en-US' as the master schema for the resource
type MessageSchema = typeof enUS;

const userLocale = navigator.language;

export default createI18n<
  [MessageSchema],
  // Add supported locales
  'en-US' | 'en' | 'sv-SE' | 'sv'>({
  // default locale
  locale: userLocale ?? 'en-US',
  messages: {
    'en-US': enUS, 'en': enUS,
    'sv-SE': svSE, 'sv': svSE
  },
});
