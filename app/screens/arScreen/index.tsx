import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, BackHandler, Image } from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-community/async-storage';

import { StackNavigationProp } from '@react-navigation/stack';
import { SplashScreen, StackParamList } from '../../../App';
import { TouchableOpacity } from 'react-native-gesture-handler';
import constants from '../../utils/constant';
import ARScene from './ARScene';

import {
  ViroARSceneNavigator,
  ViroARTrackingTargets,
} from '@viro-community/react-viro';
type ARScreenRouteProps = RouteProp<StackParamList, 'ARScreen'>;
type ARScreenNavigationProps = StackNavigationProp<StackParamList, 'ARScreen'>;
type ARScreenProps = {
  route: ARScreenRouteProps,
  navigation: ARScreenNavigationProps,
};
const ARScreen = ({ route, navigation }: ARScreenProps) => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [loadingFailed, setLoadingFailed] = useState<Boolean>(false);
  const [showHdr, setShowHdr] = useState<Boolean>(false);
  const [showAuto, setShowAuto] = useState<Boolean>(false);

  const { book, bookDescription } = route.params;
  const loadConfigurationCallback = (errors?: any, result?: any) => {
    if(errors) {
      console.log(errors)
    } 
    if (result) {
      result.forEach(res=>{
        switch (res[0]) {
          case constants.HDR_KEY:
            setShowHdr(JSON.parse(res[1]));
            break;
          case constants.AF_KEY:
            setShowAuto(JSON.parse(res[1]));
            break;
        }
      })
    }
  }
  const loadConfiguration = () => {
    AsyncStorage.multiGet([constants.HDR_KEY, constants.AF_KEY], loadConfigurationCallback);
  }
  const initializeAR = () => {
    loadConfiguration();
    setLoading(true);
    const targets = {};
    console.log(bookDescription)
    bookDescription.forEach(phrase => {
      targets[`trigger_${phrase.id}`] = {
        source: { uri: constants.baseURI(phrase.trigger) },
        orientation: 'Up',
        physicalWidth: 0.1, // real world width in meters
      };
    });
    ViroARTrackingTargets.createTargets(targets);
    setLoading(false);
    return () => {
      bookDescription.forEach(phrase => {
        ViroARTrackingTargets.deleteTarget(`trigger_${phrase.id}`);
      });
    }
  }
  useFocusEffect(
    useCallback(
      () => {
        const onBackPress = () => {
          if (!loading) {
            bookDescription.forEach(phrase => {
              ViroARTrackingTargets.deleteTarget(`trigger_${phrase.id}`);
            });
            setLoading(true);
            setTimeout(onBackPress, 1000);
            return true;
          } else {
            // return false;
          }
        }
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);

      },
      [bookDescription, loading],
    )
  );
  useEffect(initializeAR, []);
  if (loading) {
    return <SplashScreen />;
  }
  if (loadingFailed) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={styles.emptyContainerText}>
          Failed to load AR
          </Text>
        <TouchableOpacity onPress={initializeAR}>
          <Text style={styles.retryButton}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const onPressHdr = () => {
    AsyncStorage.setItem(constants.HDR_KEY, JSON.stringify(!showHdr));
    setShowHdr(!showHdr);
  }
  const onPressAutoFocus = () => {
    AsyncStorage.setItem(constants.AF_KEY, JSON.stringify(!showAuto));
    setShowAuto(!showAuto);
  }
  return (
    <>
      <View
        style={{
          backgroundColor: 'black',
          height: 5,
          width: '100%',
          flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity onPress={onPressHdr}>
          {showHdr ? (
            <Image
              source={require('../../assests/hdr2.png')}
              style={styles.imageStyle}
            />
          ) : (
            <Image
              source={require('../../assests/hdr-gray.png')}
              style={styles.imageStyle}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressAutoFocus}>
          {showAuto ? (
            <Image
              source={require('../../assests/auto-focus.png')}
              style={styles.imageStyle}
            />
          ) : (
            <Image
              source={require('../../assests/auto-focus-gray.png')}
              style={styles.imageStyle}
            />
          )}
        </TouchableOpacity>
      </View>
      <ViroARSceneNavigator
        apiKey="API_KEY_HERE"
        initialScene={{
          scene: ARScene,
          passProps: {
            book,
            bookDescription,
            showAuto,
            showHdr,
          },
        }}
      />
    </>
  );
}
const styles = StyleSheet.create({
  imageStyle: {
    margin: 10,
    height: 30,
    width: 30,
    marginTop: 20,
  },
  tintImageStyle: {
    margin: 10,
    height: 30,
    width: 30,
    marginTop: 20,
    tintColor: 'gray',
  },
  container: {
    flex: 1,
    padding: 0,
  },
  bookImage: {
    width: 135,
    height: 200,
    // borderRadius: 10,
    borderColor: constants.WHITE,
    backgroundColor: 'gray',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  bookLabel: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  emptyContainer: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainerText: {
    fontSize: 48,
    fontWeight: '100',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    color: constants.DARK_COLOR,
    textTransform: 'uppercase',
    textDecorationStyle: 'solid',
    textDecorationColor: constants.DARK_COLOR,
    textDecorationLine: 'underline',
  },
  contentContainer: {
    padding: 12,
    flex: 1,
    maxHeight: 200,
    paddingBottom: 50,
  },
  cardContainer: {
    padding: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: constants.WHITE,
    flexDirection: 'row',
    paddingLeft: 0,
    paddingRight: 0,
    paddingVertical: 0,
    margin: 0,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bookDetail: {
    backgroundColor: '#2089dc',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'flex-start',
    height: 200,
    width: 200,
  },
  bookTitle: {
    // fontWeight: 'bold',
    fontSize: 14,
    padding: 0,
    marginBottom: 8,
  },
  button: {
    width: 300,
    backgroundColor: constants.DARK_COLOR,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: constants.WHITE,
    textAlign: 'center',
  },
});

export default ARScreen;
