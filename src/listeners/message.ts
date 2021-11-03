const { Listener } = require('discord-akairo');

export default class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    exec() {
    }
}