export interface UserProvision {
  quicknode_id: string;
  'endpoint-id': string;
  'wss-url': string;
  'http-url': string;
  referers: string[] | null;
  contract_addresses: string[];
  chain: string;
  network: string;
  plan: string;
}
