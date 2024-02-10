import { create } from "zustand";
import { Subscription } from "@/types/subscription";
import { subscribe } from "diagnostics_channel";

export type LanguagesSupported = "en" | "es" | "de" | "fr" | "ja" | "hi";

export const LanguagesSupportMap: Record<LanguagesSupported, string> = {
  en: "English",
  es: "Spanish",
  de: "German",
  fr: "French",
  ja: "Japanese",
  hi: "Hindi",
};

const FREE_LANGUAGES = 2;

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
  language: "en",
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    // If user is PRO then return all suported languages
    if (isPro) return Object.keys(LanguagesSupportMap) as LanguagesSupported[];
    // If user is NOT PRO then return only the first two languages
    return Object.keys(LanguagesSupportMap).slice(
      FREE_LANGUAGES
    ) as LanguagesSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    // No unsupported languages for PRO users
    if (isPro) return [];
    // Excluding the first two languages
    return Object.keys(LanguagesSupportMap).slice(
      FREE_LANGUAGES
    ) as LanguagesSupported[];
  },
}));

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
