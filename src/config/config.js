var path = require('path');

var config = config || {};

config.env = process.env.NODE_ENV || 'development';

//config.views = path.join(__dirname, '..', 'views');
config.i18n = path.join(__dirname, '..', 'i18n');
//config.clientApp = path.join(__dirname, '..', '..', 'client');
//config.components = path.join(__dirname, '..', '..', 'client', 'components');

config.supportedLanguages = [
    {
        code: 'en',
        locale: 'US',
        culture: 'en-US',
        displayName: 'English (US)',
        isRTL: false
    },
    {
        code: 'ar',
        locale: 'AE',
        culture: 'ar-AE',
        displayName: 'Arabic (UAE)',
        isRTL: true
    }
];

config.defaultLanguage = {
    code: 'en',
    locale: 'US',
    culture: 'en-US',
    displayName: 'English (US)',
    isRTL: false
};

module.exports = config;