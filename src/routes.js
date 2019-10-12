import Start from './indexa';
import { getCsvInfos } from './app/csv_resource/CsvCaseTaps';

const { Router } = require('express');

const routes = new Router();

routes.get('/', Start.init);
routes.get('/sendList', Start.sendManyMessages);

routes.get('/csv', getCsvInfos);

export default routes;
