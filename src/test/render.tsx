import { render } from "@testing-library/preact";
import type { ComponentChildren } from "preact";
import TypesafeI18n from "../i18n/i18n-react";
import { loadBaseLocale } from "../load-locale";

loadBaseLocale();

// Renders a component inside the i18n provider using the base ('en') locale.
export const renderWithI18n = (ui: ComponentChildren) =>
  render(<TypesafeI18n locale="en">{ui}</TypesafeI18n>);
