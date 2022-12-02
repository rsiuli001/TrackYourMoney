import { MMKV } from 'react-native-mmkv';

import moment from 'moment';

const prefix = 'cache';
const expiryInMinutes = 5;

const storage = new MMKV();

export const store = (key: string, value: any) => {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  } finally {
    console.log('store successful');
  }
};

export const get = (key: string) => {
  try {
    const value = storage.getString(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.log(error);
  }
};

export const remove = (key: string) => {
  try {
    storage.delete(key);
  } catch (e) {
    console.log(e);
  }
};

export const storeTemp = (key: string, value: any) => {
  try {
    const obj = {
      value,
      timestamp: new Date(),
    };
    storage.set(prefix + key, JSON.stringify(obj));
  } catch (error) {
    console.log('error storing storage data storeTemp', error);
  } finally {
    //console.log(`storeTemp successful`);
  }
};

export const isExpired = (item: any) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestamp);
  return now.diff(storedTime, 'minutes') > expiryInMinutes;
};

export const getTemp = (key: string) => {
  try {
    const data = storage.getString(prefix + key);
    const item = JSON.parse(data!);
    if (!item) {
      return null;
    }
    if (isExpired(item)) {
      console.log('isExpired');
      storage.delete(prefix + key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.log('error getting storage data getTemp', error);
  } finally {
    //console.log(`getTemp Successful`);
  }
};
