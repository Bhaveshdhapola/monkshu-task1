/* 
 * (C) 2018-2021 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import {session} from "/framework/js/session.mjs";

let i18nCached = {};
let appPath;

const init = appPathIn => appPath = appPathIn;

async function get(key, language, refresh=false) {
	try {
		if (!language) language = _getSessionLang();
		const i18nObject = await getI18NObject(language, refresh);
		return i18nObject[key]
	} catch (err) {throw err}
}

async function getI18NObject(language, refresh=false) {
	if (!language) language = _getSessionLang();
	if (!i18nCached[language] || refresh) {
		try {i18nCached[language] = await import(`${appPath}/i18n/i18n_${language}.mjs`);}
		catch(err) {throw err}
	} 
	
	return i18nCached[language].i18n;
}

const setI18NObject = (language, i18n) => i18nCached[language] = {i18n:{...i18nCached[language].i18n, ...i18n}};

const _getSessionLang = _ => session.get($$.MONKSHU_CONSTANTS.LANG_ID) || "en";

export const i18n = {init, get, getI18NObject, setI18NObject};