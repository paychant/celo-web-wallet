import apiService from '../../service/api.service';
import celoService from '../../service/celo.service';


// actions
export const SEND_GOLD_TOKEN = 'sendGoldToken';
export const FETCH_GOLD_PRICE = 'fetchGoldTokenPrice';
export const SEND_STABLE_TOKEN = 'sendStableToken';
export const FETCH_STABLE_PRICE = 'fetchStableTokenPrice';
export const FETCH_GOLD_BALANCE = 'fetchGoldTokenBalance';
export const SWAP_STABLE_TO_GOLD = 'swapStableToGold';
export const FETCH_STABLE_BALANCE = 'fetchStableTokenBalance';
export const CLEAR_ASSETS_BALANCE = 'clearAssetsBalance';
export const CONVERT_STABLE_TO_GOLD = 'convertStableToGold';
export const EXTRACT_ADDRESS_TRANSACTIONS = 'extractAddressTransactions';

// mutations
export const RESET_BALANCE = 'resetTokenBalance';
export const SET_GOLD_PRICE = 'setGoldPrice';
export const SET_STABLE_PRICE = 'setStablePrice';
export const SET_GOLD_BALANCE = 'setGoldTokenBalance';
export const SET_STABLE_BALANCE = 'setStableTokenBalance';


const state = {
   gold: {
      done: false,
      price: 0.00,
      balance: 0,
      transactions: []
   },
   stable: {
      done: false,
      price: 0.0,
      balance: 0,
      transactions: []
   }
};

const getters = {
   gold: (state) => {
      return state.gold;
   },
   stable: (state) => {
      return state.stable;
   }
};

const mutations = {
   [SET_GOLD_BALANCE](state, balance) {
      state.gold['balance'] = balance;
      state.gold['done'] = true;
   },
   [SET_STABLE_BALANCE](state, balance) {
      state.stable['balance'] = balance;
      state.stable['done'] = true;
   },
   [RESET_BALANCE](state) {
      state.gold['balance'] = 0;
      state.gold['done'] = false;
      state.stable['balance'] = 0;
      state.stable['done'] = false;
   },
   [SET_GOLD_PRICE](state, price) {
      state.gold['price'] = price;
   },
   [SET_STABLE_PRICE](state, price) {
      state.stable['price'] = price;
   }
};

const actions = {
   [FETCH_GOLD_BALANCE](context) {
      return new Promise((resolve, reject) => {
         let { address } = context.getters.wallet;
         celoService.getGoldTokenBalance(address).then((bal) => {
            context.commit(SET_GOLD_BALANCE, bal);
            resolve(true);
         }).catch((err) => {
            reject(`[fetchGoldBalance] => ${err}`);
         })
      })
   },
   [FETCH_STABLE_BALANCE](context) {
      return new Promise((resolve, reject) => {
         let { address } = context.getters.wallet;
         celoService.getStableTokenBalance(address).then((bal) => {
            context.commit(SET_STABLE_BALANCE, bal);
            resolve(true);
         }).catch((err) => {
            reject(`[fetchStableBalance] => ${err}`);
         })
      })
   },
   [SEND_GOLD_TOKEN](context, { amount, receiver }) {
      return new Promise((resolve, reject) => {
         let data = {
            amount: parseFloat(amount),
            sender: context.getters.wallet.address,
            receiver: receiver,
            sender_pk: context.getters.wallet.private_key
         };
         celoService.sendGoldToken(data).then((res) => {
            resolve(res);
         }).catch((err) => {
            reject(`[sendGoldToken] => ${err}`);
         })
      });
   },
   [SEND_STABLE_TOKEN](context, { amount, receiver }) {
      return new Promise((resolve, reject) => {
         let data = {
            amount: parseFloat(amount),
            sender: context.getters.wallet.address,
            receiver: receiver,
            sender_pk: context.getters.wallet.private_key
         };
         celoService.sendStableToken(data).then((res) => {
            resolve(res);
         }).catch((err) => {
            reject(`[sendStableToken] => ${err}`);
         })
      });
   },
   [SWAP_STABLE_TO_GOLD](context, amount) {
      return new Promise((resolve, reject) => {
         let data = {
            amount: amount,
            sender: context.getters.wallet.address,
            sender_pk: context.getters.wallet.private_key
         };
         celoService.swapStableToGoldToken(data).then((res) => {
            resolve(res);
         }).catch((err) => {
            reject(`[swapStableToGoldToken] => ${err}`);
         });
      });
   },
   [CLEAR_ASSETS_BALANCE](context) {
      context.commit(RESET_BALANCE);
   },
   [FETCH_STABLE_PRICE](context) {
      return new Promise((resolve, reject) => {
         apiService.setBaseUrl('https://api.coingecko.com/api/v3');
         apiService.getApi('/simple/price', {ids: 'celo-dollar', vs_currencies: 'usd'}).then((res) => {
            context.commit(SET_STABLE_PRICE, res['celo-dollar'].usd);
         }).catch((e) => {
            reject(`[fetchGoldPrice] => ${e}`);
         });
      });
   },
   [FETCH_GOLD_PRICE](context) {
      return new Promise((resolve, reject) => {
         apiService.setBaseUrl('https://api.coingecko.com/api/v3');
         apiService.getApi('/simple/price', {ids: 'celo', vs_currencies: 'usd'}).then((res) => {
            console.log(res);
            context.commit(SET_GOLD_PRICE, res['celo'].usd);
         }).catch((e) => {
            reject(`[fetchGoldPrice] => ${e}`);
         });
      });
   },
   [CONVERT_STABLE_TO_GOLD](context, amount) {
      return new Promise((resolve, reject) => {
         celoService.convertStableToGold(amount).then((cvt) => {
            resolve(cvt);
         }).catch((err) => {
            reject(`[convertStableToGoldToken] => ${err}`);
         })
      });
   },
   [EXTRACT_ADDRESS_TRANSACTIONS]() {
      // return new Promise((resolve, reject) => {
      //    celoService.extractTransactions().then((res) => {
      //       resolve(res);
      //    }).catch((err) => {
      //       reject(`[extractAddressTransactions] => ${err}`);
      //    })
      // });
   }
};

export default {
   state,
   getters,
   mutations,
   actions
}