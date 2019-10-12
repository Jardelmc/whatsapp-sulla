/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
export function start(client) {
  client.onMessage(message => {
    if (message.body === 'Hi') {
      client.sendText(message.from, '👋 Hello from sulla!');
    }
  });
}

export async function getAllContacts(client) {
  const contacts = await client.getAllContacts();
  console.log(contacts);
}

export async function sendText(client, payload) {
  let i = 0;
  for (const data of payload) {
    await client.sendText(data.cel, data.message);
    console.log(`Send to ${data.message}`);
    if (i === 10) {
      break;
    }
    i += 1;
  }
}
