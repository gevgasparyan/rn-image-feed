import React, { FC, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageRow } from 'src/components';
import { routes } from 'src/navigation';
import { FeedApi } from 'src/services';
import { IPhoto, NavProps } from 'src/types';
import { AsyncStorageUtils, moderateScale } from 'src/utils';

const EventsScreen: FC<NavProps> = ({ navigation }) => {
  const [data, setData] = useState<IPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const pageRef = useRef(1);
  const totalRef = useRef(0);

  const getFeed = async (loadMore: boolean, page: number) => {
    try {
      const res = await FeedApi.getFeed({
        per_page: 10,
        page,
      });
      const feed = !loadMore ? res.photos : [...data, ...res.photos];
      /**
       * Cache feed data
       */
      AsyncStorageUtils.setFeedData(feed);
      setData(feed);
      totalRef.current = res.total_results;
    } catch (error) {
      /**
       * Read from the cache
       */
      setCacheData();
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadData = async () => {
      await setCacheData();
      getFeed(false, pageRef.current);
    };
    loadData();
  }, []);

  const setCacheData = async () => {
    const cachedFeed = await AsyncStorageUtils.getFeedData();
    setData(cachedFeed);
  };

  const handleInfiniteScroll = async () => {
    if (data.length >= totalRef.current) {
      return;
    }
    pageRef.current += 1;
    getFeed(true, pageRef.current);
  };

  const handlePress = (item: IPhoto) => {
    navigation.navigate(routes.imageDetails, { item });
  };

  const renderItem = ({ item }: { item: IPhoto }) => {
    return <ImageRow item={item} onPress={() => handlePress(item)} />;
  };

  const keyExtractor = (item: IPhoto) => `${item.id}`;

  return (
    <SafeAreaView style={styles.container} edges={{ top: 'off', bottom: 'additive' }}>
      <FlatList
        data={data}
        refreshing={loading}
        onRefresh={() => getFeed(false, 1)}
        style={styles.container}
        contentContainerStyle={styles.content}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleInfiniteScroll}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(10),
  },
});

export default EventsScreen;
