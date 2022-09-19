/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed license.txt file.
*/
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";
const getRandomString = async () => {
    let resp = await apiman.rest(APP_CONSTANTS.API_RANDOM, "POST", {},
        true); // {} is for sending information from frontend to backend 
    if (!resp.result) router.reload();
    app_random.shadowRoot.querySelector("#random").value =
        resp.results.random;
}
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("app-random",
        `${APP_CONSTANTS.APP_PATH}/components/app-random/app-random.html`,
        app_random);
}
const trueWebComponentMode = true; // making this false renders the component without using Shadow DOM
export const app_random = {
    trueWebComponentMode, register,
    getRandomString
}