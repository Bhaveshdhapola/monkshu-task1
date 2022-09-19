/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/
/**
 * * Generate random RFC-compliant UUIDs in JavaScript
* source: https://github.com/kelektiv/node-uuid
*/
module.exports.uniqid = () => require(__dirname +
    "/../../3p/node_modules/uuid/v4")();
/** Generate random number using current timestamp */
module.exports.randomNumber = () => Math.floor(Math.random() *
    Date.now() / 1000);
/** Generate random characters can be used as strong password */
module.exports.randomCharacters = (length = 20, wishlist =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$") => Array(length).fill('').map(() => wishlist[Math.floor(Math.random() *
        wishlist.length)]).join('');
/** Enable or disable info logs from here */
module.exports.captureInfoLog = (toLog, disableLog = false) =>
    (!disableLog) ? LOG.info(toLog) : undefined;
/** Get Unixtimestamp */
module.exports.getTimestamp = (date) => (date) ? new
    Date(date).getTime() : new Date().getTime();
/** String passed string for new line or additional spaces */
module.exports.stripString = (inputString) => (inputString) ?
    inputString.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, ' ') : "";
/** Returns Array of unique values within the provided Array */
module.exports.getUniqueValues = (inputArray) =>
    Object.values(inputArray).filter((value, index, self) =>
        (self.indexOf(value) === index));
/** Get Current Unix timestamp without milliseconds */
module.exports.getCurrentUnixTimestamp = () => (new Date().getTime() /
    1000).toString().split('.')[0];