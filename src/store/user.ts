import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {AddMedicalModel} from 'data/AddMedicalModel';

import type {User} from 'types';

interface UserState {
  user?: User;
  medicals?: AddMedicalModel[];
}

const initialState = {user: undefined, medicals: undefined} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = undefined;
    },
    getAllMedicalsStore(state, action: PayloadAction<AddMedicalModel[]>) {
      state.medicals = action.payload;
    },
    setMedicalToStore(state, action: PayloadAction<AddMedicalModel>) {
      state.medicals?.push(action.payload);
    },
    removeMedicalFromStore(state, action: PayloadAction<AddMedicalModel>) {
      const medicalToRemove = action.payload;
      state.medicals = state.medicals?.filter(
        medical => medical.id !== medicalToRemove.id,
      );
    },
  },
});

export const {
  setUser,
  removeUser,
  getAllMedicalsStore,
  removeMedicalFromStore,
  setMedicalToStore,
} = userSlice.actions;

export default userSlice.reducer;
