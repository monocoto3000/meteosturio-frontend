'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

export interface SalesProps {
  chartSeries: { name: string; data: number[] }[];
  sx?: SxProps;
  title: string;
  metric: string;
  color: string;
}

export function MetricsCharts({ chartSeries, sx, title, metric, color }: SalesProps): React.JSX.Element {
  const chartOptions = useChartOptions(metric, color);
  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
            Sincronizar
          </Button>
        }
        title={title}
      />
      <CardContent>
        <Chart height={200} options={chartOptions} series={chartSeries} type="line" width="100%" />
      </CardContent>
      <Divider />
    </Card>
  );
}

function useChartOptions(metric: string, color: string): ApexOptions {
  const theme = useTheme();
  return {
    stroke: {curve: 'smooth'},
    theme: {
      monochrome: {
        enabled: true,
        color: color,
        shadeIntensity: 0.65
      }
    },
    xaxis: {
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      categories: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55'],
      labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value + " " + metric}` : `${value}`),
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}
