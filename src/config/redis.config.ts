import { createClient } from '@redis/client';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.REDIS_URL;

export const redisClient = createClient({
  url: url,
});

export async function createRedis() {
  await redisClient.connect();

  //   await redisClient.set('client', 'value');
  //   const value = await redisClient.get('client');
  //   console.log(value);
  //   return value;
}

createRedis();
