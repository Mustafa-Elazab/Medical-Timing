import Screen from 'components/Screen';
import AppColors from 'enums/AppColors';
import React from 'react';
import {View} from 'react-native';
import {TextInput as PaperInput} from 'react-native-paper';
import {ms} from 'react-native-size-matters';
import {
  Button,
  IconButton,
  ScrollView,
  Text,
  TextInput,
} from 'roqay-react-native-common-components';

export default React.memo((props: RootStackScreenProps<'Home'>) => {
  const {navigation} = props;
  const [text, setText] = React.useState('');

  const searchContent = () => (
    <TextInput
      style={{
        backgroundColor: AppColors.GRAY,
        alignSelf: 'center',
      }}
      placeholder="Search"
      mode="outlined"
      value={text}
      onChangeText={text => setText(text)}
      left={
        <PaperInput.Icon
          icon="account"
          size={24}
          color={AppColors.PRIMARY}
          style={{alignSelf: 'center'}}
        />
      }
    />
  );

  const welcomeText = () => (
    <View>
      <Text
        variant="headlineMedium"
        size={40}
        style={{
          fontWeight: 'bold',
          margin: 0,
          padding: 0,
        }}>
        Hello,{'\n'}Mostafa
      </Text>
      <Text variant="headlineMedium" size={40} style={{margin: 0, padding: 0}}>
        Mostafa
      </Text>
    </View>
  );

  const addButton = () => (
    <Button
      startIconName="check"
      text="Add Medical"
      size={48}
      color="white"
      shouldRasterizeIOS
      onPress={() => navigation.navigate('AddMedical')}
      style={{
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.PRIMARY,
        borderRadius: ms(8),
        paddingHorizontal: ms(4),
        height: ms(48),
        position: 'absolute',
        bottom: 0,
      }}
    />
  );

  const pageContent = () => (
    <View style={{flex: 1}}>
      {searchContent()}
      {welcomeText()}
      {addButton()}
    </View>
  );

  return (
    <Screen style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{marginHorizontal: ms(16), marginTop: ms(16)}}>
        <>{pageContent()}</>
      </ScrollView>
    </Screen>
  );
});
