import config from '../config/config';

// Right now we are reading supported languages from config
const _supportedLanguages = config.supportedLanguages;

class Language {
    constructor(language) {
            console.log('====> CONSTRUCTOR - Language');
            const _this = this;
            let parsedLang;
            if(language !== undefined)
            {
              parsedLang = _parse(language);
            }
            if (parsedLang === undefined || !_isLanguageSupported(parsedLang)) {
                console.log(`Language not supported: ${language}`);
                return Object.assign(this, _getDefaultLanguage());
            }

            this.code = parsedLang.code;
            this.locale = parsedLang.locale;
            this.culture = parsedLang.culture;
            _supportedLanguages.forEach(_language => {
                if (parsedLang.code === _language.code && parsedLang.locale === _language.locale) {
                    _this.displayName = _language.displayName;
                    _this.isRTL = _language.isRTL;
                    return;
                }
            });
    }

    getSupportedLanguages() {
            return _getSupportedLanguages();
    }

    getCulture() {
            return this.culture;
    }

    toString() {
            return this.culture;
    }
}

/*
class Language {
    constructor(language) {
        var _this = this;
        var parsedLang = _parse(language);

        if (parsedLang === undefined || !_isLanguageSupported(parsedLang)) {
            console.log('Language not supported: ' + language);
            return Object.assign(this, _getDefaultLanguage());
        }

        this.code = parsedLang.code;
        this.locale = parsedLang.locale;
        this.culture = parsedLang.culture;
        _supportedLanguages.forEach(function (_language) {
            if (parsedLang.code === _language.code && parsedLang.locale === _language.locale) {
                _this.displayName = _language.displayName;
                _this.isRTL = _language.isRTL;
                return;
            }
        });
    }

    getSupportedLanguages() {
        return _getSupportedLanguages();
    }

    toString() {
        return this.culture;
    }
}
*/
//
// * Parses language culture string to Code and Locale
// *
// * @param {string} language Language culture
// * @return {object} Code and Locale

function _parse(language) {
    const regEx = /^([a-z]{2})-([A-Z]{2})$/;
    console.log(language);
    const languageComponents = regEx.exec(language);
    if (languageComponents.length !== 3)
        return;

    return {
        code: languageComponents[1],
        locale: languageComponents[2],
        culture: `${languageComponents[1]}-${languageComponents[2]}`
    };
}

//
// Returns array of supported languages
// *
// * @return {array} List of supported languages
//
function _getSupportedLanguages() {
    return _supportedLanguages;
}

//
// * Returns default language from config
// *
// * @return {object} Default language
//
function _getDefaultLanguage() {
    return config.defaultLanguage;
}

//
// * Checks if language is supported or not
// *
// * @param {object} language Code and Locale
// * @return {bool}
//
function _isLanguageSupported(language) {
    let isSupported = false;
    _supportedLanguages.forEach(_language => {
        if (_language.code == language.code && _language.locale == language.locale)
            isSupported = true;
    });

    return isSupported;
}

export default Language;
