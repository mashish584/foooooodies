const { promisify } = require("es6-promisify");
const streamToBuffer = require("stream-to-buffer");
exports.S2B = promisify(streamToBuffer);
