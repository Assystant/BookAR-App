import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import {getBookDescription} from '../../services/book.service';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthContext, SplashScreen, StackParamList} from '../../../App';
import {TouchableOpacity} from 'react-native-gesture-handler';
import constants from '../../utils/constant';

type BookDescriptionRouteProps = RouteProp<StackParamList, 'BookPhraseDetails'>;
type BookDescriptionNavigationProps = StackNavigationProp<
  StackParamList,
  'BookPhraseDetails'
>;
type BookDescriptionProps = {
  route: BookDescriptionRouteProps;
  navigation: BookDescriptionNavigationProps;
};
const BookDescription = ({route, navigation}: BookDescriptionProps) => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [loadingFailed, setLoadingFailed] = useState<Boolean>(false);
  const [bookDescription, setBookDescription] = useState<any>({});
  const {getToken} = useContext(AuthContext);
  const {book} = route.params;
  const loadBookDescription = () => {
    setLoading(true);
    setLoadingFailed(false);
    let token = getToken();
    getBookDescription(book.id, token)
      .then(async res => {
        const responseStatus = res[0];
        const responseJSON = res[1];
        console.log('RESPONCE', res);
        if (responseStatus === 200) {
          // console.log('BOOK DESC', res);
          setBookDescription(responseJSON);
          // await AsyncStorage.setItem(
          //   'bookDescription',
          //   JSON.stringify(responseJSON),
          // );
        } else {
          setLoadingFailed(true);
        }
      })
      .catch(err => {
        setLoadingFailed(true);
      })
      .then(() => {
        setLoading(false);
      });
  };
  const initializeAR = () => {
    navigation.navigate('ARScreen', {
      book,
      bookDescription,
    });
  };
  useEffect(loadBookDescription, []);
  if (loading) {
    return <SplashScreen />;
  }
  if (loadingFailed) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={styles.emptyContainerText}>
          Failed to retrieve description
        </Text>
        <TouchableOpacity onPress={loadBookDescription}>
          <Text style={styles.retryButton}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer} wrapperStyle={styles.card}>
          <Image
            source={{uri: book.book_cover}}
            defaultSource={require('../../assests/Jungle_Book.jpg')}
            style={styles.bookImage}
          />
          <ScrollView style={styles.contentContainer}>
            <View style={{marginBottom: 25}} />
            <Text style={styles.bookLabel}>Title:</Text>
            <Text style={styles.bookTitle}> {book.name}</Text>
            <Text style={styles.bookLabel}>Description:</Text>
            <Text style={styles.bookTitle}>{book.description}</Text>
            <View style={{marginBottom: 50}} />
          </ScrollView>
        </Card>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <TouchableOpacity style={styles.button} onPress={initializeAR}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
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

export default BookDescription;
