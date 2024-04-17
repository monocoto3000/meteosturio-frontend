"use client"
import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Metrics } from '@/components/dashboard/overview/metrics-card';
import { DownloadDocs } from '@/components/dashboard/overview/download-doc';
import { MetricsCharts } from '@/components/dashboard/overview/chart';

import { Drop } from '@phosphor-icons/react/dist/ssr/Drop';
import { Thermometer } from '@phosphor-icons/react/dist/ssr/Thermometer';
import { Radioactive } from '@phosphor-icons/react/dist/ssr/Radioactive';

const data = [
  {
    stationName: "Monica",
    temperature: { currentData: 20, max: 35, min: 15 },
    humidity: { currentData: 70, max: 79, min: 65 },
    radiation: { currentData: 23, max: 42, min: 15 },
    chartsData: {
      temperature: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
      humidity: [18, 16, 5, 8, 3, 14, 22, 16, 17, 19, 18, 20],
      radiation: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
    }
  },
  {
    stationName: "Cesar",
    temperature: { currentData: 32, max: 37, min: 13 },
    humidity: { currentData: 74, max: 87, min: 33 },
    radiation: { currentData: 34, max: 62, min: 12 },
    chartsData: {
      temperature: [22, 24, 18, 19, 20, 22, 25, 28, 29, 31, 32, 33],
      humidity: [62, 64, 63, 65, 68, 70, 72, 74, 76, 78, 80, 82],
      radiation: [28, 30, 32, 33, 34, 35, 36, 38, 40, 42, 44, 45]
    }
  }
];

export default function Page(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };


  return (
    <Grid container spacing={2}>
      <Grid container xs={12}>
        <Tabs value={selectedTab} onChange={handleChangeTab} indicatorColor="secondary">
          {data.map((station, index) => (
            <Tab key={index} label={station.stationName} />
          ))}
        </Tabs>
      </Grid>
      <Grid container lg={4} spacing={2} direction={'column'}>
        <Grid lg={12} xs={12}>
          <Metrics
            dataType="Temperatura"
            currentData={data[selectedTab].temperature.currentData}
            value="°C"
            max={data[selectedTab].temperature.max}
            min={data[selectedTab].temperature.min}
            icon={<Thermometer size={32} />}
          />
        </Grid>
        <Grid lg={12} xs={12}>
          <Metrics
            dataType="Humedad"
            currentData={data[selectedTab].humidity.currentData}
            value="%"
            max={data[selectedTab].humidity.max}
            min={data[selectedTab].humidity.min}
            icon={<Drop size={32} />}
          />
        </Grid>
        <Grid lg={12} xs={12}>
          <Metrics
            dataType="Radación"
            currentData={data[selectedTab].radiation.currentData}
            value="V"
            max={data[selectedTab].radiation.max}
            min={data[selectedTab].radiation.min}
            icon={<Radioactive size={32} />}
          />
        </Grid>
        <Grid lg={12} xs={12}>
          <DownloadDocs />
        </Grid>
      </Grid>
      <Grid container lg={8} spacing={2}>
        <Grid lg={12} xs={12}>
          <MetricsCharts
            chartSeries={[
              { name: 'Humedad', data: data[selectedTab].chartsData.temperature }
            ]}
            sx={{ height: '100%' }}
            title="Temperatura"
            metric="°C"
            color="#FF953D"
          />
        </Grid>
        <Grid lg={12} xs={12}>
          <MetricsCharts
            chartSeries={[
              { name: 'Humedad', data: data[selectedTab].chartsData.humidity }
            ]}
            sx={{ height: '100%' }}
            title="Humedad"
            metric="%"
            color="#3D84FF"
          />
        </Grid>
        <Grid lg={12} xs={12}>
          <MetricsCharts
            chartSeries={[
              { name: 'Radiación', data: data[selectedTab].chartsData.radiation }
            ]}
            sx={{ height: '100%' }}
            title="Radiación"
            metric="V"
            color="#FF403D"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
