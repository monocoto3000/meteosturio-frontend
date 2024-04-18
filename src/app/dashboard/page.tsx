"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Metrics } from '@/components/dashboard/overview/metrics-card';
import { DownloadDocs } from '@/components/dashboard/overview/download-doc';
import { MetricsCharts } from '@/components/dashboard/overview/chart';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Drop } from '@phosphor-icons/react/dist/ssr/Drop';
import { Thermometer } from '@phosphor-icons/react/dist/ssr/Thermometer';
import { Radioactive } from '@phosphor-icons/react/dist/ssr/Radioactive';

export default function Page(): React.JSX.Element {

  const baseURL_max = 'http://localhost:3001/data/max';
  const baseURL_min = 'http://localhost:3001/data/min';
  const baseURL_data = 'http://localhost:3001/data/station';

  const [minData, setMinData] = useState(null);
  const [maxData, setMaxData] = useState(null);
  const [rtData, setRtData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [stationOptions, setStationOptions] = useState([]);

  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.post(baseURL_max, { "stationId": selectedStation })
      .then(response => {
        if (response != null) {
          console.log("max", response.data)
          setMaxData(response.data);
        }
      })
      .catch(error => {
        console.log(error)
      });
  }, [selectedStation]);

  useEffect(() => {
    axios.post(baseURL_min, { "stationId": selectedStation })
      .then(response => {
        if (response != null) {
          console.log("min", response.data)
          setMinData(response.data);
        }
      })
      .catch(error => {
        console.log(error)
      });
  }, [selectedStation]);

  const socket = io('http://localhost:4000');

  useEffect(() => {
    socket.on('rtdata', (data) => {
      console.log("rtdata", data)
      if (data != null) {
        setRtData(data);
        updateLocalData(data);
      }
    });

    socket.on('averages', (data) => {
      axios.post(baseURL_data, { "stationId": selectedStation })
        .then(response => {
          if (response != null) {
            console.log("data from API", response.data)
            setChartData(response.data);
          }
        })
        .catch(error => {
          console.log(error)
        });
    });

  }, [selectedStation]);

  const updateLocalData = (newData) => {
    setChartData(prevChartData => [...prevChartData, newData]);
  };

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleStationChange = (event) => {
    setSelectedStation(event.target.value);
  };

  const handleAccept = () => {
    setShowDashboard(selectedStation !== null);
  };


  // Axios de get estaciones 
  useEffect(() => {
    const mockStationOptions = [
      { value: '1', label: 'Estación 1' },
      { value: '2', label: 'Estación 2' },
      { value: '3', label: 'Estación 3' },
      { value: '4', label: 'Estación 4' }
    ];
    setStationOptions(mockStationOptions);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid container xs={12}>
        <select value={selectedStation} onChange={handleStationChange}>
          <option value="">Seleccione una estación</option>
          {stationOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      </Grid>
      <Grid container xs={12}>
        <Tabs value={selectedTab} onChange={handleChangeTab} indicatorColor="secondary">
          {chartData.map((station, index) => (
            <Tab key={index} label={station.stationId} />
          ))}
        </Tabs>
      </Grid>
      <Grid container lg={4} spacing={2} direction={'column'}>
        <Grid lg={12} xs={12}>
          <Metrics
            dataType="Temperatura"
            currentData={rtData?.temperature}
            value="°C"
            max={maxData?.temperature}
            min={minData?.temperature}
            icon={<Thermometer size={32} />}
          />
        </Grid>
        <Grid lg={12} xs={12}>
          <Metrics
            dataType="Humedad"
            currentData={rtData?.humidity}
            value="%"
            max={maxData?.humidity}
            min={minData?.humidity}
            icon={<Drop size={32} />}
          />
        </Grid>
        <Grid lg={12} xs={12}>
          <Metrics
            dataType="Radación"
            currentData={rtData?.radiation}
            value="V"
            max={maxData?.radiation}
            min={minData?.radiation}
            icon={<Radioactive size={32} />}
          />
        </Grid>
      </Grid>
      <Grid container lg={8} spacing={2}>
        <Grid lg={12} xs={12}>
          <MetricsCharts
            chartSeries={[
              { name: 'Humedad', data: chartData[selectedTab]?.chartsData?.humidity }
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
              { name: 'Radiación', data: chartData[selectedTab]?.chartsData?.radiation }
            ]}
            sx={{ height: '100%' }}
            title="Radiación"
            metric="V"
            color="#FF403D"
          />
        </Grid>
      </Grid>
      <Grid lg={12} xs={12}>
        <DownloadDocs station={selectedStation}/>
      </Grid>
    </Grid>
  );
}
