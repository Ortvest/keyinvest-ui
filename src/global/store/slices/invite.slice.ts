import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InviteData } from '@shared/interfaces/Invite.interfaces';

interface InviteState {
  inviteInfo: InviteData;
}

const initialState: InviteState = {
  inviteInfo: {
    fullName: '',
    email: '',
    investmentsExperience: '',
  },
};

const inviteSlice = createSlice({
  name: 'invite',
  initialState,
  reducers: {
    setInviteInfo: (state, action: PayloadAction<InviteData>) => {
      state.inviteInfo = action.payload;
    },
    clearInviteInfo: (state) => {
      state.inviteInfo = initialState.inviteInfo;
    },
  },
});

export const { setInviteInfo, clearInviteInfo } = inviteSlice.actions;

export const InviteReducer = inviteSlice.reducer;
