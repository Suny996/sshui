import Vue from 'vue';
import Locales from './locale';

import elementEn from 'element-ui/lib/locale/lang/en'
import elementZhCN from 'element-ui/lib/locale/lang/zh-CN'
import elementZhTW from 'element-ui/lib/locale/lang/zh-TW'
import zh from './lang/zh-CN'

// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.lang || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const i18ns = {
  'zh-CN': Object.assign(elementZhCN,zh),
  'en-US': Object.assign(elementEn, locales['en-US']),
  'zh-TW': Object.assign(elementZhTW, locales['zh-TW'])
};
/*const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
const mergeTW = Object.assign(zhTLocale, locales['zh-TW']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);
Vue.locale('zh-TW', mergeTW);*/

export default i18ns
