'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Unstable_Grid2';
import { Drop } from '@phosphor-icons/react/dist/ssr/Drop';
import { Radioactive } from '@phosphor-icons/react/dist/ssr/Radioactive';
import { Thermometer } from '@phosphor-icons/react/dist/ssr/Thermometer';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Autocomplete } from '@mui/material';

import { MetricsCharts } from '@/components/dashboard/overview/chart';
import { DownloadDocs } from '@/components/dashboard/overview/download-doc';
import { Metrics } from '@/components/dashboard/overview/metrics-card';

export default function Page(): React.JSX.Element {
  const baseURL_max = 'http://3.221.32.128/data/max';
  const baseURL_min = 'http://3.221.32.128/data/min';
  const baseURL_data = 'http://3.221.32.128/data/station';
  const baseURL_stations = ' http://54.205.207.55/stations/';

  const [minData, setMinData] = useState(null);
  const [maxData, setMaxData] = useState(null);
  const [rtData, setRtData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [stationOptions, setStationOptions] = useState([]);

  const token = localStorage.getItem('token');

  const socket = io('http://3.212.10.41');

  useEffect(() => {
    socket.on('rtdata', (data) => {
      console.log('rtdata', data);
      if (data != null) {
        setRtData(data);
        updateLocalData(data);
      }
    });
  }, [selectedStation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chart = await axios.post(baseURL_data, { stationId: selectedStation });
        const max = await axios.post(baseURL_max, { stationId: selectedStation });
        const min = await axios.post(baseURL_min, { stationId: selectedStation });
        if (chart.data && min.data && max.data) {
          console.log("chart", chart.data)
          setChartData(chart.data);

          setMaxData(max.data);
          console.log("max", max.data)

          setMinData(min.data);
          console.log("min", min.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [selectedStation]);

  const updateLocalData = (newData) => {
    setChartData((prevChartData) => [...prevChartData, newData]);
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

  //treaer las estaciones
  useEffect(() => {
    try {
      axios
        .get(baseURL_stations)
        .then((response) => {
          if (response.data) {
            console.log(response.data)
            let data = response.data.data;
             const stationsData = data.map((station) => ({
              value: station.id_station.toString(),
              label: station.name,
            }));
            console.log("data", data);
            console.log(stationOptions)
            setStationOptions(stationsData);
          }
        })
        .catch((error) => {
          console.log(error);
          console.log('stations error');
        });
    } catch (error) {
      console.log(error);
      console.log('stations error');
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid container xs={12}>
        <select value={selectedStation} onChange={handleStationChange} style={{
           width:"25%",
           height: "40px",
           borderRadius:"5px",
           margin:"5px"
        }}>
          <option value="">Seleccione una estación</option>
          {stationOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Grid>
      <Grid container lg={4} spacing={2} direction={'column'} xs={12}>
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
            value="W/m2"
            max={maxData?.radiation}
            min={minData?.radiation}
            icon={<Radioactive size={32} />}
          />
        </Grid>
      </Grid>
      <Grid container lg={8} spacing={2}>
      <Grid lg={12} xs={12}>
          <MetricsCharts
            chartSeries={[{ name: 'Temperatura', data: chartData.map((data) => data.temperature)}]}
            sx={{ height: '100%' }}
            title="Temperatura"
            metric="°C"
            color="#3D84FF"
          />
        </Grid>
        <Grid lg={12} xs={12}>
          <MetricsCharts
            chartSeries={[{ name: 'Humedad', data: chartData.map((data) => data.humidity) }]}
            sx={{ height: '100%' }}
            title="Humedad"
            metric="%"
            color="#3D84FF"
          />
        </Grid>
        <Grid lg={12} xs={12}>
          <MetricsCharts
            chartSeries={[{ name: 'Radiación', data: chartData.map((data) => data.radiation) }]}
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
