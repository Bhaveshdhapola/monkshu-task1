/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/
// Custom modules
const API_CONSTANTS =
    require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const utils = require(`${API_CONSTANTS.LIB_PATH}/utils`);
exports.doService = async jsonReq => {
    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq)) return
    API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const random = await getRandom(jsonReq);
        if (!random) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { random } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const getRandom = async (jsonReq) => {
    try {
        if (jsonReq)
            return utils.randomCharacters();
    } catch (error) {
        throw error;
    }
}
const validateRequest = jsonReq => (jsonReq);