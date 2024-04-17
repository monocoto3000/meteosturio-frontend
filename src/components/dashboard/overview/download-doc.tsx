import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Unstable_Grid2';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Button, CardActions, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

interface DataItem {
  temperature: number;
  humidity: number;
  radiation: number;
}

let array: DataItem[] = [
  { temperature: 20, humidity: 35, radiation: 90 },
  { temperature: 21, humidity: 36, radiation: 91 },
  { temperature: 22, humidity: 37, radiation: 92 }
];

export function DownloadDocs(): React.JSX.Element {
  const [data, setData] = useState<DataItem[]>([]);

  const handleSearch = () => {
    setData(array);
  };

  return (
    <Card>
      <CardHeader title="Descargables" subheader="Seleccione un intervalo de fechas para descargar los datos de temperatura, humedad y radiación."/>
      <CardContent>
        <Grid container direction={'column'}>
          <DateRangePicker localeText={{ start: 'Fecha de inicio', end: 'Fecha final' }}/>
        </Grid>
        <Button onClick={handleSearch}>Buscar</Button>
      </CardContent>
      <CardActions>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Temperatura</TableCell>
              <TableCell>Humedad</TableCell>
              <TableCell>Radiación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.temperature}</TableCell>
                <TableCell>{item.humidity}</TableCell>
                <TableCell>{item.radiation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardActions>
    </Card>
  );
}
