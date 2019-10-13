/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
import { differenceInMinutes } from 'date-fns';

import UserMongo from '../schemas/UserMongo';
import userMessage from '../models/UserMessageModel';
import { startTextTransmition } from './StartTransmitionService';

async function interpretMessage(user, message, clientBot) {
  const { lastConversation } = user;

  const lastMessage = lastConversation.pop();

  // Retornar mensagem para dentro do array
  lastConversation.push(lastMessage);

  let comparingLastTime = differenceInMinutes(lastMessage.date, new Date());

  comparingLastTime *= -1;

  if (comparingLastTime > 5) {
    clientBot.sendText(
      message.from,
      'Olá, que tipo de mensagem você quer enviar? Para mensagem de texto, responda: 1  Para mensagem de imagem, responda: 2'
    );

    userMessage = {
      text: message.body,
      date: new Date(),
    };

    // Adicionando ultima mensagem no array
    lastConversation.push(userMessage);
    await UserMongo.findOneAndUpdate({ _id: user._id }, { lastConversation });
    return;
  }

  // Se não caiu no IF acima, indica que a última mensagem é recenente.

  // Para mensagens de texto
  if (message.body === '1') {
    clientBot.sendText(message.from, 'Envie a mensagem que você quer disparar');

    userMessage = {
      text: message.body,
      date: new Date(),
    };

    // Adicionando ultima mensagem no array
    lastConversation.push(userMessage);
    await UserMongo.findOneAndUpdate({ _id: user._id }, { lastConversation });
    return;
  }

  // Para mensagens de imagem
  if (message.body === '2') {
    clientBot.sendText(message.from, 'Envie a imagem que você quer disparar');

    userMessage = {
      text: message.body,
      date: new Date(),
    };

    // Adicionando ultima mensagem no array
    lastConversation.push(userMessage);
    await UserMongo.findOneAndUpdate({ _id: user._id }, { lastConversation });
    return;
  }

  if (lastMessage.text === '1') {
    userMessage = {
      text: message.body,
      date: new Date(),
    };

    // Adicionando ultima mensagem no array
    lastConversation.push(userMessage);
    await UserMongo.findOneAndUpdate({ _id: user._id }, { lastConversation });

    await startTextTransmition(user, message.body);

    clientBot.sendText(
      message.from,
      'O envio começará em breve. Por favor, certifique-se que seu celular não esteja em modo de economia de bateria.'
    );
  }
}

export default async function toDoOnMessage(message, clientBot) {
  const { chatId } = message;

  let celOwner = chatId.split('@');
  celOwner = celOwner[0];

  const userExists = await UserMongo.findById(celOwner).lean();

  if (userExists) {
    await interpretMessage(userExists, message, clientBot);
  }
}
