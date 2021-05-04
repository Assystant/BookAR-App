/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, createContext, useMemo, Reducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import { Provider } from 'react-redux';

// import { createStore, applyMiddleware, StoreEnhancer } from 'redux';

// import BookList from './app/screens/bookList';
import LogIn from './app/screens/login';
// import DownloadFile from './app/screens/downloadBook';
import BookList from './app/screens/bookList';
import BookDescription from './app/screens/bookDescription';
import ARScreen from './app/screens/arScreen';
// import BookDEtails from './app/screens/bookDetails';
// import BookCard from './app/screens/bookCard';
// import CalenderExample from './app/screens/calender';
import AsyncStorage from '@react-native-community/async-storage';
import constants from './app/utils/constant'; 
import {authenticate, getBookList} from './app/services/book.service';
import { ActivityIndicator, StatusBar, View } from 'react-native';

// type AuthContextType = {
//   signIn: any;
//   signOut: any;
// }
export const AuthContext = createContext<any>(null);


export const SplashScreen = () => (
  <View
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      backgroundColor: constants.DARK_COLOR,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <StatusBar translucent barStyle="light-content" backgroundColor={constants.DARK_COLOR} />
      <ActivityIndicator size="large" color={constants.WHITE} />
    </View>
);

export type StackParamList = {
  Home: undefined;
  BookList: undefined;
  BookPhraseDetails: {
    book: any,
  };
  ARScreen: {
    book: any,
    bookDescription: any,
  }
}
const Stack = createStackNavigator<StackParamList>();
type State = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
  books: Array<any>;
};
type Action = {
  type: string;
  token?: string;
  books?: Array<any>
}
const App = () => {
  const [state, dispatch] = React.useReducer<Reducer<State, Action>>(
    (prevState: State, action: Action) => {
      switch (action.type) {
        case constants.RESTORE_TOKEN:
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case constants.SIGN_IN:
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case constants.SIGN_OUT:
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            books: [],
          };
        case constants.SET_BOOKS:
          return {
            ...prevState,
            books: action.books,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      books: [],
    },
  );
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let bookList;
      try {
        userToken = await AsyncStorage.getItem(constants.USER_TOKEN);
      } catch (e) {
        // Restoring token failed
        userToken= null;
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: constants.RESTORE_TOKEN, token: userToken});

      try {
        bookList = await AsyncStorage.getItem(constants.BOOK_LIST);
      } catch (e) {
        // Restoring token failed
        bookList = [];
      }
      if(!bookList) {
        bookList = [];
      }
      dispatch({type: constants.SET_BOOKS, books: bookList})
    };

    bootstrapAsync();
  }, []);
  const { userToken, books } = state;
  const authContext = useMemo(
    () => ({
      signIn: async (username: string, password: string, callback?: any) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        authenticate({username, password})
          .then(async response => {
            const responseStatus = response[0];
            const responseJSON = response[1];
            if (responseStatus === 200) {
              await AsyncStorage.setItem(
                constants.USER_TOKEN,
                responseJSON.token,
              );
              dispatch({type: constants.SIGN_IN, token: responseJSON.token});
            } else {
              console.log('error', responseJSON);
            }
          })
          .catch(_err => {
            console.log('error', _err);
          })
          .then(() => {
            if(callback){
              callback();
            }
          });

      },
      signOut: () => dispatch({type: constants.SIGN_OUT}),
      getToken: () => userToken, 
      loadBooksList: async (callback?: any) => {
        getBookList({userToken})
          .then(async response => {
            const responseStatus = response[0];
            const responseJSON = response[1];
            console.log(responseJSON)
            if(responseStatus === 200) {
              await AsyncStorage.setItem(
                constants.BOOK_LIST,
                JSON.stringify(responseJSON.results),
              );
              dispatch({
                type: constants.SET_BOOKS,
                books: [
                  ...responseJSON.results,
                ],
              });
            } else {
              console.log("error", responseJSON);
            }
          })
          .catch(_err => {
            console.log('error', _err);
          })
          .then(()=> {
            if(callback) {
              callback();
            }
          })
      },
      getBooks: () => {
        console.log('called', books, state)
        return books;
      },
    }), 
    [userToken, books,],
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: constants.DARK_COLOR,
            },
            headerTintColor: constants.WHITE,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          {state.userToken == null ? (
            <>
              <Stack.Screen
                name="Home"
                component={LogIn}
                options={{
                  headerShown: false,
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="BookList"
                options={{
                  title: 'Books List',
                }}
                component={BookList}
              />
              <Stack.Screen
                name="BookPhraseDetails"
                component={BookDescription}
                initialParams={{
                  book: {},
                }}
                options={{
                  title: 'Books Details',
                }}
              />
              <Stack.Screen
                name="ARScreen"
                component={ARScreen}
                initialParams={{
                  book: {},
                  bookDescription: {},
                }}
                options={{
                  headerShown:false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
