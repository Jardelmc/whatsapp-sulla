import UserController from './app/controllers/UserController';
import CreateInstanceController from './app/controllers/CreateInstanceController';

const { Router } = require('express');

const routes = new Router();

// Rota para criar novo usuário
routes.post('/user/new', UserController.store);

// Rota para iniciar bot
routes.post('/init', CreateInstanceController.init);

export default routes;

/**
 *
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

 */
