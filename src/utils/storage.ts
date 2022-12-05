import { MMKV } from 'react-native-mmkv';
import moment from 'moment';

const prefix = 'cache';
const expiryInMinutes = 5;
const storage = new MMKV();

export const storeMMKVData = (key: string, value: any) => {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    // console.log(error);
  } finally {
    // console.log('store successful');
  }
};

export const getMMKVData = (key: string): string | undefined => {
  try {
    return storage.getString(key);
  } catch (e) {
    return undefined;
  }
};

export const doesExist = (key: string): boolean => {
  return storage.contains(key);
};

export const removeMMKVData = (key: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      storage.delete(key);
      resolve();
    } catch (err) {
      reject();
    }
  });
};

export const storeTempMMKVData = (key: string, value: any) => {
  try {
    const obj = {
      value,
      timestamp: new Date()
    };
    storage.set(prefix + key, JSON.stringify(obj));
  } catch (error) {
    // console.log('error storing storage data storeTemp', error);
  } finally {
    //console.log(`storeTemp successful`);
  }
};

export const isMMKVDataExpired = (item: any) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestamp);
  return now.diff(storedTime, 'minutes') > expiryInMinutes;
};

export const getTempMMKVData = (key: string) => {
  try {
    const data = storage.getString(prefix + key);
    const item = JSON.parse(data!);
    if (!item) {
      return null;
    }
    if (isMMKVDataExpired(item)) {
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

export const clearMMKVStorage = (): void => {
  storage.clearAll();
};
