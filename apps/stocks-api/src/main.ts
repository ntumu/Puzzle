/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';

import redis from 'redis';
import { environment } from './environments/environment';
import * as request from 'request';

const getData = (client, key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, result) => {
      if (err || !result) {
        resolve(null);
      } else {
        resolve(JSON.parse(result));
      }
    })
  });
}


const fetchData = (symbol, period) => {
  return new Promise((resolve) => {
    request
      .get(`${environment.apiURL}/beta/stock/${symbol}/chart/${period
        }?token=${environment.apiKey}`, function (error, response, body) {
          resolve(JSON.parse(body));
        })
  });
}

const postData = (client, key, value) => {
  client.setex(key, 3600, JSON.stringify(value));
}
const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost',
    "routes": {
      "cors": {
        "origin": ["*"]       
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return {
        hello: 'world'
      };
    }
  });

  const redisClient = redis.createClient(
    {
      host: 'localhost',
      port: 6379,
    }
  );
  redisClient.on("error", function (err) {
    console.error("Redis error.", err);
  });

  server.route({
    method: 'GET',
    path: '/sandbox',
    handler: async (request, h) => {
      if (request.query.symbol && request.query.period) {
        const urlstring = `${request.query.symbol}${request.query.period}`;
        const stocks = await getData(redisClient, urlstring);
        if (!stocks) {
          const response = await fetchData(request.query.symbol, request.query.period);
          postData(redisClient, urlstring, response);
          return response;
        }
        return stocks;
      }
      return { msg: 'Invalid query parameters' };
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
