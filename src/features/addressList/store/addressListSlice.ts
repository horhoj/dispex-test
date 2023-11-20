import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { streetApi } from '../api/streets';
import { Street } from '../types/Street';
import { housesApi } from '../api/houses';
import { House } from '../types/House';
import { houseFlatsApi } from '../api/houseFlats';
import { HouseFlat } from '../types/HouseFlat';
import { Client } from '../types/Client';
import { clientsApi } from '../api/clientList';
import { CurrentFlat } from './../types/common';
import {
  RequestList,
  RequestStateProperty,
  getErrorMsg,
  makeRequestExtraReducer,
  makeRequestStateProperty,
} from '~/store/helpers';

const SLICE_NAME = 'addressList';

interface IS {
  fetchStreetListRequest: RequestStateProperty<Street[], unknown>;
  fetchHouseListRequest: RequestStateProperty;
  houseData: Record<number, House[]>;
  fetchHouseFlatListRequest: RequestStateProperty;
  houseFlatData: Record<number, HouseFlat[]>;
  currentFlat: CurrentFlat | null;
  fetchClientListRequest: RequestStateProperty<Client[], unknown>;
}

const initialState: IS = {
  fetchStreetListRequest: makeRequestStateProperty<Street[], unknown>(),
  fetchHouseListRequest: makeRequestStateProperty(),
  houseData: {},
  fetchHouseFlatListRequest: makeRequestStateProperty(),
  houseFlatData: {},
  currentFlat: null,
  fetchClientListRequest: makeRequestStateProperty<Client[], unknown>(),
};

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addHouseData: (
      state,
      action: PayloadAction<{ id: number; houseData: House[] }>,
    ) => {
      state.houseData[action.payload.id] = action.payload.houseData;
    },
    removeHouseData: (state, action: PayloadAction<{ id: number }>) => {
      delete state.houseData[action.payload.id];
    },
    clear: () => initialState,
    addHouseFlatData: (
      state,
      action: PayloadAction<{ id: number; houseFlatData: HouseFlat[] }>,
    ) => {
      state.houseFlatData[action.payload.id] = action.payload.houseFlatData;
    },
    removeHouseFlatData: (state, action: PayloadAction<{ id: number }>) => {
      delete state.houseFlatData[action.payload.id];
    },
    setCurrentFlatId: (
      state,
      action: PayloadAction<{ currentFlat: CurrentFlat | null }>,
    ) => {
      state.currentFlat = action.payload.currentFlat;
    },
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchStreetListThunk,
      'fetchStreetListRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchHouseListThunk,
      'fetchHouseListRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchHouseFlatListThunk,
      'fetchHouseFlatListRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchClientListThunk,
      'fetchClientListRequest',
    );
  },
});

const fetchStreetListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchStreetListThunk`,
  async (_, store) => {
    try {
      const res = await streetApi.fetchStreetList();
      return store.fulfillWithValue(res);
    } catch (e) {
      return store.rejectWithValue(getErrorMsg(e));
    }
  },
);

const fetchHouseListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchHouseListThunk`,
  async (id: number, store) => {
    try {
      const res = await housesApi.fetchHouseList(id);
      store.dispatch(slice.actions.addHouseData({ id, houseData: res }));
      return null;
    } catch (e) {
      return store.rejectWithValue(getErrorMsg(e));
    }
  },
);

const fetchHouseFlatListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchHouseFlatListThunk`,
  async (id: number, store) => {
    try {
      const res = await houseFlatsApi.fetchHouseFlatsList(id);
      store.dispatch(
        slice.actions.addHouseFlatData({ id, houseFlatData: res }),
      );
      return null;
    } catch (e) {
      return store.rejectWithValue(getErrorMsg(e));
    }
  },
);

const fetchClientListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchClientListThunk`,
  async (addressId: number, store) => {
    try {
      const res = await clientsApi.fetchClientList(addressId);
      return store.fulfillWithValue(res);
    } catch (e) {
      return store.rejectWithValue(getErrorMsg(e));
    }
  },
);

export const addressListSlice = {
  reducer: slice.reducer,
  actions: slice.actions,
  thunks: {
    fetchStreetListThunk,
    fetchHouseListThunk,
    fetchHouseFlatListThunk,
    fetchClientListThunk,
  },
} as const;