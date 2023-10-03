import React, { FC, memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { palette } from 'src/constants';
import { IPhoto } from 'src/types';
import { moderateScale } from 'src/utils';

import { ImagePlaceholder } from '../Image';

type Props = {
  item: IPhoto;
  onPress?: () => void;
};

const EventRow: FC<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <ImagePlaceholder source={{ uri: item.src.medium }} resizeMode="cover" style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3}>
          {item.photographer}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: moderateScale(216),
    backgroundColor: palette.WHITE,
    borderRadius: moderateScale(8),
    marginVertical: moderateScale(6),
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: moderateScale(12),
    color: palette.TEXT_MAIN,
    padding: moderateScale(10),
  },
  content: {
    justifyContent: 'space-between',
  },
  image: {
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    height: moderateScale(216),
  },
  imageContainer: {
    flex: 1,
  },
});

export default memo(EventRow);
