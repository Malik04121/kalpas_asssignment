// config/i18n.js
const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['en', 'hi'],
    directory: path.join(__dirname, '../locales'),
    defaultLocale: 'en',
    queryParameter: 'lang',
    register: global,
});

module.exports = i18n;