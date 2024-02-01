import AppColors from 'enums/AppColors';
import React, {useEffect} from 'react';
import {TouchableHighlight, View} from 'react-native';
import {FAB, Icon} from 'react-native-paper';
import {ScaledSheet, ms, vs} from 'react-native-size-matters';
import {
  FlatList,
  IconButton,
  ScrollView,
  Text,
  TextInput,
} from 'roqay-react-native-common-components';
import {TextInput as PaperInput} from 'react-native-paper';
import Screen from 'components/Screen';
import styles from 'screens/add/styles';
import AppImages from 'enums/AppImages';
import VectorImage from 'react-native-vector-image';
import {RootStackScreenProps} from 'types/navigation';
import {getAllMedical, removeMedicalFromLocalStorage} from 'core/LocalStorage';
import {AddMedicalModel} from 'data/AddMedicalModel';
import Swipeable from 'react-native-swipeable';
import {useDispatch, useSelector} from 'react-redux';
import {getAllMedicalsStore, removeMedicalFromStore} from 'store/user';
import {type RootState} from 'store';

export default React.memo((props: RootStackScreenProps<'Home'>) => {
  const {navigation} = props;
  const [searchText, setSearchText] = React.useState('');

  const medicals = useSelector((state: RootState) => state.user.medicals);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const medicalData = await getAllMedical();
      dispatch(getAllMedicalsStore(medicalData));
    };
    fetchData();
  }, [dispatch]);

  const rightButtons = (item: AddMedicalModel) => [
    <View
      style={{
        justifyContent: 'center',
        height: '100%',
      }}>
      <TouchableHighlight key="deleteButton">
        <IconButton
          iconName="delete"
          onPress={async () => {
            dispatch(removeMedicalFromStore(item));
            removeMedicalFromLocalStorage(item);
          }}
          shouldRasterizeIOS
          style={{
            alignItems: 'center',
          }}
        />
      </TouchableHighlight>
    </View>,
  ];

  const renderItem = ({item}: {item: AddMedicalModel}) => (
    <Swipeable rightButtons={rightButtons(item)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          padding: ms(8),
          backgroundColor: AppColors.SECONDARY_CONTAINER,
          borderRadius: ms(8),
        }}>
        <View style={{width: '10%'}} shouldRasterizeIOS>
          <Icon source={'pill'} size={24} />
        </View>

        <View style={{width: '80%'}} shouldRasterizeIOS>
          <View>
            <Text style={{fontWeight: 'bold'}}>{item.pillName}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              shouldRasterizeIOS>
              <Text style={{fontWeight: '100'}}>
                Pills : {item.number_of_pill}
              </Text>
              <Text style={{fontWeight: '100'}}>
                Days : {item.number_of_day}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              shouldRasterizeIOS>
              <Text style={{fontWeight: '100'}}>{item.description}</Text>
              <Text style={{fontWeight: '100'}}>{item.notification}</Text>
            </View>
          </View>
        </View>

        <View style={{width: '10%'}} shouldRasterizeIOS>
          <Icon source={'chevron-right'} size={24} />
        </View>
      </View>
    </Swipeable>
  );

  const searchInput = () => (
    <TextInput
      style={[styles.input]}
      placeholder={'Search'}
      onChangeText={value => setSearchText(value)}
      underlineColor="transparent"
      value={searchText}
      activeUnderlineColor="transparent"
      left={
        <PaperInput.Icon
          icon="magnify"
          size={24}
          color={AppColors.PRIMARY}
          style={{alignSelf: 'center'}}
        />
      }
    />
  );

  const medicalList = () => (
    <View style={{flex: 1}}>
      <Text variant="bodyLarge" style={{fontWeight: '700'}}>
        Daily Review
      </Text>

      <FlatList
        renderItem={renderItem}
        data={medicals}
        keyExtractor={item => item}
        contentContainerStyle={{
          paddingHorizontal: 0,
          marginTop: ms(8),
        }}
        ItemSeparatorComponent={() => <View style={{height: vs(12)}} />}
      />
    </View>
  );
  const spacerUp = (by: number) => <View style={{marginTop: ms(by)}} />;

  const homeImageContent = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: AppColors.CONTAINER_IMAGE,
        borderRadius: ms(16),
        padding: ms(8),
      }}>
      <View>
        <Text
          variant="bodyLarge"
          style={{margin: 0, padding: 0, fontWeight: 'bold'}}>
          Your Plan {'\n'}for Today
        </Text>
        <Text
          variant="bodySmall"
          style={{
            margin: 0,
            padding: 0,
            fontWeight: '100',
            marginTop: ms(16),
          }}>
          number of bills today : {medicals.length}
        </Text>
      </View>
      <VectorImage
        source={AppImages.CONTAINER_IMAGE}
        style={{
          width: '50%',
          height: ms(120),
          alignSelf: 'flex-end',
        }}
        resizeMode="contain"
      />
    </View>
  );

  const pageContent = () => (
    <>
      {spacerUp(20)}
      {searchInput()}
      {spacerUp(20)}
      {homeImageContent()}
      {spacerUp(20)}
      {medicalList()}
    </>
  );

  return (
    <Screen style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: ms(12),
        }}>
        {pageContent()}
      </ScrollView>
      <FAB
        mode="elevated"
        size="medium"
        icon="plus"
        onPress={() => navigation.navigate('AddMedical')}
        style={homeStyles.fab}
      />
    </Screen>
  );
});

const homeStyles = ScaledSheet.create({
  bottom: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: 'absolute',
    right: 16,
    backgroundColor: AppColors.PRIMARY,
    bottom: 0,
  },
});
