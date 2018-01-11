'use strict';

import Context from './Context.js'; 
import I18n from 'i18n-js';
I18n.fallbacks = true;
I18n.defaultLocale = 'en'
//I18n.locale = navigator.language; 
I18n.locale = Context.language; 
I18n.translations = {
  en: require('../i18n/en.json'),
  ru: require('../i18n/ru.json'),
  de: require('../i18n/de.json'), 
}

function I18N() {
  Context.language = navigator.language;
  
  this.setLanguage = function(language) {
    Context.language = language;
    I18n.locale = language;
  };
  this.getLanguage = function() {
    return Context.language;
  };
}

export default new I18N();
