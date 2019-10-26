const EVENTS = {
    PING: 0,
    PONG: 1,
    CHAT: 2,
};

const EVENT_KEYS = Object.keys(EVENTS);
const EVENT_VALUES = Object.values(EVENTS);

module.exports = {
    EVENTS, EVENT_KEYS, EVENT_VALUES
}