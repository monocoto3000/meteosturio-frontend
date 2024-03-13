import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { CustomersTable } from '@/components/dashboard/solicitudes/customers-table';
import type { Customer } from '@/components/dashboard/solicitudes/customers-table';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = [
  {
    id: 'USR-010',
    name: 'Cesar Saul',
    email: 'Cesar@gmail.com',
    direccion: { city: 'Madrid', country: 'Spain', state: 'Comunidad de Madrid', street: '4158 Hedge Street' },
    createdAt: "La estacion tiene que ser de color rosa",
  },
  {
    id: 'USR-009',
    name: 'Mónica Mundo',
    email: 'Mónica@gmail.com',
    direccion: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: "La estacion tiene que ser de color rosa",
  },
  {
    id: 'USR-008',
    name: 'Diego Yovani',
    email: 'DiegoYovani@gmail.com',
    direccion: { city: 'North Canton', country: 'USA', state: 'Ohio', street: '4894 Lakeland Park Drive' },
    createdAt: "La estacion tiene que ser de color rosa",
  },
  {
    id: 'USR-007',
    name: 'Norma Serrano',
    email: 'Norma@gmail.com',
    direccion: { city: 'Salt Lake City', country: 'USA', state: 'Utah', street: '368 Lamberts Branch Road' },
    createdAt: "La estacion tiene que ser de color rosa",
  },
  {
    id: 'USR-006',
    name: 'Pepe Cruz',
    email: 'pepito@gmail.com',
    direccion: { city: 'Murray', country: 'USA', state: 'Utah', street: '3934 Wildrose Lane' },
    createdAt: "La estacion tiene que ser de color rosa",
  },
  {
    id: 'USR-005',
    name: 'Mateo Estudio',
    email: 'Mateo@gmail.com',
    direccion: { city: 'Atlanta', country: 'USA', state: 'Georgia', street: '1865 Pleasant Hill Road' },
    createdAt: "La estacion tiene que ser de color rosa",
  },

  {
    id: 'USR-004',
    name: 'Marco Arellanez',
    email: 'Marco@gmail.com',
    direccion: { city: 'Berkeley', country: 'USA', state: 'California', street: '317 Angus Road' },
    createdAt: "La estacion tiene que ser de color rosa",
  }
] satisfies Customer[];

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Solicitudes de estaciones</Typography>
        </Stack>
      </Stack>
      <CustomersTable
        rows={customers}
      />
    </Stack>
  );
}

