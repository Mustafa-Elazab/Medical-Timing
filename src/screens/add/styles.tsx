import AppColors from 'enums/AppColors';
import {ScaledSheet, ms, vs} from 'react-native-size-matters';

const addMedicalStyles = ScaledSheet.create({
  input: {
    marginTop: vs(0),
    height: vs(40),
    borderRadius: ms(4),
    backgroundColor: AppColors.SECONDARY_CONTAINER,
  },
  button: {
    alignSelf: 'center',
    marginTop: ms(40),
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    height: vs(48),
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: vs(48),
    flex: 1,
  },
  largeHeader: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: vs(8),
    alignSelf: 'center',
  },
  bottomContent: {
    alignSelf: 'center',
    borderRadius: 0,
  },
  appBar: {
    aspectRatio: 1,
    height: ms(48),
    borderRadius: ms(4),
    backgroundColor: AppColors.SECONDARY_CONTAINER,
  },
  foodPill: {
    width: '49%',
    height: ms(80),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(8),
  },
  rowFullWidthSpaceBetween: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageRound: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'red',
    width: '90%',
    alignSelf: 'center',
    marginTop: ms(16),
  },
});

export default addMedicalStyles;
