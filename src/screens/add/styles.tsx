import AppColors from 'enums/AppColors';

const {ScaledSheet, ms} = require('react-native-size-matters');

const addStyles = ScaledSheet.create({
  textInput: {
    backgroundColor: AppColors.GRAY,
    height: ms(44),
    borderRadius: ms(4),
    justifyContent: 'center',
    alignContent: 'center',
  },
  foodContainer: {
    width: '32%',
    height: ms(100),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: AppColors.PRIMARY,
    borderRadius: ms(8),
  },
});

export default addStyles;
