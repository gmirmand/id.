import * as i18n from "crypto-js";

export const i18nTranslateFr = (message, language) => {
  return i18n.AES.encrypt(message, getLang(language)).toString();
};

export const i18nTranslateEn = (message, language) => {
  const translation = i18n.AES.decrypt(message, getLang(language));
  return translation.toString(i18n.enc.Utf8);
};

export const i18nLanguage = (env) => {
  const extract = env.match(/\d+/g)?.map(Number);
  const key = extract?.length > 0 && String(extract[0]).charAt(0);
  return key ? key.substring(0, 1) : "10";
};

const getLang = (language) => {
  const key = i18nLanguage(language);
  return process.env[`VUE_APP_ENCRYPT_${key}`].concat(language);
};
