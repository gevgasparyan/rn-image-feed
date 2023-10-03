import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPhoto } from 'src/types';

const FEED_DATA = '@feed_data';

class AsyncStorageUtils {
  setFeedData = (data: IPhoto[]): Promise<void> => {
    return AsyncStorage.setItem(FEED_DATA, JSON.stringify(data));
  };

  getFeedData = async (): Promise<IPhoto[]> => {
    const feedData = await AsyncStorage.getItem(FEED_DATA);
    return feedData ? JSON.parse(feedData) : [];
  };
}

export default new AsyncStorageUtils();
