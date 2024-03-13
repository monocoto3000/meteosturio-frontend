import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Menú principal', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Solicitudes', href: paths.dashboard.customers, icon: 'users' },
  { key: 'integrations', title: 'Administracion de estaciones', href: paths.dashboard.integrations, icon: 'plugs-connected' },
] satisfies NavItemConfig[];
