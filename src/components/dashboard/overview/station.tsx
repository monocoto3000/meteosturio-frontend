import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

export interface StationProps {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    municipality: string;
    type: string;
    owner: string;
}

export function Station({ name, address, latitude, longitude, municipality, type, owner }: StationProps): React.JSX.Element {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2} direction={"column"}>
                    <Grid lg={12}>
                        <Typography variant="h5" component="div">
                            {name}
                        </Typography>
                    </Grid>
                    <Divider orientation="horizontal" variant="middle" flexItem />
                    <Grid lg={12} direction={"column"} spacing={2}>
                        <Grid>
                            <Typography color="text.primary" variant="body1">
                                <b>Direccion:</b> {address}, {municipality} <Typography color="text.secondary" variant='caption'><b>Lat:</b> {latitude} <b>Long:</b> {longitude}</Typography>
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography color="text.primary" variant="body1">
                                <b>Dueño:</b> {owner}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography color="text.primary" variant="body1">
                                <b>Tipo:</b> {type}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    );
}
