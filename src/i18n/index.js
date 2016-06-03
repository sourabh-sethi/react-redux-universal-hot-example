
import config from '../config/config';
import fs from 'fs';
import path from 'path';
import Language from './Language';

const _root = config.i18n;

// console.log('====> LOADED - index.js');

export default class I18n {
    constructor(language) {
      // console.log('====> CONSTRUCTOR - i18n');
      global.messages = {};
      global.language = new Language(language);
      this._initializeLocalizedStrings();
    }

    getLanguage() {
      return global.language;
    }

    getCurrentLocalizedString() {
      return global.messages[global.language.culture];
    }

    getLocalizedStrings(language) {
      // const root = _root;
      const filename = path.join(_root,
                language.code,
                language.culture,
                `${language.culture}.json`);
            // console.log('language file =>' + filename);
            // TODO: This needs to be cached
      const data = fs.readFileSync(filename, 'utf8');
            // console.log(data);
      return JSON.parse(data);
    }

    _initializeLocalizedStrings() {
      const _this = this;
      const supportedLanguages = global.language.getSupportedLanguages();
            // console.log('supportedLanguages > ');
            // console.log(supportedLanguages);
      if (supportedLanguages !== undefined) {
        supportedLanguages.forEach(_language => {
          global.messages[_language.culture] = _this.getLocalizedStrings(_language);
        });
      }
    }
}
