'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Unstable_Grid2';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Button, CardActions, InputLabel } from '@mui/material';

export function DownloadDocs(): React.JSX.Element {
  return (
    <Card>
      <CardHeader title="Descargables" subheader="Seleccione un intervalo de fechas para descargar los datos de temperatura, humedad y radiación."/>
      <CardContent>
        <Grid container direction={'column'}>
            <DateRangePicker localeText={{ start: 'Fecha de inicio', end: 'Fecha final' }}/>
        </Grid>
      </CardContent>
      <CardActions>
        <Button>Generar documento</Button>
      </CardActions>
    </Card>
  );
}
