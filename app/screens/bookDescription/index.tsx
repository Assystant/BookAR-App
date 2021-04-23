import React, { Component } from 'react';
import { View, StyleSheet, Text ,Image} from 'react-native';
import { Card }from 'react-native-elements';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import { bookDescription } from '../../services/book.service';

interface State {
    bookDescription: Array<any>;
}
type Props = NavigationStackScreenProps & State;


export default class BookDescription extends Component<Props>{
    state: State = {
        bookDescription: [],
    }
    componentWillMount() {
        this.getBookDescription();
    }
    getBookDescription = async () => {
        let responseStatus;
        let token = await AsyncStorage.getItem('tokens');
        let id = 5;

        bookDescription(id, token)
            .then(async res => {
                responseStatus = res[0];

                const responseJSON = res[1];
                console.log('RESPONCE', res);
                if (responseStatus === 200) {
                    // console.log('BOOK DESC', res);
                    this.setState({
                        bookDescription: res,
                    });
                    await AsyncStorage.setItem(
                        'bookDescription',
                        JSON.stringify(responseJSON),
                    );

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
                    this.props.navigation.navigate('BookPhraseDetails');
                }
            });

    };

    render() {
        const { bookDescription } = this.state
        return (
            <>

                {/* <View style={styles.user}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 15, paddingHorizontal: 5 }}>

                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.headerText}>BookName</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.headerText}>Status</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.headerText}> Description</Text>
                        </View>

                    </View> */}

                    {/* <Card >
                        <Card.Divider /> */}
                        

                        { 
                           bookDescription[1]!==undefined?
                            bookDescription[1].map((l ,i)=> (
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', padding: 10 }}>
                                {/* <view> */}
                                    <Card containerStyle={styles.card}>
                                        {/* <Text>{item.key}</Text> */}
                                        {/* <Image src={{
                                        uri: item.key,
                                        // scale: 1
                                    }} /> */}
                                        <Image source={require('../bookList/images/delete.png')} style={{height:100,width:100}} />

                                    </Card>

                                {/* </view> */}
                                {/* <View> */}
                                    <Card containerStyle={styles.bookDetail}>
                                        <Text style={styles.bookTitle}>Author:{l.name}</Text>
                                        <Text style={styles.bookTitle}>Description:{l.description}</Text>
                                        {/* <Text style={styles.bookTitle}>Description:xxxxxx{item.key}</Text> */}



                                    </Card>
                                    </View>

                                // <ListItem key={i} bottomDivider>
                                //     <ListItem.Content>
                                //         <ListItem.Title>{l.phrase}</ListItem.Title>
                                //     </ListItem.Content>

                                //     <ListItem.Content>
                                //         <ListItem.Title>{l.book}</ListItem.Title>

                                //     </ListItem.Content>
                                //     <ListItem.Content>
                                //         <ListItem.Title>{l.status}</ListItem.Title>
                                //     </ListItem.Content>
                                // </ListItem>

                            )
                            ):<></>
                        }
                    {/* </Card> */}
                {/* </View> */}
            </>

        );
    }
}
const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     padding: 20,
    // },
    // item: {
    //     width: '80%' // is 50% of container width
    // },
    // user: {
    //     flex: 1,
    //     justifyContent: 'flex-start',
    //     paddingVertical: 35,
    //     paddingHorizontal: 10,
    // },
    // headerText: {
    //     fontFamily: "Cochin",
    //     fontSize: 20,

    // },
    // image: {
    //     height: 200,
    //     width: 100,
    // },
    // name: {
    //     fontSize: 15,
    //     fontStyle: 'italic',
    // },

    // shadowsStyling: {
    //     width: 250,
    //     height: 150,
    //     shadowColor: "#000000",
    //     shadowOpacity: 0.8,
    //     shadowRadius: 2,
    //     shadowOffset: {
    //         height: 1,
    //         width: 0
    //     }
    // },

    // cardView_InsideText: {

    //     fontSize: 20,
    //     color: '#000',
    //     textAlign: 'center',
    //     marginTop: 50

    // }
    container: {
        flex: 1,
        paddingTop: 22,
    },
    card: {
        backgroundColor: '#2089dc',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
    bookDetail: {
        backgroundColor: '#2089dc',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: 'flex-start',
        height:200,
        width:200
    },
    bookTitle: {
        fontWeight: "bold",
        fontSize: 25

    }

});