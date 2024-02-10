"use client";

import {
  LanguagesSupportMap,
  LanguagesSupported,
  useLanguageStore,
  useSubscriptionStore,
} from "@/store/store";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@ui/select";
import { Loader2 } from "lucide-react";
import Link from "next/link";

function LanguageSelect() {
  const [language, setLanguage, getLanguages, getNotSupportedLanguages] =
    useLanguageStore((state) => [
      state.language,
      state.setLanguage,
      state.getLanguages,
      state.getNotSupportedLanguages,
    ]);

  const subscription = useSubscriptionStore((state) => state.subscription);

  const isPro =
    subscription?.role === "pro" && subscription?.status === "active";

  const pathName = usePathname();

  const isChatPage = pathName.includes("/chat");

  return (
    isChatPage && (
      <div>
        <Select
          onValueChange={(value: LanguagesSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[150px] text-black dark:text-white">
            <SelectValue
              placeholder={LanguagesSupportMap[language]}
              className=""
            />
          </SelectTrigger>

          <SelectContent>
            {subscription === undefined ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                {getLanguages(isPro).map((language) => (
                  <SelectItem key={language} value={language}>
                    {LanguagesSupportMap[language]}
                  </SelectItem>
                ))}
                {getNotSupportedLanguages(isPro).map((language) => (
                  <Link href={"/register"} key={language} prefetch={false}>
                    <SelectItem
                      key={language}
                      value={language}
                      disabled
                      className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
                    >
                      {LanguagesSupportMap[language]} (PRO)
                    </SelectItem>
                  </Link>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    )
  );
}

export default LanguageSelect;
