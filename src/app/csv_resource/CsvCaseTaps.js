/* eslint-disable import/prefer-default-export */
import XLSX from 'xlsx';
import { resolve } from 'path';
import axios from 'axios';

const file = resolve(__dirname, 'data.xlsx');

function getFristName(name) {
  const fristName = name.split(' ');
  const tempName = fristName[0].toLowerCase();
  const nameCapitalized = tempName.charAt(0).toUpperCase() + tempName.slice(1);

  return nameCapitalized;
}

function insertNameInMessage(name, message) {
  let messageWithName = message.replace('NOME', getFristName(name));
  messageWithName = messageWithName.replace(/\\n/gi, '\n');
  console.log(messageWithName);
  return messageWithName;
}

function formatCel(cel) {
  if (typeof cel === 'string') {
    cel = cel.replace('(', '');
    cel = cel.replace(')', '');
    cel = cel.replace('-', '');
    cel = cel.replace(' ', '');
  }
  cel = String(cel);

  let validCel;

  if (cel.length === 13) {
    validCel = `${cel}`;
  }

  if (cel.length === 11) {
    validCel = `55${cel}`;
  }

  if (cel.length === 9) {
    validCel = `5527${cel}`;
  }

  if (validCel) {
    return validCel;
  }
  return false;
}

export async function getCsvInfos(req, res) {
  const { message } = req.body;

  const sheetUploaded = await XLSX.readFile(file);

  const dataConvertedToJson = await XLSX.utils.sheet_to_json(
    sheetUploaded.Sheets.data,
    {
      range: 0,
    }
  );

  const allUsersFormatted = [];

  dataConvertedToJson.forEach(user => {
    const formattedMessage = insertNameInMessage(user['First name'], message);

    const formattedCel = formatCel(user.Phone);

    if (formattedCel) {
      const object = { cel: formattedCel, textMessage: formattedMessage };
      allUsersFormatted.push(object);
    }
  });

  const payload = allUsersFormatted;

  await axios.post('http://localhost:3335/driver', payload);

  return res.json(allUsersFormatted);
}
