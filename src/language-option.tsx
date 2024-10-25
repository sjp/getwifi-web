import type { Locales } from "./i18n/i18n-types";

interface LanguageOptionProps {
  name: string;
  locale: Locales;
}

export const LanguageOption = ({ name, locale }: LanguageOptionProps) => {
  return <option value={locale}>{name}</option>;
};
