import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { bookDetails } from '../../services/book.service';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import RNFS from 'react-native-fs';




interface State {
    bookDetail: Array<any>;
    isDone: boolean;
}
type Props = State & NavigationStackScreenProps;
// const Card = ({ title, desc }) => (
//     <View style={styles.cardContainer}>
//         <View style={styles.cardContent}>
//             <View style={{ flexDirection: 'row' }}>
//                 <Text>{title}</Text>
//                 <Text>{desc}</Text>
//             </View>
//             {/* <MaterialIcons name="navigate-next" size={40} color="red" /> */}
//         </View>
//     </View>
// )
export default class BookDEtails extends Component<Props> {

    state: State = {
        bookDetail: [],
        isDone: false,

    };

    componentWillMount() {
        this.getBookDetail();
        // this.showBookDetails()

    }
    showBookDetails = async () => {
        let bookDetail = await AsyncStorage.getItem('bookDetails');

        console.log('BOOK DESC', bookDetail)

    }

    getBookDetail = async () => {
        let responseStatus;
        let token = await AsyncStorage.getItem('tokens');


        let id = 1;

        bookDetails(id, token)
            .then(async res => {
                responseStatus = res[0];

                const responseJSON = res[1];
                console.log('RESPONCE', res);
                if (responseStatus === 200) {
                    console.log('BOOK DETAIL');
                    console.log('BOOK DETAIL', res);
                    this.setState({
                        bookDetail: res,
                    });
                    await AsyncStorage.setItem(
                        'bookDetails',
                        JSON.stringify(responseJSON),
                    );
                    // console.log('BOOK DETAIL', bookDetail)
                    console.log('State Book List', this.state.bookDetail)

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
                    //   this.props.navigation.navigate('BookPhraseDetails');


                }
            });

    };
    cards = [
        {
            title: 'Top up',
            desc: 'Top up any number'
        },
        {
            title: 'Top up history',
            desc: 'View all of the top up you have made'
        },
        {
            title: 'Top up',
            desc: 'Top up any number'
        },
        {
            title: 'Top up history',
            desc: 'View all of the top up you have made'
        }
    ]
    renderCards = () => {
        // return this.cards.map(card => (
        //     <Card
        //         title={card.title}
        //         desc={card.desc}
        //     />
        // ))
    }
    onDownloadImagePress = () => {
        const { bookDetail } = this.state

        bookDetail !== undefined ?
            bookDetail.map((l => (
                
                // console.log('LL',l.book_cover)

                RNFS.downloadFile({
                    fromUrl: "http://02ce25fd4d1b.ngrok.io/media/Book_Cover/delete_I6eypdN.png",
                    toFile: `${RNFS.DocumentDirectoryPath}/react-native.png`,
                }).promise.then((r) => {
                    this.setState({ isDone: true })
                })
                ))) 
                : <></>
    }


    render() {
        const { bookDetail } = this.state
        console.log('BBOK 1', bookDetail);
        const preview = this.state.isDone ? (<View>
            <Image style={{
              width: 100,
              height: 100,
              backgroundColor: 'black',
            }}
              source={{
                uri: `file://${RNFS.DocumentDirectoryPath}/react-native.png`,
                scale: 1
              }}
            />
            <Text>{`file://${RNFS.DocumentDirectoryPath}/react-native.png`}</Text>
          </View>
          ) : null;
        return (
            <>

                {
                    bookDetail !== undefined ?
                        bookDetail.map((l => (
                            // console.log('L', l)
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <View style={{
                                    // backgroundColor: 'blue',
                                    width: '50%',



                                }}>
                                    <Card>
                                        {/* <View> */}
                                        <Image source={{ uri: l.book_cover }} style={{ height: 200, width: 200 }} />

                                        {/* </View> */}

                                    </Card>
                                </View>
                                <View style={{
                                    // backgroundColor: 'red',
                                    width: '50%',


                                }}>
                                    <Card >
                                        {/* <Text>{l.description}</Text> */}
                                        {/* <Text>{l.name}</Text> */}
                                        <Text> Name:{l.name}</Text>
                                        <Text>Description:{l.description}</Text>
                                    </Card>
                                </View>

                            </View>




                        )
                        )) : <></>



                    //     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    //         <View style={{
                    //             backgroundColor: 'blue',
                    //             width: '50%',



                    //         }}>
                    //             <Card>
                    //                 <Card.Image source={ {uri: l.book_cover}}>
                    //                 </Card.Image>
                    //             </Card>
                    //         </View>
                    //         <View style={{
                    //             backgroundColor: 'red',
                    //             width: '50%',


                    //         }}>
                    //             <Card >
                    //                 <Text>{l.description}</Text>
                    //                 <Text>{l.name}</Text>
                    //             </Card>
                    //         </View>

                    //     </View>

                    // )
                    // )
                    // )
                    // : <></>
                    // )}

                }



                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text onPress={this.onDownloadImagePress}>Download Image</Text>
                    {preview}
                </View>

            </>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        flexDirection: 'row',
        padding: 25,
    },
    cardContainer: {
        paddingTop: 30,
        paddingBottom: 30,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { x: 0, y: 10 },
        shadowOpacity: 1,
        borderLeftColor: 'blue',
        borderLeftWidth: 10,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        marginTop: 20,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
    }


});