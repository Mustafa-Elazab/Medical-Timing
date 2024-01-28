import Screen from 'components/Screen';
import AppColors from 'enums/AppColors';
import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {ms} from 'react-native-size-matters';
import {
  Button,
  IconButton,
  ScrollView,
  Text,
  TextInput,
} from 'roqay-react-native-common-components';
import {TextInput as PaperInput} from 'react-native-paper';
import addStyles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default React.memo(() => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [formattedDate, setFormattedDate] = useState('Notification');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    const formatted = moment(date).format('h:mm A');
    setFormattedDate(formatted);
    hideDatePicker();
  };

  const dropdownOptions = [
    {dropdownTitle: '1', key: '1'},
    {dropdownTitle: '2', key: '2'},
  ];
  const data = [
    {id: 1, name: 'Apple'},
    {id: 2, name: 'Banana'},
    {id: 3, name: 'Cherry'},
  ];

  const [selectedItem, setSelectedItem] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const filterList = text => {
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredList(filteredData);
  };

  const onItemSelected = item => {
    setSelectedItem(item.name);
    setFilteredList([]);
  };

  const AppBarBackBtn = () => (
    <IconButton
      iconName="keyboard-backspace"
      size={48}
      color="white"
      style={{
        backgroundColor: AppColors.PRIMARY,
        aspectRatio: 1,
        height: ms(48),
        borderRadius: ms(8),
      }}
    />
  );

  const billNameInput = () => (
    <TextInput
      placeholder="PillName"
      style={addStyles.textInput}
      activeUnderlineColor={AppColors.PRIMARY}
      underlineColor="transparent"
      topLabelProps={topLabelProps((label = 'Pills name'))}
      left={
        <PaperInput.Icon
          icon="pill"
          size={24}
          color={AppColors.SHADOW}
          style={{alignSelf: 'center'}}
        />
      }
      right={
        <PaperInput.Icon
          icon="line-scan"
          size={24}
          color={AppColors.PRIMARY}
          style={{alignSelf: 'center'}}
        />
      }
    />
  );

  const amountHowLongInput = () => (
    <View>
      <Text style={{fontSize: 14, fontWeight: '600'}}>Amount & How long ?</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TextInput
          value={selectedItem}
          style={[addStyles.textInput, {width: '48%'}]}
          placeholder="Type here..."
          onChangeText={text => {
            filterList(text);
            setSelectedItem(text);
          }}
        />
        <FlatList
          data={filteredList}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onItemSelected(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />

        <TextInput
          placeholder="Calendar"
          style={[addStyles.textInput, {width: '48%'}]}
          activeUnderlineColor={AppColors.PRIMARY}
          underlineColor="transparent"
          selectProps={{
            items: dropdownOptions,
            selectedItems: dropdownOptions,
            mode: 'dropdown',
            onValueChange: selectedValue => {
              // Handle the selected value
            },
          }}
          left={
            <PaperInput.Icon
              icon="calendar-blank"
              size={24}
              color={AppColors.SHADOW}
              style={{alignSelf: 'center'}}
            />
          }
        />
      </View>
    </View>
  );

  const foodPillsInput = () => (
    <View>
      <Text style={{fontSize: 14, fontWeight: '600'}}>Food & Pills</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={addStyles.foodContainer}>
          {pillIcon()}
          {forkIcon()}
          {plateIcon()}
        </View>
        <View
          style={[addStyles.foodContainer, {backgroundColor: AppColors.GRAY}]}>
          {forkIcon()}
          {pillIcon()}
          {plateIcon()}
        </View>
        <View
          style={[addStyles.foodContainer, {backgroundColor: AppColors.GRAY}]}>
          {plateIcon()}
          {forkIcon()}
          {pillIcon()}
        </View>
      </View>
    </View>
  );

  const pillIcon = () => (
    <Icon name="pills" size={16} color={AppColors.SECONDARY} />
  );

  const forkIcon = () => (
    <Icon name="utensils" size={24} color={AppColors.SECONDARY} />
  );

  const plateIcon = () => (
    <Icon name="hamburger" size={16} color={AppColors.SECONDARY} />
  );

  const notificationInput = () => (
    <View>
      <Text style={{fontSize: 14, fontWeight: '600'}}>Notification</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Notifcation"
          style={[addStyles.textInput, {flex: 1, marginRight: ms(4)}]}
          activeUnderlineColor={AppColors.PRIMARY}
          underlineColor="transparent"
          editable={true}
          onPressIn={showDatePicker}
          value={formattedDate}
          left={
            <PaperInput.Icon
              icon="bell"
              size={24}
              color={AppColors.SHADOW}
              style={{alignSelf: 'center'}}
            />
          }
        />
        <IconButton
          iconName="plus"
          size={44}
          shouldRasterizeIOS
          color={AppColors.PRIMARY}
          style={{
            aspectRatio: 1,
            borderRadius: ms(4),
            backgroundColor: AppColors.GRAY,
          }}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );

  const topLabelProps = (label: string) => ({
    label,
    textProps: {
      type: '600',
      size: 14,
    },
  });

  const doneBtn = () => (
    <Button
      text="Done"
      textProps={{
        size: 18,
      }}
      style={{height: ms(52), justifyContent: 'center', borderRadius: ms(8)}}
    />
  );

  const spacerUp = (up: number) => (
    <View shouldRasterizeIOS style={{marginTop: ms(up)}} />
  );

  return (
    <Screen>
      <ScrollView>
        <View
          style={{
            marginHorizontal: ms(16),
            marginVertical: ms(8),
          }}>
          {spacerUp((up = 20))}
          {AppBarBackBtn()}
          {spacerUp((up = 40))}
          {billNameInput()}
          {spacerUp((up = 16))}
          {amountHowLongInput()}
          {spacerUp((up = 16))}
          {foodPillsInput()}
          {spacerUp((up = 16))}
          {notificationInput()}
          {spacerUp((up = 40))}
          {doneBtn()}
        </View>
      </ScrollView>
    </Screen>
  );
});
