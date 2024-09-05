import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ObjectFormSchema, ObjectGeneralForm } from '../types';
import { StateSchema } from '@/1_app/providers/StoreProvider';

export const initialState: ObjectFormSchema = {
  data: {},
};

export const objectFormSlice = createSlice({
  name: 'objectForm',
  initialState,
  reducers: {
    updateGeneralFormData: (
      state,
      action: PayloadAction<ObjectGeneralForm>,
    ) => {
      state.data.general = action.payload;
    },
  },
});

export const objectFormSelectors = {
  getGeneralData: (state: StateSchema) => state.objectForm.data.general,
  getLocationData: (state: StateSchema) => state.objectForm.data.location,
  getPhotoData: (state: StateSchema) => state.objectForm.data.photo,
  getAgentData: (state: StateSchema) => state.objectForm.data.agent,
  getLinksData: (state: StateSchema) => state.objectForm.data.links,
};

export const { actions: objectFormActions, reducer: objectFormReducer } =
  objectFormSlice;
