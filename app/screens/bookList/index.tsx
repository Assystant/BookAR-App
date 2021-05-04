import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {AuthContext, SplashScreen} from '../../../App';
import constants from '../../utils/constant';
import {useNavigation, useNavigationState} from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native-elements/dist/image/Image';
type BookListProps = {};
const BookList = ({}: BookListProps) => {
  const nav = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [bookList, setBookList] = useState<Array<any>>([]);

  const {loadBooksList, getBooks, signOut} = React.useContext(AuthContext);

  const loadBooksCallback = () => {
    setLoading(false);
  };
  const loadBooks = () => {
    loadBooksList(loadBooksCallback);
  };
  const setBooks = () => {
    const books = getBooks();
    console.log(books);
    setBookList(books);
  };

  useEffect(loadBooks, []);
  useEffect(setBooks, [loading]);
  const logout = () => {
    signOut();
  }
  // moveToBookDetails = l => {
  //   this.props.navigation.navigate('BookCard');
  // };
  if (loading) {
    return <SplashScreen />;
  }
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={bookList}
          keyExtractor={(l, i) => `book-item-${l.id}-${i}`}
          scrollEnabled
          renderItem={({item: l}: any) => {
            console.log(l)
            const itemClick = () => {
              nav.navigate('BookPhraseDetails', {book: l});
            }
            return (
              <Card containerStyle={{padding: 0, borderRadius: 10}}>
                <TouchableOpacity
                  style={{
                  }}
                  onPress={itemClick}>
                    <View style={{
                    // padding: 0,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // flexDirection: 'row',
                    borderRadius:10,
                    padding: 10,
                  }}>
                  <Image
                    source={{uri: l.book_cover}}
                    style={styles.bookImage}
                  />
                  <Text style={{margin: 15, flex: 1, textAlign: 'left'}}>
                    {l.name}
                  </Text>
                  </View>
                </TouchableOpacity>
              </Card>
            );}}
        />
      </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
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
  item: {
    width: '80%', // is 50% of container width
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
  user: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 35,
    paddingHorizontal: 10,
  },
  headerText: {
    fontFamily: 'Cochin',
    fontSize: 20,
  },
  image: {
    height: 200,
    width: 100,
  },
  name: {
    fontSize: 15,
    fontStyle: 'italic',
  },

  shadowsStyling: {
    width: 250,
    height: 150,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  cardView_InsideText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginTop: 50,
  },
  bookImage: {
    width: 50,
    flex:1,
    height: 50,
    // borderRadius: 10,
    borderColor: constants.DARK_COLOR,
    backgroundColor: 'gray',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default BookList;
