/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed license.txt file.
*/
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";
const getMessage = async () => {
    let resp = await apiman.rest(APP_CONSTANTS.API_MESSAGE, "POST", {},
        false, true);
    if (!resp || !resp.result) router.reload();
    app_message.shadowRoot.querySelector("#message").value =
        resp.results.message;
    setTimeout(() => {
        router.loadPage(APP_CONSTANTS.RANDOM_HTML);
    }, 3000);
}
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("app-message",
        `${APP_CONSTANTS.APP_PATH}/components/app-message/app-message.html`,
        app_message);
}
const trueWebComponentMode = true; // making this false renders the component without using Shadow DOM
export const app_message = {
    trueWebComponentMode, register, getMessage
}