import AppColors from 'enums/AppColors';
import {ScaledSheet, ms, vs} from 'react-native-size-matters';

const addMedicalStyles = ScaledSheet.create({
  input: {
    marginTop: vs(0),
    height: vs(48),
    borderRadius: ms(4),
    backgroundColor: AppColors.SECONDARY_CONTAINER,
  },
  button: {
    width: '90%',
    marginTop: vs(24),
    alignSelf: 'center',
    borderRadius: ms(8),
    height: vs(48),
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default addMedicalStyles;
