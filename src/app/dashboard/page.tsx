import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';

//Componentes finalizados 
import { Metrics } from '@/components/dashboard/overview/metrics-card';
import { DownloadDocs } from '@/components/dashboard/overview/download-doc';
import { MetricsCharts } from '@/components/dashboard/overview/chart';

//Icons 
import { Drop } from '@phosphor-icons/react/dist/ssr/Drop';
import { Thermometer } from '@phosphor-icons/react/dist/ssr/Thermometer';
import { Radioactive } from '@phosphor-icons/react/dist/ssr/Radioactive';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
      <Grid container spacing={2}>
        <Grid container lg={4} spacing={2} direction={'column'}>
          <Grid lg={12} xs={12}>
            <Metrics
              dataType="Temperatura"
              currentData={20}
              value="°C"
              max={35}
              min={16}
              icon={<Thermometer size={32} />} />
          </Grid>
          <Grid lg={12} xs={12}>
            <Metrics
              dataType="Humedad"
              currentData={70}
              value="%"
              max={85}
              min={60}
              icon={<Drop size={32} />} />
          </Grid>
          <Grid lg={12} xs={12}>
            <Metrics
              dataType="Radación"
              currentData={20}
              value="V"
              max={35}
              min={16}
              icon={<Radioactive size={32} />} />
          </Grid>
          <Grid lg={12} xs={12}>
            <DownloadDocs />
          </Grid>
        </Grid>
        <Grid container lg={8} spacing={2}>
          <Grid lg={12} xs={12}>
            <MetricsCharts
              chartSeries={[
                { name: 'Temperatura', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] }
              ]}
              sx={{ height: '100%' }}
              title="Temperatura"
              metric="°C"
              color="#FF953D" />
          </Grid>
          <Grid lg={12} xs={12}>
            <MetricsCharts
              chartSeries={[
                { name: 'Humedad', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] }
              ]}
              sx={{ height: '100%' }}
              title="Humedad"
              metric="%"
              color="#3D84FF" />
          </Grid>
          <Grid lg={12} xs={12}>
            <MetricsCharts
              chartSeries={[
                { name: 'Radiación', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] }
              ]}
              sx={{ height: '100%' }}
              title="Radiación"
              metric="V"
              color="#FF403D" />
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid lg={4} md={6} xs={12}>
        <LatestProducts
          products={[
            {
              id: 'PRD-005',
              name: 'Soja & Co. Eucalyptus',
              image: '/assets/product-5.png',
              updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
            },
            {
              id: 'PRD-004',
              name: 'Necessaire Body Lotion',
              image: '/assets/product-4.png',
              updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-003',
              name: 'Ritual of Sakura',
              image: '/assets/product-3.png',
              updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-002',
              name: 'Lancome Rouge',
              image: '/assets/product-2.png',
              updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
            },
            {
              id: 'PRD-001',
              name: 'Erbology Aloe Vera',
              image: '/assets/product-1.png',
              updatedAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid> */}
      {/* <Grid lg={8} md={12} xs={12}>
        <LatestOrders
          orders={[
            {
              id: 'ORD-007',
              customer: { name: 'Ekaterina Tankova' },
              amount: 30.5,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-006',
              customer: { name: 'Cao Yu' },
              amount: 25.1,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-004',
              customer: { name: 'Alexa Richardson' },
              amount: 10.99,
              status: 'refunded',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-003',
              customer: { name: 'Anje Keizer' },
              amount: 96.43,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-002',
              customer: { name: 'Clarke Gillebert' },
              amount: 32.54,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-001',
              customer: { name: 'Adam Denisov' },
              amount: 16.76,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid> */}
    </>
  );
}
