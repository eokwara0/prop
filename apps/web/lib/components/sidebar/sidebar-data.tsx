import {
  Inbox,
  DraftingCompass,
  User,
  Dock,
  Wallet,
  Wrench,
  ChartBar,
  Box,
} from 'lucide-react';
import { SideBarDataType } from './sidebar';

const data: SideBarDataType[] = [
  {
    name: 'Dashboard',
    icon: Box,
    href: '/app',
    active: false,
  },
  {
    name: 'Properties',
    icon: Inbox,
    href: '/app/properties',
    active: false,
  },
  {
    name: 'Units',
    icon: DraftingCompass,
    href: '/app/units',
    active: false,
  },
  {
    name: 'Tenants',
    icon: User,
    href: '/app/tenants',
    active: false,
  },
  {
    name: 'Leases',
    icon: Dock,
    href: '/app/leases',
    active: false,
  },
  {
    name: 'Payments',
    icon: Wallet,
    href: '/app/payments',
    active: false,
  },
  {
    name: 'Maintenance',
    icon: Wrench,
    href: '/app/maintenance',
    active: false,
  },
  {
    name: 'Reports',
    icon: ChartBar,
    href: '/app/reports',
    active: false,
  },
];

export { data as SideBarData };
