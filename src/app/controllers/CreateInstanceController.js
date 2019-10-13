import toDoOnMessage from '../services/OnMessageService';

const sulla = require('sulla-hotfix');

let clientBot;

class CreateInstanceController {
  async init(req, res) {
    clientBot = await sulla.create(); // .then(client => sendText(client));

    clientBot.onMessage(message => {
      toDoOnMessage(message, clientBot);
    });

    return res.json({ message: 'Ok' });
  }
}

export default new CreateInstanceController();
