import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Menú principal', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Solicitudes', href: paths.dashboard.customers, icon: 'users' },
  { key: 'integrations', title: 'Administracion de estaciones', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
