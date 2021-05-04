import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../../../App';
import constants from '../../utils/constant';
interface ComponentProps {
  setToken?: (token: string) => void;
}
type LoginProps = ComponentProps;

const LogIn = ({}: LoginProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('Qwerty123$');

  const {signIn} = React.useContext(AuthContext);

  const signInCallback = () => {
    if(setLoading)
    setLoading(false);
  };
  const onFormSubmit = () => {
    setLoading(true);
    Keyboard.dismiss();
    signIn(username, password, signInCallback);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book AR</Text>
      <TextInput
        style={styles.inputBox}
        autoCapitalize="none"
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder="Username"
        placeholderTextColor={constants.WHITE}
        selectionColor={constants.WHITE}
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor={constants.WHITE}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity
        style={[styles.button]}
        onPress={onFormSubmit}
        disabled={loading}>
        {loading ? ( <ActivityIndicator color={constants.WHITE} size="small" /> ) : ( <Text style={styles.buttonText}>LogIn</Text> )}
      </TouchableOpacity>
    </View>
  );
};
export default LogIn;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:20,
  },
  heading: {
    fontSize: 48,
    fontWeight: '400',
    margin: 40,
    marginTop: 0,
  },
  inputBox: {
    width: 300,
    backgroundColor: 'gray',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: constants.WHITE,
    marginVertical: 10,
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
