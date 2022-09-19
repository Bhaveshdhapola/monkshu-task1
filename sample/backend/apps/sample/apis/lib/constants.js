/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/
const path = require("path");
APP_ROOT = `${path.resolve(`${__dirname}/../../`)}`;
exports.APP_ROOT = APP_ROOT;
exports.CONF_DIR = `${APP_ROOT}/conf`;
// LIB_PATH: Location to APIs lib directory
exports.LIB_PATH = path.resolve(__dirname + "/../lib");
// Simple API Response for success or failure
exports.API_RESPONSE_TRUE = { result: true };
exports.API_RESPONSE_FALSE = { result: false };