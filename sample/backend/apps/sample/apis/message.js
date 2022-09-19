/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/
// Custom modules
const API_CONSTANTS =
    require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
exports.doService = async jsonReq => {
    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq)) return
    API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const message = await getMessage(jsonReq);
        if (!message) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { message } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const getMessage = async (jsonReq) => {
    try {
        if (jsonReq)
            return "This is your first API";
    } catch (error) {
        throw error;
    }
}
const validateRequest = jsonReq => (jsonReq);