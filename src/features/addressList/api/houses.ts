import { House } from '../types/House';
import { axiosInstance } from '~/api/apiTransport';

const fetchHouseList = async (id: number) => {
  const res = await axiosInstance.request<House[]>({
    url: `/Request/houses/${id}`,
  });

  return res.data;
};

export const housesApi = { fetchHouseList } as const;
