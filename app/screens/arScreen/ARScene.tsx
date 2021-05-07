import React from 'react';
import {Linking, StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroARImageMarker,
  ViroImage,
  ViroVideo,
} from '@viro-community/react-viro';
import constants from '../../utils/constant';
import { baseURI } from '../../utils/api';

const ARScene = ({bookDescription,showAuto,showHdr}) => {
    console.log('SHOW AUTO',bookDescription)
    return (
      <ViroARScene>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        {bookDescription.map(phrase => {
            console.log(phrase)
            let objectType = '';
            const fileType = phrase.object.split('.').reverse()[0];
            if(['jpg', 'jpeg', 'png', 'svg', 'gif', 'bmp', 'webp'].indexOf(fileType.toLowerCase()) >= 0) {
                objectType = 'image';
            } else if(['mov', 'avi', 'wmv', 'mpg', 'mpeg', 'mp4', 'webm'].indexOf(fileType.toLowerCase()) >= 0) {
                objectType = 'video';
            }
            const mediaProps = {
                height: 0.1,
                dragType: 'FixedToWorld',
                width: 0.1,
                position: [0, 0.002, 0],
                rotation: [-90, 0, 0],
                // scale: [2,2,0],
                source: {uri: baseURI(phrase.object)},
                autofocus:showAuto,
                hdrEnabled:showHdr,
                // onClick: () => {
                //     //     Linking.openURL('https://www.youtube.com/watch?v=aSIiBTEnE3o');
                // }
            }
            return (
              <ViroARImageMarker
                target={`trigger_${phrase.id}`}
                key={`trigger_${phrase.id}`}>
                    {objectType === 'image' ? (
                        <ViroImage {...mediaProps} />
                    ) : (objectType === 'video' ? (
                        <ViroVideo {...mediaProps} />
                    ) : (<></>))}
              </ViroARImageMarker>
            );
        })}
      </ViroARScene>
    );
}
export default ARScene;
const styles = StyleSheet.create({
    backButton: {
        width:20,
        height: 20,
        backgroundColor: constants.WHITE,
        position: 'absolute',
        top:20,
        left:20,
    }
});