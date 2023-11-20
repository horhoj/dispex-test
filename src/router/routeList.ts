import { RouteItem } from './types';
import { Page404 } from '~/app/pages/Error404Page';
import { AboutPage } from '~/features/about/pages/AboutPage';
import { AddressListPage } from '~/features/addressList/pages/AddressListPage';
import { getUUID } from '~/utils/getUUID';

export const routeList = [
  {
    id: getUUID(),
    name: 'addressList',
    path: '/address-list',
    title: 'Список адресов с жильцами',
    component: AddressListPage,
    inMenu: true,
  },
  {
    id: getUUID(),
    name: 'about',
    path: '/about',
    title: 'о проекте',
    component: AboutPage,
    inMenu: true,
  },
  {
    id: getUUID(),
    name: 'error404',
    path: '*',
    title: '',
    component: Page404,
    inMenu: false,
  },
] as const satisfies readonly RouteItem[];
