// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */

import { useContext } from 'preact/hooks'
import { initI18nReact } from 'typesafe-i18n/react'
import type { I18nContextType } from 'typesafe-i18n/react'
import type { Formatters, Locales, TranslationFunctions, Translations } from './i18n-types.js'
import { loadedFormatters, loadedLocales } from './i18n-util.js'

const { component: TypesafeI18n, context: I18nContext } = initI18nReact<Locales, Translations, TranslationFunctions, Formatters>(loadedLocales, loadedFormatters)

const useI18nContext = (): I18nContextType<Locales, Translations, TranslationFunctions> => useContext(I18nContext)

export { I18nContext, useI18nContext }

export default TypesafeI18n
