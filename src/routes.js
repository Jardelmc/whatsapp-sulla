import UserController from './app/controllers/UserController';
import CreateInstanceController from './app/controllers/CreateInstanceController';

import BaseContactsMongo from './app/schemas/BaseContactsMongo';

// import Start from './indexa';
// import { getCsvInfos } from './app/csv_resource/CsvCaseTaps';

const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => {
  const migration = [];

  for (let i = 0; i < 50; i++) {
    const data = {
      cel: '5522996139321',
      name: 'Jardel',
    };

    migration.push(data);
  }
  const newRegister = { _id: '5522996139321', contacts: migration };
  BaseContactsMongo.create(newRegister);
  return res.json({ m: 'ok' });
});
/*
routes.get('/sendList', Start.sendManyMessages);

routes.get('/csv', getCsvInfos);
*/
// Rota para criar novo usuário
routes.post('/user/new', UserController.store);

// Rota para iniciar bot
routes.post('/init', CreateInstanceController.init);

export default routes;
