import 'isomorphic-fetch';
import chalk from 'chalk';
import Client from '../../';

/* eslint-disable */
class Demo {
  constructor() {
    const env = 'staging';
    const onRequest = (url, options) => {
      if (this.testAccessToken) {
        options.headers.AUTHORIZATION = `OAuth ${this.testAccessToken}`;
        options.headers['X-USER-ACCESS-TOKEN'] = this.testAccessToken;
      }
      console.log(chalk.green('>>>onRequest'));
      console.log(chalk.green('----------------------------------------------------------------'));
      console.log(chalk.green(url));
      console.log(chalk.green(JSON.stringify(options, null, 2)));
      console.log(chalk.green('----------------------------------------------------------------'));
      console.log('\n');

      return { url, options };
    };
    const onSuccess = (response) => {
      console.log(chalk.green('>>>onSuccess'));
      console.log(chalk.green('----------------------------------------------------------------'));
      console.log(chalk.green(JSON.stringify(response, null, 2)));
      console.log(chalk.green('----------------------------------------------------------------'));
      console.log('\n');
    };
    const onError = (error) => {
      console.log(chalk.red(JSON.stringify(error, null, 2)));
      throw error;
    };
    this.client = new Client({
      onRequest, onSuccess, onError, camelize: false,
    }, env);

    this.testAccessToken = '';
    this.testStoreId = 4964;

    this.test = this.test.bind(this);
    this.login = this.login.bind(this);
    this.addTips = this.addTips.bind(this);
    this.voidTransactions = this.voidTransactions.bind(this);
  }
  async login() {
    try {
      const data = await this.client.main().login({
        username: 'jerry.luo@bindo.com',
        password: 'lh86691845',
      });
      this.testAccessToken = data.access_token;
    } catch (error) {
      // ignore
      console.log(chalk.red(error.message));
    }
  }
  async test() {
    try {
      await this.login();

      let result = {};

      result = await this.client.gateway().store(this.testStoreId).orderCorrespondences.list();
      console.log(chalk.yellow(JSON.stringify(result, null, 2)));

      // const testCustomerId = 18590057;

      // result = await this.client.analytics().store(this.testStoreId).customer(testCustomerId).highlights();
      // console.log(chalk.yellow(JSON.stringify(result, null, 2)));

      // result = await this.client.analytics().store(this.testStoreId).customer(testCustomerId).rewardStatus();
      // console.log(chalk.yellow(JSON.stringify(result, null, 2)));

      // result = await this.client.main().store(this.testStoreId).module();
      // console.log(chalk.yellow(JSON.stringify(result, null, 2)));

      // result = await this.client.main().store(this.testStoreId).timeSegments.all();
      // console.log(chalk.yellow(JSON.stringify(result, null, 2)));
    } catch (error) {
      console.log(error);
      // ignore
      console.log(chalk.red(error.message));
    }

  }
  async addTips() {
    let result = await this.login();

    // 只能使用一次
    const orderNumber = '201711061920054121081994';
    // 只能使用一次
    const transactionId = '27479207';

    const storeId = 5857;
    const data = {
      transaction: {
        tips_amount: 3,
      },
    };

    result = await this.client.gateway().store(storeId).invoice(orderNumber).transaction(transactionId).addTips(data);
    console.log(result);
  }
  async voidTransactions() {
    let result = await this.login();

    const orderNumber = '201711061606149332399965';
    const transactionId = '27479015';
    const storeId = 5696;

    result = await this.client.gateway().store(storeId).invoice(orderNumber).transaction(transactionId).void();

    // voidTransactions
    console.log(result);
  }

  async getOrder() {
    let result = await this.login();
    const orderNumber = '201711081756178181062851';
    const storeId = 5857;

    const params = {
      includes_voided: true,
    };
    result = await this.client.gateway().store(storeId).invoice(orderNumber).get(params);

    // voidTransactions
    console.log(result);
  }

  async getAllEmailTemplates() {
    let result = await this.login();

    const storeId = 382;

    result = await this.client.gateway().store(storeId).emailTemplates.all();

    // emailTemplates
    console.log(result);
  }
}

new Demo().test();
/* eslint-enable */

