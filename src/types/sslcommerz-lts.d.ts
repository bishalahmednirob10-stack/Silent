declare module "sslcommerz-lts" {
  type SSLCommerzResponse = {
    status?: string;
    GatewayPageURL?: string;
    failedreason?: string;
    [key: string]: unknown;
  };

  export default class SSLCommerzPayment {
    constructor(storeId: string, storePassword: string, isLive: boolean);
    init(data: Record<string, unknown>): Promise<SSLCommerzResponse>;
  }
}
