import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { bookList } from '../../services/book.service';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationStackScreenProps } from 'react-navigation-stack';



interface State {
    bookList: any;
}
type Props=State & NavigationStackScreenProps;
export default class BookList extends Component<Props> {

    state: State = {
        bookList: {},
    };
    componentWillMount() {
        this.getBookList();
    }

    getBookList = async () => {
        let responseStatus;
        let token = await AsyncStorage.getItem('tokens');
       
        bookList(token)
            .then(async res => {
                 responseStatus = res[0];
               
                const responseJSON = res[1];
                console.log('RESPONCE', res);
                if (responseStatus === 200) {
                    console.log('BOOK LIST');
                    console.log('BOOK LIST', res[1]);
                    this.setState({
                        bookList: res[1],
                    });
                    await AsyncStorage.setItem(
                        'bookList',
                        JSON.stringify(responseJSON),
                    );
                    console.log('BOOK LIST', bookList)
                    console.log('State Book List', this.state.bookList)

                } else if (res[0] === 400) {
                    const errors = res[1];
                    console.log(errors);
                }
                this.setState({ refreshing: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({ refreshing: false });
            }).then(() => {
                this.setState({
                  loading: false,
                  // loginError,
                });
                if (responseStatus === 200) {
                  
                }
              });

    };
    moveToBookDetails=(l)=>{
        this.props.navigation.navigate('BookCard');
    }
    
    render() {
        const {bookList}=this.state
        // console.log('BBOK 1',bookList[0].results);
        return (
            <>
                <View style={styles.user}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: 15, paddingHorizontal: 25 }}>
                        <Text style={styles.headerText}>BookName</Text>
                    </View>
                    <Card   >
                        <Card.Divider />
                        {
                            bookList.results!==undefined?
                            bookList.results.map((l ,i)=> (
                                // l.results.map((r,i)=>(
                                    // console.log('r',r)
                                <ListItem key={i} bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title onPress={(l)=>{this.moveToBookDetails(l)}}>
                                            {l.name}
                                        </ListItem.Title>
                                    </ListItem.Content>

                                </ListItem>
                                // ))
                            ))
                            :
                            <></>
                        }
                    </Card>                    
                </View>
                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={this.getBookList}>
                        <Text style={styles.buttonText}>LogIn</Text>
                    </TouchableOpacity>
                </View> */}
            </>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
    },
    item: {
        width: '80%' // is 50% of container width
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    user: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingVertical: 35,
        paddingHorizontal: 10,
    },
    headerText: {
        fontFamily: "Cochin",
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
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    cardView_InsideText: {

        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        marginTop: 50

    }

});