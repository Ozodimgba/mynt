import { createClient } from '@redis/client';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.REDIS_URL;

export const redisClient = createClient({
  url: url,
});

(async () => {
  redisClient.on('error', function (err) {
    throw err;
  });

  await redisClient.connect();

  await redisClient.set('foo', 'bar');
})();
