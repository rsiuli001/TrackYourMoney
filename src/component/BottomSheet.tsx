import COLOR from '@assets/color';
import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { Animated, Dimensions, Modal, PanResponder, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonWrapper from './ButtonWrapper';

export interface BottomSheetProps {
  visible: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

const BottomSheet: FC<BottomSheetProps> = ({ visible, onRequestClose, children }): JSX.Element => {
  const panY = useRef(new Animated.Value(Dimensions.get('screen').height)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false
      }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 2) {
          return onDismiss();
        }
        return resetPositionAnim.start();
      }
    })
  ).current;

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true
  });

  useEffect(() => {
    resetPositionAnim.start();
  }, [resetPositionAnim]);

  const closeAnim = Animated.timing(panY, {
    toValue: Dimensions.get('screen').height,
    duration: 500,
    useNativeDriver: true
  });

  const onDismiss = (): void => {
    closeAnim.start(() => onRequestClose());
  };

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1]
  });

  return (
    <Modal animationType={'fade'} visible={visible} transparent onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.container, { transform: [{ translateY }] }]}
          {...panResponder.panHandlers}
        >
          <ButtonWrapper style={styles.header} onPress={onDismiss}>
            <Ionicons name={'close-sharp'} size={24} color={COLOR.black} />
          </ButtonWrapper>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end'
    // backgroundColor: COLOR.black
  },
  header: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    // marginRight: 10,
    paddingBottom: 10,
    paddingRight: 10
  },
  container: {
    // backgroundColor: COLOR.black,
    backgroundColor: COLOR.grey,
    paddingTop: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    // paddingBottom: 15
  }
});

export default BottomSheet;
