import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserProvision } from 'src/types/ProvisionStorageType';
import { supabase } from 'src/config/supabase.config';
import { redisClient } from 'src/config/redis.config';

@Injectable()
export class ProvisionService {
  healthcheck(): string {
    return 'The provision endpoints are working!';
  }

  async storeCredentials(params: UserProvision): Promise<any> {
    try {
      // Define the table name where you want to store data
      const tableName = 'quicknodeuser';

      const {
        'quicknode-id': quicknode_id,
        referers,
        contract_addresses,
        chain,
        network,
        plan,
      } = params;

      await redisClient.set(`${quicknode_id}`, 'expiry');

      // Insert the data object into the specified table
      const { error } = await supabase.from(tableName).insert([
        {
          quicknode_id,
          referers,
          contract_addresses,
          chain,
          network,
          plan,
        },
      ]);

      if (error) {
        if (
          error.message.includes(
            'duplicate key value violates unique constraint',
          )
        ) {
          throw new HttpException(
            {
              status: 'error',
              message:
                'Duplicate entry. The provided quicknode ID already exists.',
            },
            HttpStatus.CONFLICT,
          );
        } else {
          throw new HttpException(
            {
              status: 'error',
              message: 'An error occurred while storing data.',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }

      if (!error) {
        return {
          status: 'success', // or "error"
          'dashboard-url': 'http://auth.yoursite.com/access/jwt',
          'access-url': 'http://api.yoursite.com/some-token-here',
        };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
