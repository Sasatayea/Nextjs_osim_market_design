import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "men": "Men",
        "sale": "Sale",
        "about": "About",
        "dashboard": "Dashboard",
        "search": "Search products...",
        "account": "Account",
        "cart": "Cart"
      },
      "hero": {
        "eyebrow": "New Collection 2024",
        "title": "Dress With",
        "purpose": "Purpose.",
        "subtitle": "Curated premium men's fashion for those who believe that style is a statement, not an afterthought.",
        "shop_new": "Shop New Arrivals",
        "explore": "Explore Collections"
      },
      "footer": {
        "tagline": "Curated premium men's fashion for those who believe clothing is an expression of character, not just necessity.",
        "nav_title": "Navigation",
        "contact_title": "Contact",
        "newsletter_eyebrow": "Stay in the loop",
        "newsletter_subtitle": "Get notified about new collections and exclusive offers.",
        "subscribe": "Subscribe",
        "rights": "All rights reserved.",
        "privacy": "Privacy Policy",
        "terms": "Terms of Service",
        "cookies": "Cookies"
      },
      "common": {
        "view_all": "View All",
        "collection": "Collection",
        "save": "Save",
        "off": "OFF"
      }
    }
  },
  ar: {
    translation: {
      "nav": {
        "home": "الرئيسية",
        "men": "الرجال",
        "sale": "تخفيضات",
        "about": "من نحن",
        "dashboard": "لوحة التحكم",
        "search": "بحث عن منتجات...",
        "account": "حسابي",
        "cart": "السلة"
      },
      "hero": {
        "eyebrow": "تشكيلة جديدة 2024",
        "title": "ارتدِ بـ",
        "purpose": "هدف.",
        "subtitle": "أزياء رجالية فاخرة منتقاة لمن يؤمنون بأن الأناقة تعبير، وليست مجرد فكرة ثانوية.",
        "shop_new": "تسوق أحدث الموديلات",
        "explore": "اكتشف التشكيلات"
      },
      "footer": {
        "tagline": "أزياء رجالية متميزة لمن يؤمنون بأن الملابس تعبير عن الشخصية، وليست مجرد ضرورة.",
        "nav_title": "التنقل",
        "contact_title": "اتصل بنا",
        "newsletter_eyebrow": "ابقَ على اطلاع",
        "newsletter_subtitle": "احصل على إشعارات حول التشكيلات الجديدة والعروض الحصرية.",
        "subscribe": "اشترك الآن",
        "rights": "جميع الحقوق محفوظة.",
        "privacy": "سياسة الخصوصية",
        "terms": "شروط الخدمة",
        "cookies": "ملفات تعريف الارتباط"
      },
      "common": {
        "view_all": "عرض الكل",
        "collection": "تشكيلة",
        "save": "وفر",
        "off": "خصم"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
