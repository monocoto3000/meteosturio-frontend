import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

export interface BudgetProps {
  dataType: string;
  currentData: number;
  value: string;
  max: number;
  min: number;
  icon: any;
}

export function Metrics({ dataType, currentData, value, min, max, icon }: BudgetProps): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid lg={5}>
            <Typography color="text.secondary" variant="overline">
              {dataType}
            </Typography>
            <h1 color="text.primary" style={{ margin: 0 }}>
              {currentData} {value}
            </h1>
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid lg={4}>
            <Typography color="text.secondary" variant="overline">
              Mínima  <Chip label={min + " " + value} variant="outlined" size="small" />
            </Typography>
            <br></br>
            <Typography color="text.secondary" variant="overline">
              Máxima <Chip label={max + " " + value} variant="outlined" size="small" />
            </Typography>
          </Grid>
          <Grid lg={2}>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
             {icon} 
            </Avatar>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
}
