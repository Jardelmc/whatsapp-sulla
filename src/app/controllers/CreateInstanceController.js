const sulla = require('sulla-hotfix');

let clientBot;

class CreateInstanceController {
  async init(req, res) {
    clientBot = await sulla.create(); // .then(client => sendText(client));

    clientBot.onMessage(message => {
      if (message.body === 'Hi') {
        clientBot.sendText(message.from, '👋 Hello from sulla!');
      }
    });

    return res.json({ message: 'Ok' });
  }
}

export default new CreateInstanceController();
