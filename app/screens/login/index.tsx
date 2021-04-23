import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { authenticate } from '../../services/book.service';


// import { setToken } from '../../redux/book'
interface State {
  loading: boolean,
  loginData:Object,
}
interface ComponentProps {
  setToken?: (token: string) => void;

}
type LoginProps = ComponentProps &
  State & NavigationStackScreenProps;

export class LogIn extends Component<LoginProps> {


  state:State={
    loading:false,
    loginData:{
      username:'',
      password:'',
    }
  }



  updateUsername=(value)=>{
    this.setState({
      loginData:{
        ...this.state.loginData,
        username:value,
      }
    })
  }
  updatePassword=(value)=>{
    this.setState({
      loginData:{
        ...this.state.loginData,
        password:value,
      }
    })

  }

  onFormSubmits = () => {
    // this.props.navigation.navigate('Details');

    // const { loginData } = this.state;
    let responseStatus;

    this.setState({
      loading: true,
    });
        const { loginData } = this.state;
        console.log('LOGIN DATA',loginData)


     authenticate(loginData)
      .then(async response => {
        const responseStatus = response[0];
        const responseJSON = response[1];
        console.log('RESPONCE', response);
        console.log('RESPONCE STATUS', responseStatus);


        if (responseStatus === 200) {

          await AsyncStorage.setItem(
            'tokens',
            JSON.stringify(responseJSON),
          );
          this.props.navigation.navigate('BookList');

          // this.props.navigation.navigate('CalenderExample');
        } else if (responseStatus === 400) {
          console.log("error");
        } else {
        }
      })
      .catch(_err => {
        console.log('error', _err);

        responseStatus = 0;
      })
      .then(() => {
        this.setState({
          loading: false,
        });
        // if (responseStatus === 200) {
          // this.props.navigation.navigate('BookList');
        // }
      });
     


  }


  render() {
    const { loading } = this.state;


    return (
      <View style={styles.container}>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Email"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          // keyboardType="email-address"
          onChangeText={this.updateUsername}
        />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          //   ref={(input) => this.password = input} 
          onChangeText={this.updatePassword}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.onFormSubmits()} >
          <Text style={styles.buttonText}>LogIn</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
// const mapStateToProps = () => ({
// });
// const mapDispatchToProps = {
//   setToken
// };

// export default connect(
// mapStateToProps,
// mapDispatchToProps, 
// )(LogIn);
export default LogIn;


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputBox: {
    width: 300,
    backgroundColor: 'gray',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10
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
  }

});


