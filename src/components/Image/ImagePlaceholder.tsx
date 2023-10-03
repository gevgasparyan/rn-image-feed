import React, { FC } from 'react';
import { Image, ImageProps, ImageSourcePropType, StyleSheet, TouchableOpacity } from 'react-native';
import { images } from 'src/assets';
import { palette } from 'src/constants';
import { moderateScale } from 'src/utils';

type Props = {
  source?: ImageSourcePropType;
  onPress?: () => void;
} & ImageProps;

const ImagePlaceholder: FC<Props> = ({ source, style, onPress, ...rest }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} disabled={!onPress} onPress={onPress} style={[styles.container, style]}>
      <Image style={styles.backgroundImg} source={images.placeholder} resizeMode="contain" />
      <Image source={source} resizeMode="cover" style={styles.img} {...rest} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: palette.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backgroundImg: {
    position: 'absolute',
    alignSelf: 'center',
    width: moderateScale(52),
    height: moderateScale(30),
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default ImagePlaceholder;
