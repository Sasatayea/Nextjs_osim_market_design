"use client";

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

export default function I18nProvider({ children }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update HTML attributes when language changes
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
    
    // Update global font if needed (optional)
    if (i18n.language === 'ar') {
       document.body.style.fontFamily = "'Cairo', sans-serif"; // Use a nice Arabic font
    } else {
       document.body.style.fontFamily = "var(--font-body)";
    }
  }, [i18n.language]);

  return <>{children}</>;
}
