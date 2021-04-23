import React, { Component } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import { bookDetails } from '../../services/book.service';
import RNFS from 'react-native-fs';
import ImgToBase64 from 'react-native-image-base64';
import { Icon } from 'react-native-elements'


// import AppleCard from 'react-native-apple-card-views';

// import BookDescription from '../bookDescription';



interface State {
    bookDescription: Array<any>;
    cover: string;
    isDone: boolean;
    bookDetail: Array<any>;

}
type Props = NavigationStackScreenProps & State;


export default class FlatListBasics extends Component<Props> {
    state: State = {
        bookDescription: [],
        cover: '',
        isDone: false,
        bookDetail: [],

    }
    componentWillMount() {
        this.getBookDescription();

    }
    getBookDescription = async () => {
        let responseStatus;
        let token = await AsyncStorage.getItem('tokens');
        let id = 13;
        // let c = '';
        // console.log('COVER', this.state.cover);
        bookDetails(id, token)
            .then(async res => {
                responseStatus = res[0];

                const responseJSON = res[1];
                console.log('RESPONCE', res);
                if (responseStatus === 200) {
                    // console.log('BOOK DESC', res);
                    this.setState({
                        bookDescription: res,

                    });
                    // c=res[0].book_cover;
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
                    // this.props.navigation.navigate('BookPhraseDetails');
                }
            });

    };
    getBase64FromUrl = async (url) => {
        ImgToBase64.getBase64String(url)
            .then(base64String => { console.log('BASE 64', base64String) })
            .catch(err => { console.log('ERROR', err) });
    }

    onDownloadImagePress = () => {
        console.log("Press download")
        const { bookDescription } = this.state
        console.log('BOOK DETAIL', bookDescription)



        bookDescription !== undefined ?
            bookDescription.map((l => (
                // console.log('ll', l.book_cover)
                this.getBase64FromUrl(l.book_cover),
                RNFS.downloadFile({

                    fromUrl: 'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?cs=srgb&dl=pexels-pixabay-207962.jpg&fm=jpg',
                    toFile: `${RNFS.DocumentDirectoryPath}/react-native.png`,
                }).promise.then((r) => {
                    this.setState({ isDone: true })
                })
                // this.setState({
                //     cover: l.book_cover,
                // })
            )))
            : <></>

    }

    render() {
        const { bookDescription, cover } = this.state
        // this.setState({cover:bookDescription[0].book_cover})
        // const item = this.props.navigation.getParam('l');
        // console.log('PARAMS DATA',item);



        console.log('BOOK DETAILS CARD', `file://${RNFS.DocumentDirectoryPath}/react-native.png`);
        const preview = this.state.isDone ? (<View style={{ flex: 0.2 }}>
            <Image style={styles.userImg}
                source={{
                    uri: `file://${RNFS.DocumentDirectoryPath}/react-native.png`,
                    scale: 1
                }}
            />
            {/* <Text>{`file://${RNFS.DocumentDirectoryPath}/react-native.png`}</Text> */}
        </View>
        ) : null;



        return (
            <>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={bookDescription}
                        renderItem={({ item }) =>
                        (
                            <>
                                <View style={styles.container}>
                                    <Card containerStyle={{ width: '90%', display: "flex", }} >
                                        <View style={{flexDirection:'row',display: "flex"}}>


                                            <View style={styles.topContainer}>
                                                {preview}
                                            </View>
                                            <View style={styles.bookDetails}>
                                                <Text style={[styles.name]}>{item.name?.name}{`\n`}</Text>
                                                <Text style={styles.name}>{item.author?.first_name} {item.author?.last_name}{`\n`}</Text>
                                                <Text style={styles.name}>{item?.description}{`\n`}</Text>
                                                <Text style={styles.name}>{item?.publisher?.name}{`\n`}</Text>
                                                <Text style={styles.name}>{item?.publisher?.descripton}{`\n`}</Text>


                                                {/* <Icon
                                                name='download'
                                                type='font-awesome'
                                                color='#f50'

                                                // style={{marginRight:5}}
                                                size={30}
                                            /> */}
                                                <TouchableOpacity onPress={this.onDownloadImagePress}>
                                                    <Text>
                                                        Download
                                                </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </Card>
                                </View>


                            </>
                        )}
                    />

                </SafeAreaView>
                {/* <AppleCard
                    smallTitle=""   
                    largeTitle=""
                    footnoteText=""
                    resizeMode="cover"
                    source={require("../bookList/images/delete.png")}
                    backgroundStyle={{
                        height: 200,
                    }}
                    onPress={() => { }}
                /> */}
            </>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
    },
    imageContainer: {
        textAlign: 'center',

    },
    topContainer: {
        flex: 0.2,
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "flex-start"
    },
    bookDetails: {
        flex: 0.8,
        flexDirection: "column",
        // flexWrap: "nowrap",
        justifyContent: "flex-end"

    },
    name: {
        marginTop: 5,
        // marginRight: 10,
        textAlign:'right',
        fontWeight: "600",
        color: "black"
    },
    userImg: {
        borderRadius: 20,
        width: 150,
        height: 200,
        marginLeft: 10
    },
    card: {
        borderRadius: 5,
        justifyContent: 'space-around',
        // alignItems: 'center',
        height: '90%',
        width: '90%',
        flexGrow: 1,
    },
    bookDetail: {
        borderRadius: 3,
        width: '70%',
        height: 200,
    },
    bookTitle: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: 'right',
    },
    bookAuthor: {
        fontStyle: 'italic',
        fontSize: 13,
        paddingVertical: 1,
        textAlign: 'right'
    }
});