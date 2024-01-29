import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Appbar, Avatar, Icon, Modal, Portal} from 'react-native-paper';
import {
  Button,
  IconButton,
  ImagePlaceholder,
  ScrollView,
  SelectItem,
  Text,
  TextInput,
} from 'roqay-react-native-common-components';
import styles from './styles';
import {Pressable, View} from 'react-native';
import Screen from 'components/Screen';
import AppColors from 'enums/AppColors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ms, s, vs} from 'react-native-size-matters';
import * as ImagePicker from 'react-native-image-picker';
import {TextInput as PaperInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/MaterialCommunityIcons';
import {recognizeImage} from './ImageDetailUtils';
import moment from 'moment';
import addMedicalStyles from './styles';
import {addMedicalToLocalStorage} from 'core/LocalStorage';
import PushNotification from 'react-native-push-notification';

export default React.memo(() => {
  const getLogMessage = (message: string) => {
    return `## Add: ${message}`;
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [pillName, setBillName] = useState('');
  const [pickerResponse, setPickerResponse] = useState(null);
  const [selectedDays, setSelectedDays] = useState();
  const [pills, setPills] = useState();
  const [formattedDate, setFormattedDate] = useState('Notification');
  const [isBeforeEating, setIsBeforeEating] = useState(true);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = React.useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  const processImage = async (url: string) => {
    if (url) {
      try {
        const result = await recognizeImage(url);
        if (result) {
          alert(JSON.stringify(result?.blocks));

          console.info(getLogMessage('add'), result?.blocks);
          setBillName(result?.blocks);
          setFormValue('pillName', result?.blocks);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    processImage(uri);
  }, [uri]);

  const onSubmitPress = async (data: FormValues) => {
    try {
      console.info(getLogMessage('add medical'), data);
      await addMedicalToLocalStorage(data);
    } catch (error) {
    } finally {
    }
  };

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
    setValue('notification', formatted);
    hideDatePicker();
  };

  type FormValues = {
    pillName?: string;
    description?: string;
    number_of_pill?: number;
    number_of_day?: number;
    is_before_eating?: boolean;
    notification?: number;
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors: formErrors},
  } = useForm<FormValues>({
    defaultValues: {
      pillName: undefined,
      description: undefined,
      number_of_pill: undefined,
      number_of_day: undefined,
      is_before_eating: undefined,
      notification: undefined,
    },
  });

  const AppBackHeader = () => (
    <IconButton
      iconName="arrow-left"
      size={40}
      color={AppColors.SHADOW}
      style={addMedicalStyles.appBar}
    />
  );

  const dayNum: SelectItem[] = [
    {dropdownTitle: '1', key: '1'},
    {dropdownTitle: '2', key: '2'},
    {dropdownTitle: '3', key: '3'},
    {dropdownTitle: '4', key: '4'},
    {dropdownTitle: '5', key: '5'},
    {dropdownTitle: '6', key: '6'},
    {dropdownTitle: '7', key: '7'},
    {dropdownTitle: '8', key: '8'},
    {dropdownTitle: '9', key: '9'},
    {dropdownTitle: '10', key: '10'},
    {dropdownTitle: '11', key: '11'},
    {dropdownTitle: '12', key: '12'},
    {dropdownTitle: '13', key: '13'},
    {dropdownTitle: '14', key: '14'},
    {dropdownTitle: '15', key: '15'},
    {dropdownTitle: '16', key: '16'},
    {dropdownTitle: '17', key: '17'},
    {dropdownTitle: '18', key: '18'},
    {dropdownTitle: '19', key: '19'},
    {dropdownTitle: '20', key: '20'},
    {dropdownTitle: '21', key: '21'},
    {dropdownTitle: '22', key: '22'},
    {dropdownTitle: '23', key: '23'},
    {dropdownTitle: '24', key: '24'},
    {dropdownTitle: '25', key: '25'},
    {dropdownTitle: '26', key: '26'},
    {dropdownTitle: '27', key: '27'},
    {dropdownTitle: '28', key: '28'},
    {dropdownTitle: '29', key: '29'},
    {dropdownTitle: '30', key: '30'},
    {dropdownTitle: '31', key: '31'},
  ];

  const pillNum: SelectItem[] = [
    {dropdownTitle: '1', key: '1'},
    {dropdownTitle: '2', key: '2'},
    {dropdownTitle: '3', key: '3'},
    {dropdownTitle: '4', key: '4'},
    {dropdownTitle: '5', key: '5'},
    {dropdownTitle: '6', key: '6'},
  ];

  const addNotification = () => {
    PushNotification.localNotification({
      //... You can use all the options from localNotifications
      message: 'My Notification Message', // (required)
      //  date: new Date(Date.now() + 60 * 1000), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  };

  const getNameInput = () => (
    <Controller
      name="pillName"
      control={control}
      rules={{
        required: {
          value: true,
          message: 'Field is required',
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          style={styles.input}
          placeholder={'Name'}
          errorProps={{errorMessage: formErrors.pillName?.message}}
          onBlur={onBlur}
          onChangeText={onChange}
          underlineColor="transparent"
          topLabelProps={topLabelProps('Pill Name')}
          value={pillName || value}
          left={
            <PaperInput.Icon
              icon="pill"
              size={24}
              color={AppColors.PRIMARY}
              style={{alignSelf: 'center'}}
            />
          }
          right={
            <PaperInput.Icon
              icon="line-scan"
              onPress={onCameraPress}
              size={24}
              color={AppColors.PRIMARY}
              style={{alignSelf: 'center'}}
            />
          }
          //   selectProps={{
          //     items: array,
          //     mode: 'dropdown',
          //     onItemsSelected: onChange,
          //   }}
        />
      )}
    />
  );
  const topLabelProps = (label: string) => ({
    label,
    textProps: {
      type: 'bold',
      size: 13,
    },
  });

  const getDescInput = () => (
    <Controller
      name="description"
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          style={styles.input}
          placeholder={'Description'}
          errorProps={{errorMessage: formErrors.description?.message}}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          underlineColor="transparent"
          topLabelProps={topLabelProps('Description')}
          left={
            <PaperInput.Icon
              icon="information-variant"
              size={24}
              color={AppColors.PRIMARY}
              style={{alignSelf: 'center'}}
            />
          }
        />
      )}
    />
  );

  const getImageRound = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'red',
        width: '90%',
        alignSelf: 'center',
        marginTop: ms(16),
      }}>
      <ImagePlaceholder
        source={uri}
        placeholder={require('../../assets/images/bootsplash_logo.png')}
        size={120}
        style={{height: vs(120)}}
        resizeMode="stretch"
      />
    </View>
  );
  const showViewModal = () => (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          margin: ms(60),
          borderRadius: ms(16),
        }}>
        <Button
          text="Gallary"
          style={{marginVertical: vs(16)}}
          onPress={onImageLibraryPress}
        />
        <Button text="Camera" onPress={onCameraPress} />
      </Modal>
    </Portal>
  );

  const getHowManyBillsInput = () => (
    <TextInput
      style={[styles.input, {width: '49%'}]}
      placeholder={'Pills'}
      onChangeText={value => setPills(value)}
      underlineColor="transparent"
      isRequired
      value={pills}
      left={
        <PaperInput.Icon
          icon="pill"
          size={24}
          color={AppColors.PRIMARY}
          style={{alignSelf: 'center'}}
        />
      }
      selectProps={{
        items: pillNum,
        mode: 'dropdown',
        onItemsSelected: selectedItems => {
          const formattedValue = selectedItems?.[0]?.dropdownTitle;
          setPills(formattedValue);
          setValue('number_of_pill', formattedValue);
          console.info(getLogMessage('formattedValue'), formattedValue);
        },
        isCheckBox: false,
      }}
    />
  );

  const getHowManyDaysInput = () => (
    <TextInput
      style={[styles.input, {width: '49%'}]}
      placeholder={'Days'}
      underlineColor="transparent"
      isRequired
      value={selectedDays}
      left={
        <PaperInput.Icon
          icon="calendar-week"
          size={24}
          color={AppColors.PRIMARY}
          style={{alignSelf: 'center'}}
        />
      }
      selectProps={{
        items: dayNum,
        mode: 'dropdown',
        onItemsSelected: selectedItems => {
          const formattedValue = selectedItems?.[0]?.dropdownTitle;
          setSelectedDays(formattedValue);
          setValue('number_of_day', formattedValue);
          console.info(getLogMessage('formattedValue'), formattedValue);
        },
        isCheckBox: false,
      }}
    />
  );

  const getFirstTimeInput = () => (
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 13}}>Notification</Text>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TextInput
          style={[
            styles.input,
            {
              width: '80%',
              alignSelf: 'flex-start',
            },
          ]}
          placeholder={'Notifcation'}
          isRequired
          onPressOut={showDatePicker}
          underlineColor="transparent"
          editable={true}
          onPressIn={showDatePicker}
          value={formattedDate}
          left={
            <PaperInput.Icon
              icon="bell"
              size={24}
              color={AppColors.PRIMARY}
              style={{alignSelf: 'center'}}
              onPress={showDatePicker}
            />
          }
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <IconButton
          shouldRasterizeIOS
          iconName="plus"
          size={44}
          style={{
            width: '10%',
            alignSelf: 'center',
            borderRadius: ms(4),
            backgroundColor: AppColors.SECONDARY_CONTAINER,
          }}
        />
      </View>
    </View>
  );

  const rowInput = () => (
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 13}}>
        Amount & How Long ?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {getHowManyBillsInput()}
        {getHowManyDaysInput()}
      </View>
    </View>
  );

  const dinnerIcon = () => (
    <MaterialIcons
      name="dinner-dining"
      size={50}
      style={{alignSelf: 'center'}}
    />
  );
  const pillsIcon = () => (
    <FontAwesome5 name="pill" size={24} style={{alignSelf: 'center'}} />
  );

  const getFoodAndPills = () => (
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 13}}>Food & Pills</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={() => {
            setValue('is_before_eating', true);
            setIsBeforeEating(true);
          }}
          style={{
            backgroundColor: isBeforeEating
              ? AppColors.PRIMARY
              : AppColors.SECONDARY_CONTAINER,
            width: '49%',
            height: ms(80),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: ms(8),
          }}>
          {dinnerIcon()}
          {pillsIcon()}
        </Pressable>
        <Pressable
          onPress={() => {
            setValue('is_before_eating', false);
            setIsBeforeEating(false);
          }}
          style={{
            backgroundColor: isBeforeEating
              ? AppColors.SECONDARY_CONTAINER
              : AppColors.PRIMARY,
            width: '49%',
            height: ms(80),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: ms(8),
          }}>
          {pillsIcon()}
          {dinnerIcon()}
        </Pressable>
      </View>
    </View>
  );

  const inputForm = () => (
    <>
      {getNameInput()}
      {spacerUp(10)}
      {getDescInput()}
      {spacerUp(10)}
      {rowInput()}
      {spacerUp(10)}
      {getFoodAndPills()}
      {spacerUp(10)}
      {getFirstTimeInput()}
    </>
  );

  const spacerUp = (by: number) => <View style={{marginTop: ms(by)}} />;

  return (
    <Screen style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: ms(12),
        }}>
        {spacerUp(20)}
        {AppBackHeader()}
        {spacerUp(20)}
        {
          <Text variant="headlineLarge" style={{fontWeight: 'bold'}}>
            Add Plan
          </Text>
        }
        {spacerUp(20)}
        {inputForm()}
        {showViewModal()}

        <Button
          text="Done"
          onPress={handleSubmit(onSubmitPress)}
          style={{
            alignSelf: 'center',
            marginTop: ms(40),
            borderRadius: 8,
            width: '100%',
            justifyContent: 'center',
            height: vs(48),
          }}
        />

        <Button
          text="Done"
          onPress={() => addNotification()}
          style={{
            alignSelf: 'center',
            marginTop: ms(40),
            borderRadius: 8,
            width: '100%',
            justifyContent: 'center',
            height: vs(48),
          }}
        />
      </ScrollView>
    </Screen>
  );
});
