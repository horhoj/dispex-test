import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { streetApi } from '../api/streets';
import { Street } from '../types/Street';
import { housesApi } from '../api/houses';
import { House } from '../types/House';
import { houseFlatsApi } from '../api/houseFlats';
import { HouseFlat } from '../types/HouseFlat';
import { AddClientData, Client } from '../types/Client';
import { clientsApi } from '../api/clientList';
import { CurrentFlat } from './../types/common';
import {
  RequestList,
  RequestStateProperty,
  getErrorMsg,
  makeRequestExtraReducer,
  makeRequestStateProperty,
} from '~/store/helpers';
import { RootState } from '~/store/types';

const SLICE_NAME = 'addressList';

interface IS {
  fetchStreetListRequest: RequestStateProperty<Street[], unknown>;
  fetchHouseListRequest: RequestStateProperty;
  houseData: Record<number, House[]>;
  fetchHouseFlatListRequest: RequestStateProperty;
  houseFlatData: Record<number, HouseFlat[]>;
  currentFlat: CurrentFlat | null;
  fetchClientListRequest: RequestStateProperty<Client[], unknown>;
  deleteClientRequest: RequestStateProperty;
  addClientRequest: RequestStateProperty;
}

const initialState: IS = {
  fetchStreetListRequest: makeRequestStateProperty<Street[], unknown>(),
  fetchHouseListRequest: makeRequestStateProperty(),
  houseData: {},
  fetchHouseFlatListRequest: makeRequestStateProperty(),
  houseFlatData: {},
  currentFlat: null,
  fetchClientListRequest: makeRequestStateProperty<Client[], unknown>(),
  deleteClientRequest: makeRequestStateProperty(),
  addClientRequest: makeRequestStateProperty(),
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
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      addClientThunk,
      'addClientRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      deleteClientThunk,
      'deleteClientRequest',
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

interface DeleteClientThunkPayload {
  clientId: number;
  addressId: number;
}

const deleteClientThunk = createAsyncThunk(
  `${SLICE_NAME}/deleteClientThunk`,
  async ({ addressId, clientId }: DeleteClientThunkPayload, store) => {
    try {
      await clientsApi.deleteClient(clientId);
      store.dispatch(fetchClientListThunk(addressId));
      return null;
    } catch (e) {
      return store.rejectWithValue(getErrorMsg(e));
    }
  },
);

interface AddClientThunkPayload {
  clientData: AddClientData;
  addressId: number;
  successCb: () => void;
}

const addClientThunk = createAsyncThunk(
  `${SLICE_NAME}/addClientThunk`,
  async (
    { addressId, clientData, successCb }: AddClientThunkPayload,
    store,
  ) => {
    try {
      await clientsApi.addClient(clientData, addressId);
      store.dispatch(fetchClientListThunk(addressId));
      successCb();
      return null;
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
    deleteClientThunk,
    addClientThunk,
  },
} as const;

export const addressListLoadingSelector = (state: RootState) =>
  state.addressList.addClientRequest.isLoading ||
  state.addressList.deleteClientRequest.isLoading ||
  state.addressList.deleteClientRequest.isLoading ||
  state.addressList.fetchClientListRequest.isLoading ||
  state.addressList.fetchHouseFlatListRequest.isLoading ||
  state.addressList.fetchStreetListRequest.isLoading;

//ЗДЕСЬ МЫ МОЖЕМ ПОЛУЧИТЬ ОШИБКУ ПО ЛЮБОМУ СЕТЕВОМУ ЗАПРОСУ
//НО В РАМКАМ ТЕСТОВОГО ЗАДАНИЯ Я ДЛЯ ПРОСТОТЫ ПРОСТО ВЫВЕДУ ОБЩЕЕ СООБЩЕНИЕ О СЕТЕВОЙ ОШИБКЕ
export const addressListErrorSelector = (state: RootState) =>
  state.addressList.addClientRequest.error !== null ||
  state.addressList.deleteClientRequest.error !== null ||
  state.addressList.deleteClientRequest.error !== null ||
  state.addressList.fetchClientListRequest.error !== null ||
  state.addressList.fetchHouseFlatListRequest.error !== null ||
  state.addressList.fetchStreetListRequest.error !== null;
