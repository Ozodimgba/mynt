import { Injectable } from '@nestjs/common';
import { UserProvision } from 'src/types/ProvisionStorageType';
import { supabase } from 'src/config/supabase.config';

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
        quicknode_id,
        referers,
        contract_addresses,
        chain,
        network,
        plan,
      } = params;

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
        return {
          status: 'error',
          message: error,
        };
      }

      return {
        status: 'success', // or "error"
        'dashboard-url': 'http://auth.yoursite.com/access/jwt',
        'access-url': 'http://api.yoursite.com/some-token-here',
      };
    } catch (error) {
      throw new Error(`Error storing data: ${error.message}`);
    }
  }
}
