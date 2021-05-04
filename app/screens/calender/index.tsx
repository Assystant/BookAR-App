import React, {Component} from 'react';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Button, View, StyleSheet, TextInput, Platform} from 'react-native';
// import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

interface State {
  bookList: any;
  isDatePickerVisible: boolean;
  mode: string;
  show: boolean;
  date: Date;
}
type Props = State & NavigationStackScreenProps;
export default class CalenderExample extends Component<Props> {
  state: State = {
    bookList: {},
    isDatePickerVisible: false,
    mode: '',
    show: false,
    date: new Date(),
  };
  componentWillMount() {
    // this.getBookList();
  }

  moveToBookDetails = () => {
    this.props.navigation.navigate('BookCard');
  };
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.setState({show: true});
    if (Platform.OS === 'ios') {
      this.setState(currentDate);
    }
  };
  showMode = currentMode => {
    this.setState({show: true});
    this.setState({mode: currentMode});
  };

  render() {
    // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const {isDatePickerVisible, date, mode} = this.state;

    const showDatePicker = () => {
      this.setState({isDatePickerVisible: true});
    };

    const hideDatePicker = () => {
      this.setState({isDatePickerVisible: false});
    };

    const handleConfirm = date => {
      console.warn('A date has been picked: ', date);
      this.setState({date: date});
      hideDatePicker();
    };
    // const {mode}=this.state
    return (
      <View>
        {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
        {/* <TextInput
                    style={styles.input}
                    onChangeText={showDatePicker}
                    // value={isDatePickerVisible}
                    // value={date}
                    onChange={showDatePicker}
                /> */}
        {/* <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    // value={date}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                /> */}

        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="datetime"
          is24Hour={false}
          display="default"
          onChange={this.onChange}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
