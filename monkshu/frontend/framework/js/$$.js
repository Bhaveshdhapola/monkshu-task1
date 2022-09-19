/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */

////////////////////////////////////////////////
// The global namespace
////////////////////////////////////////////////

window.$$ = {};

$$.ready = callback => {
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback)
}

$$.import = async (url, scope = window) => {
    const result = await import(url);
    for (const key in result) scope[key] = result[key];
}

$$.__loadedJS = {};
$$.require = async (url, targetDocument = document) => {
    url = new URL(url, window.location).href;        // Normalize

    if (Object.keys($$.__loadedJS).includes(url)) { // already loaded
        const script = document.createElement("script");
        script.text = $$.__loadedJS[url];
        const scriptNode = script.cloneNode(true);
        targetDocument.head.appendChild(scriptNode).parentNode.removeChild(scriptNode);
    } else try {
        const js = await (await $$.__fetchThrowErrorOnNotOK(url)).text();
        const script = document.createElement("script");
        script.text = `${js}\n//# sourceURL=${url}`;
        $$.__loadedJS[url] = script.text; 
        const scriptNode = script.cloneNode(true);
        targetDocument.head.appendChild(scriptNode).parentNode.removeChild(scriptNode);
    } catch (err) {throw err};
}

$$.__loadedCSS = [];
$$.requireCSS = url => {
    url = new URL(url, window.location).href;        // Normalize
    if ($$.__loadedCSS.includes(url)) return Promise.resolve();    // already loaded

    return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.type = "text/css"; link.rel = "stylesheet"; link.href = url;
        link.onload = _ => resolve(); link.onerror = _ => reject(`Couldn't load CSS at ${url}`);
        document.getElementsByTagName("head")[0].appendChild(link);
    });
}

$$.__loadedJSON = {};
$$.requireJSON = async url => {
    url = new URL(url, window.location).href;        // Normalize

    if (Object.keys($$.__loadedJSON).includes(url)) return $$.__loadedJSON[url];   // already loaded
    else try {
        const json = await (await $$.__fetchThrowErrorOnNotOK(url)).json();
        $$.__loadedJSON[url]=json; return $$.__loadedJSON[url];
    } catch (err) {throw err};
}

$$.__loadedText = {};
$$.requireText = async url => {
    url = new URL(url, window.location).href;        // Normalize

    if (Object.keys($$.__loadedText).includes(url)) return $$.__loadedText[url];   // already loaded
    else try {
        const text = await (await $$.__fetchThrowErrorOnNotOK(url)).text();
        $$.__loadedText[url]=text; return $$.__loadedText[url];
    } catch (err) {throw err};
}

$$.__loadedPlugins = [];
$$.getLoadedPlugins = _ => $$.__loadedPlugins;
$$.importPlugin = url => {
    url = new URL(url, window.location).href;        // Normalize
    if ($$.__loadedPlugins.includes(url)) return Promise.resolve();   // already loaded

    return new Promise( (resolve, reject) => {
        import (url).then(exported => {
            let moduleName = url.lastIndexOf("/") != -1 ? url.substring(url.lastIndexOf("/")+1) : url;
            moduleName = moduleName.lastIndexOf(".") != -1 ? moduleName.substring(0, moduleName.lastIndexOf(".")) : moduleName;
            $$[moduleName] = exported;
            $$.__loadedPlugins.push(url); resolve();
        }).catch(err => reject(err));
    });
}

$$.__fetchThrowErrorOnNotOK = async url => {
    const response = await fetch(url, {mode:"no-cors", cache: "default"});
    if (!response.ok) throw new Error(`Issue in fetch, status returned is ${response.status}`);
    else return response;
}

$$.boot = async appPath => {
    window.LOG = await import("/framework/js/log.mjs");
    const {bootstrap} = await import("/framework/js/bootstrap.mjs");
    bootstrap(appPath);
}