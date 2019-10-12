// import { create, Whatsapp } from 'sulla';

import { start, getAllContacts, sendText } from './Functions';
import { getCsvInfos } from './app/csv_resource/CsvCaseTapsEstatic';

const sulla = require('sulla-hotfix');

let clientBot;

class Start {
  async init(req, res) {
    clientBot = await sulla.create(); // .then(client => sendText(client));

    clientBot.onMessage(message => {
      if (message.body === 'Hi') {
        clientBot.sendText(message.from, '👋 Hello from sulla!');
      }
    });

    return res.json({ message: 'Ok' });
  }

  async sendManyMessages(req, res) {
    const { message } = req.body;

    const formattedPayload = await getCsvInfos(message);

    await sendText(clientBot, formattedPayload);

    return res.json({ message: 'Ok' });
  }
}

export default new Start();
