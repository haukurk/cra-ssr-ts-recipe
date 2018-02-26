
import { merge } from 'lodash';

let store = {};

export function saveStoreData(storeData: any) {
  // Here you could delete some data that should net be stored (specific to the current request/user)

  store = merge(store, storeData);
}

export function getStoreData() {
  return Object.assign({}, store);
}
