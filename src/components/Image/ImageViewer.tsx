import React, { FC, memo } from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import RNImageViewer from 'react-native-image-zoom-viewer';
import { images } from 'src/assets';
import { moderateScale } from 'src/utils';

type Props = {
  imageUrls: { url: string }[];
  visible: boolean;
  onClose: () => void;
  index?: number;
};

const ImageViewer: FC<Props> = ({ imageUrls, visible, onClose, index }) => {
  const closeModal = () => {
    onClose();
  };

  const renderImageViewerHeader = () => {
    return (
      <View style={styles.imagesHeader}>
        <TouchableOpacity style={styles.closeContainer} onPress={closeModal}>
          <Image style={styles.closeIcon} source={images.close} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal presentationStyle={'overFullScreen'} onRequestClose={closeModal} transparent={true} visible={visible}>
      <View style={styles.imageContainer}>
        {renderImageViewerHeader()}
        <RNImageViewer
          onSwipeDown={closeModal}
          renderIndicator={() => <ActivityIndicator />}
          imageUrls={imageUrls}
          enableSwipeDown={true}
          index={index}
        />
      </View>
      <View style={styles.imagesFooter} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  imagesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: moderateScale(20),
  },
  imageContainer: {
    flex: 1,
    paddingTop: moderateScale(40),
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingBottom: 60,
  },
  closeContainer: {
    backgroundColor: 'rgba(19, 19, 19, 0.8)',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(9),
    borderRadius: moderateScale(12),
  },
  closeIcon: {
    tintColor: '#D9D9D9',
  },
  imagesFooter: {
    position: 'absolute',
    backgroundColor: 'black',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
  },
});

export default memo(ImageViewer);
