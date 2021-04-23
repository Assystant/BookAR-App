/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// import { Provider } from 'react-redux';

// import { createStore, applyMiddleware, StoreEnhancer } from 'redux';


// import BookList from './app/screens/bookList';
import LogIn from './app/screens/login';
// import DownloadFile from './app/screens/downloadBook';
import BookList from './app/screens/bookList';
import BookDescription from './app/screens/bookDescription';
import BookDEtails from './app/screens/bookDetails';
import BookCard from './app/screens/bookCard';
import CalenderExample from './app/screens/calender';

const Stack = createStackNavigator();

const App = () => {

  return (

    // <BookList />
    // <Provider >
    // <LogIn username={null} password={null}/>
    // </Provider>
    // <DownloadFile isDone={false}/>
    // <BookDescription/>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={LogIn} />
        <Stack.Screen name="BookList" component={BookList} />
        <Stack.Screen name="BookPhraseDetails" component={BookDescription}/>
        <Stack.Screen name="BookDetails" component={BookDEtails}/>
        <Stack.Screen name="BookCard" component={BookCard}/>
        <Stack.Screen name="CalenderExample" component={CalenderExample}/>

        
      </Stack.Navigator>
    </NavigationContainer>

  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
