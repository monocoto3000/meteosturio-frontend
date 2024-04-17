"use client"
import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Card, CardContent, Typography, TextField } from '@mui/material';
import { Metrics } from '@/components/dashboard/overview/metrics-card';
import { DownloadDocs } from '@/components/dashboard/overview/download-doc';
import { MetricsCharts } from '@/components/dashboard/overview/chart';
import { useEffect } from 'react';
import axios from 'axios';

import { Drop } from '@phosphor-icons/react/dist/ssr/Drop';
import { Thermometer } from '@phosphor-icons/react/dist/ssr/Thermometer';
import { Radioactive } from '@phosphor-icons/react/dist/ssr/Radioactive';
import { io } from 'socket.io-client';


const data = [
  {
    stationId: "Monica",
    temperature: { currentData: 20, max: 35, min: 15 },
    humidity: { currentData: 70, max: 79, min: 65 },
    radiation: { currentData: 23, max: 42, min: 15 },
    chartsData: {
      temperature: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
      humidity: [18, 16, 5, 8, 3, 14, 22, 16, 17, 19, 18, 20],
      radiation: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
    }
  }
];

export default function Page(): React.JSX.Element {

  const baseURL = 'http://localhost:8080/paciente/getAll';
  const [data, setData] = useState([]);
  const [rtdata, setRtdata] = useState(null);
  const [average, setAverage] = useState(null);


  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.post(baseURL, {
      params: {
        "stationId": "1"
      }
    })
      .then(response => {
        if (response != null) {
          setData(response?.data);
        }
      })
      .catch(error => {
        console.log(error)
      });
  }, []);

  const socket = io('http://localhost:4000');

  socket.on('rtdata', (data: any) => {
    console.log(data)
    setRtdata(data)
  });

  socket.on('averages', (data: any) => {
    console.log(data)
    setAverage(data)
  });

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleAccept = () => {
    if (selectedStation !== null) {
      setShowDashboard(true);
    }
  };

  return (
    <Grid container spacing={2}>
      {!showDashboard && (
        <Grid container lg={12} justifyContent="center">
          <Grid item lg={6} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" style={{ margin: 10 }}>
                  Seleccione una estación
                </Typography>
                <Autocomplete
                  style={{ margin: 10 }}
                  options={data.map(station => station.stationId)}
                  onChange={(event, value) => setSelectedStation(value)}
                  renderInput={(params) => <TextField {...params} label="Estación" />}
                />
                <Button variant="contained" onClick={handleAccept} fullWidth>Aceptar</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {showDashboard && (
        <>
          <Grid container spacing={2}>
            <Grid container xs={12}>
              <Tabs value={selectedTab} onChange={handleChangeTab} indicatorColor="secondary">
                {data.map((station, index) => (
                  <Tab key={index} label={station.stationId} />
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
        </>
      )}
    </Grid>
  );
}
