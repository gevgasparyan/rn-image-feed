import React, { FC, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImagePlaceholder, ImageViewer } from 'src/components';
import { palette } from 'src/constants';
import { FeedApi } from 'src/services';
import { IPhoto, NavProps } from 'src/types';
import { moderateScale } from 'src/utils';

const image_width = Dimensions.get('screen').width - 16;

const ImageFeedDetailsScreen: FC<NavProps> = ({ route }) => {
  const initialItem: IPhoto = route?.params?.item;
  const [photoItem, setPhotoItem] = useState<IPhoto>(initialItem);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getPhotoDetails = async () => {
      try {
        const res = await FeedApi.getPhotoById(initialItem.id);
        setPhotoItem(res);
      } catch (error) {
        console.log('Failed to fetch photo by id', error);
      }
      setLoading(false);
    };
    getPhotoDetails();
  }, [initialItem]);

  const imageStyle = useMemo(() => {
    const ratio = photoItem.width / image_width;
    return {
      width: image_width,
      height: photoItem.height / ratio,
    };
  }, [photoItem]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator style={styles.loading} />
      </SafeAreaView>
    );
  }

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{photoItem.photographer}</Text>
          </View>
          <ImagePlaceholder
            onPress={() => setModalVisible(true)}
            style={imageStyle}
            resizeMode="contain"
            source={{ uri: photoItem.src.large }}
          />
          <Text style={styles.contentTxt}>{photoItem.alt}</Text>
        </ScrollView>
      </View>
      <ImageViewer visible={modalVisible} onClose={closeModal} imageUrls={[{ url: photoItem.src.large }]} />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  container: {
    flex: 1,
    paddingTop: moderateScale(16),
    paddingHorizontal: moderateScale(8),
  },
  content: {
    flexGrow: 1,
    backgroundColor: palette.WHITE,
    paddingBottom: moderateScale(60),
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },
  header: {
    padding: moderateScale(10),
  },
  loading: {
    marginTop: moderateScale(20),
  },
  title: {
    fontWeight: 'bold',
    fontSize: moderateScale(18),
    lineHeight: moderateScale(24),
    color: palette.TEXT_MAIN,
  },
  contentTxt: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(24),
    color: palette.TEXT_MAIN,
    padding: moderateScale(8),
  },
});

export default ImageFeedDetailsScreen;
