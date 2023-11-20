import { FC } from 'react';
import { routeList } from './routeList';

export interface RouteItem {
  id: string;
  name: string;
  title?: string;
  path: string;
  component: FC;
  inMenu: boolean;
}

export type RouteNameList = (typeof routeList)[number]['name'];
