import { useTheme } from 'styled-components';

const useChartOptions = () => {
  const { colors } = useTheme();
  return {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            lineHeight: 1.66,
            family: 'Manrope',
          },
          color: colors.blue[6],
        },
      },
      y: {
        grid: {
          color: colors.gray[4],
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            lineHeight: 1.66,
            family: 'Manrope',
          },
          color: colors.blue[6],
        },
        title: {
          display: true,
          align: 'end' as const,
          font: {
            size: 12,
            lineHeight: 1.66,
            family: 'Manrope',
          },
          color: colors.blue[4],
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        align: 'start' as const,
        labels: {
          font: {
            size: 12,
            lineHeight: 1.66,
            family: 'Manrope',
          },
          color: colors.blue[6],
          padding: 32,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        yAlign: 'bottom' as const,
        displayColors: false,
        backgroundColor: colors.white,
        bodyColor: colors.blue[6],
        bodyFont: {
          size: 12,
          lineHeight: 1.66,
          family: 'Manrope',
          weight: 'bold',
        },
        padding: 10,
        borderColor: 'rgba(0, 0, 0, 0.11)',
        borderWidth: 1,
      },
    },
  };
};

export default useChartOptions;
