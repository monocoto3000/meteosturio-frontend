import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Station } from '@/components/dashboard/menu-principal/station';

export default function Page(): React.JSX.Element {
  const stations = [{
    name: "Monica",
    address: "Mi casita",
    latitude: "12.42.2",
    longitude: "83.344.3",
    municipality: "Suchiapa",
    type: "Rosita",
    owner: "Cesar"
  },
  {
    name: "Cesar",
    address: "La casa de cesar",
    latitude: "12.42.2",
    longitude: "83.344.3",
    municipality: "New York",
    type: "Gei",
    owner: "Chucho"
  },
  ]
  return (
    <Grid container spacing={2}>
      <Grid container lg={4}>
        <Grid lg={12} md={12} xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2} direction={"column"}>
                <Grid lg={12}>
                  <Typography color="text.primary" variant="h4">
                    Perfil
                  </Typography>
                </Grid>
                <Grid lg={12} spacing={2}>
                  <Grid>
                    <Typography color="text.secondary" variant="overline">
                      Nombre de usuario:
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography color="text.secondary" variant="overline">
                      Correo:
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography color="text.secondary" variant="overline">
                      Plan:
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography color="text.secondary" variant="overline">
                      Organización:
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography color="text.secondary" variant="overline">
                      Fecha de renovación de plan:
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container lg={8}>
        {stations.map(station => (
          <Grid lg={12}>
            <Station
              name={station.name}
              address={station.address}
              latitude={station.latitude}
              longitude={station.longitude}
              municipality={station.municipality}
              type={station.type}
              owner={station.owner}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
