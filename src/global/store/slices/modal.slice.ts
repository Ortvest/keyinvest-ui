import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState, ModalType } from '@shared/enums/Modal.enums';

const initialState: ModalState = {
  type: null,
};

export const ModalSlice = createSlice({
  name: 'ModalSlice',
  initialState,
  reducers: {
    setModalType(state, action: PayloadAction<ModalType | null>) {
      state.type = action.payload;
    },
  },
});

export const ModalReducer = ModalSlice.reducer;
