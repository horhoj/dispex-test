import { HouseFlat } from '../types/HouseFlat';
import { axiosInstance } from '~/api/apiTransport';

const fetchHouseFlatsList = async (id: number) => {
  const FLAT_TYPE_ID = 3;
  const res = await axiosInstance<HouseFlat[]>({
    url: `/Request/house_flats/${id}`,
  });
  //выбираем только квартиры без подъездов и домов
  return res.data.filter((item) => item.typeId === FLAT_TYPE_ID);
};

export const houseFlatsApi = { fetchHouseFlatsList };
