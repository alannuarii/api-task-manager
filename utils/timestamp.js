const currentTime = new Date();
currentTime.setMinutes(currentTime.getMinutes() + currentTime.getTimezoneOffset() + 960);

const timestamp = currentTime.toISOString();

module.exports = timestamp;