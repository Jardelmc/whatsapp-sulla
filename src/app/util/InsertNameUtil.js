/* eslint-disable no-restricted-syntax */
function getFristName(name) {
  const fristName = name.split(' ');
  const tempName = fristName[0].toLowerCase();
  const nameCapitalized = tempName.charAt(0).toUpperCase() + tempName.slice(1);

  return nameCapitalized;
}

function convertMessage(name, message) {
  const messageWithName = message.replace('NOME', getFristName(name));
  //  messageWithName = messageWithName.replace(/\\n/gi, '\n');
  return messageWithName;
}

// Função reponsável por inserir o nome do contato na mensagem e preparar o payload para envio
export default function insertNameInMessage(contacts, message) {
  const payload = [];

  for (const people of contacts) {
    const formattedCelAndMessage = {
      cel: people.cel,
      textMessage: convertMessage(people.name, message),
    };

    payload.push(formattedCelAndMessage);
  }

  return payload;
}
