import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Unstable_Grid2';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Button, CardActions, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface DataItem {
  temperature: number;
  humidity: number;
  radiation: number;
}

export function DownloadDocs({ station }: { station: string }): React.JSX.Element {
  const [data, setData] = useState<DataItem[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://3.221.32.128/data/date', {
        stationId: station,
        startDate: startDate,
        endDate: endDate
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      setError("Error al obtener los datos");
    }
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Card>
      <CardHeader title="Descargables" subheader="Seleccione un intervalo de fechas para descargar los datos de temperatura, humedad y radiación." />
      <CardContent>
        <Grid container direction={'row'} spacing={2}>
          <Grid item lg={8}>
            <DateRangePicker
              startText="Fecha de inicio"
              endText="Fecha final"
              value={[startDate, endDate]}
              onChange={(newValue) => {
                setStartDate(newValue[0]);
                setEndDate(newValue[1]);
              }}
            />
          </Grid>
          <Grid item lg={4}>
            <Button onClick={handleSearch} fullWidth style={{ height: "100%" }} variant="outlined">Buscar</Button>
          </Grid>
          <Grid item xs={12} lg={12}>
            <CardActions>
              {error && <p>{error}</p>}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Temperatura</TableCell>
                    <TableCell>Humedad</TableCell>
                    <TableCell>Radiación</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.temperature} ºC</TableCell>
                      <TableCell>{item.humidity} %</TableCell>
                      <TableCell>{item.radiation} V</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </CardActions>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Stack spacing={2} sx={{ justifyContent: 'center' }}>
              <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
              />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
