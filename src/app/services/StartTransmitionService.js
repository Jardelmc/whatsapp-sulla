/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import BaseContactsMongo from '../schemas/BaseContactsMongo';
import insertNameInMessage from '../util/InsertNameUtil';

export async function startTextTransmition(user, message) {
  try {
    const { contacts } = await BaseContactsMongo.findById(user._id);

    let payload = [];

    if (message.includes('NOME')) {
      payload = insertNameInMessage(contacts, message);
    } else {
      for (const people of contacts) {
        const formattedCelAndMessage = {
          cel: people.cel,
          textMessage: message,
        };

        payload.push(formattedCelAndMessage);
      }
    }

    await axios.post(`${process.env.APP_URL}/sendMessage/text`, {
      celOwner: user._id,
      payload,
    });

    return true;
  } catch (error) {
    console.log(`Erro ao iniciar transmissão: ${error}`);

    return false;
  }
}
