// import Chartjs, { Chart, ChartTypeRegistry } from 'chart.js';
// import Gauge from 'chartjs-gauge';
// import { useEffect, useRef } from 'react';

// const CHART_COLORS = {
//   red: '#ff6384',
//   orange: '#ff9f40',
//   yellow: '#ffcd56',
//   green: '#4bc0c0',
//   blue: '#36a2eb',
//   purple: '#9966ff',
//   grey: '#c9cbcf',
//   black: '#404244',
//   white: '#F0F0F0',
// };

// const hours = [...Array(12)].map((_, i) => i + 1);
// const mins = [...Array(60)].map((_, i) => i + 1);

// function getTime() {
//   const date = new Date();
//   const h = date.getHours();
//   const m = date.getMinutes();
//   return [h + m / 60, m];
// }

// let [hour, min] = getTime();

// var config: any = {
//   type: 'gauge',
//   data: {
//     datasets: [
//       {
//         data: hours,
//         value: hour,
//         backgroundColor: [
//           CHART_COLORS.purple,
//           CHART_COLORS.blue,
//           CHART_COLORS.green,
//           CHART_COLORS.yellow,
//           CHART_COLORS.orange,
//           CHART_COLORS.red,
//         ],
//         rotation: 0,
//         circumference: 360,
//         needle: {
//           color: CHART_COLORS.orange,
//           length: '65%',
//           width: '10%',
//           radius: '5%',
//         },
//         valueLabel: {
//           backgroundColor: CHART_COLORS.orange,
//           offsetY: 0,
//           offsetX: -70,
//         },
//       },
//       {
//         data: mins,
//         value: min,
//         backgroundColor: [CHART_COLORS.grey, CHART_COLORS.white],
//         cutout: '65%',
//         rotation: 0,
//         circumference: 360,
//         needle: {
//           color: CHART_COLORS.green,
//           length: '95%',
//           width: '14%',
//           radius: '7%',
//         },
//         valueLabel: {
//           backgroundColor: CHART_COLORS.green,
//           offsetY: 0,
//           offsetX: 70,
//         },
//       },
//     ],
//   },
//   options: {
//     // plugins: [Gauge],
//     responsive: true,
//     valueLabel: {
//       formatter(value: any) {
//         return Math.floor(value).toString().padStart(2, '0');
//       },
//       font: {
//         size: 32,
//       },
//       backgroundColor: CHART_COLORS.black,
//       color: CHART_COLORS.white,
//     },
//     id: 'mychart',
//   },
// };

// const GaugeChart = () => {
//   const ref = useRef<HTMLCanvasElement>(null);
//   useEffect(() => {
//     if (ref.current) {
//       const ctx = ref.current.getContext('2d');
//       Chart.register(Gauge);
//       if (!ctx) return;
//       const myGauge = new Chart(ctx, config);
//       myGauge.update();
//     }
//   }, []);

//   // return <Doughnut {...config}></Doughnut>;
//   return <canvas ref={ref}></canvas>;
// };

// export default GaugeChart;

// import './styles.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
  DoughnutController,
} from 'chart.js';
import * as Gauge from 'chartjs-gauge-v3';
import { useEffect, useRef } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
);
// Chart.js gauge

var data = [40, 70, 100];
var value = 76;

var config: any = {
  type: 'doughnut',
  plugins: [
    {
      afterDraw: (chart: any) => {
        const radius = 150,
          radianAngle = (-45 * Math.PI) / 180;
        var needleValue = chart.config.data.datasets[0].needleValue;
        var dataTotal = chart.config.data.datasets[0].data.reduce(
          (a, b) => a + b,
          0,
        );
        var angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI;
        var ctx = chart.ctx;
        var cw = chart.canvas.offsetWidth;
        var ch = chart.canvas.offsetHeight;
        var cx = cw / 2;
        var cy = ch - ch / 4;

        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -3);
        ctx.lineTo(ch - 20, 0);
        ctx.lineTo(0, 3);
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fill();
        ctx.rotate(-angle);
        ctx.translate(-cx, -cy);
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.translate(cx, cy);
        ctx.rotate(radianAngle);
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(radius, 0);
        ctx.lineTo(0, 5);
        ctx.fillStyle = 'rgba(0, 76, 0, 0.8)';
        ctx.fill();
        ctx.rotate(-radianAngle);
        ctx.translate(-cx, -cy);
        ctx.beginPath();
        ctx.arc(cx, cy, 7, 0, Math.PI * 2);
        ctx.fill();
      },
    },
  ],
  data: {
    labels: ['Normal', 'Warning', 'Critical'],
    datasets: [
      {
        label: 'Current Appeal Risk',
        data: data,
        value: value,
        minValue: 0,
        backgroundColor: ['green', 'orange', 'red'],
        borderWidth: 2,
        needle: {
          color: 'orange',
          length: '65%',
          width: '10%',
          radius: '5%',
        },
      },
      {
        label: 'Current Appeal Risk',
        data: data,
        value: value,
        minValue: 0,
        backgroundColor: ['green', 'orange', 'red'],
        borderWidth: 2,
        needle: {
          color: 'orange',
          length: '65%',
          width: '10%',
          radius: '5%',
        },
      },
    ],
  },
  options: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        generateLabels: {},
      },
    },
    responsive: true,
    title: {
      display: true,
      text: 'Financial Risk',
    },
    layout: {
      padding: {
        bottom: 20,
      },
    },
    needle: {
      radiusPercentage: 1,
      widthPercentage: 1,
      lengthPercentage: 60,
      color: 'rgba(0, 0, 0, 1)',
    },
    valueLabel: {
      fontSize: 12,
      formatter: function (value, context) {
        // debugger;
        return value + 'X';
        // return '< ' + Math.round(value);
      },
    },
    plugins: {
      datalabels: {
        display: 'auto',
        formatter: function (value, context) {
          // debugger;
          return context.chart.data.labels[context.dataIndex];
          // return context.dataIndex===0?'Normal':context.dataIndex===1?'Warning':'Critical';
          // return '< ' + Math.round(value);
        },
        color: function (context) {
          return 'white';
        },
        //color: 'rgba(255, 255, 255, 1.0)',
        // backgroundColor: 'rgba(0, 0, 0, 1.0)',
        // borderWidth: 0,
        // borderRadius: 5,
        font: function (context) {
          var innerRadius = Math.round(context.chart.innerRadius);
          console.log(innerRadius);
          var size = Math.round(innerRadius / 8);

          return {
            weight: 'normal',
            size: size,
          };
        },
        // font: {
        //   weight: 'normal',
        //   size:16
        // }
      },
    },
  },
};

export default function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    // useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      //     Chart.register(Gauge);
      if (!ctx) return;
      //     const myGauge = new Chart(ctx, config);
      //     myGauge.update();

      // var ctx = document.getElementById('myChart').getContext('2d');
      const myGauge = new ChartJS(ctx, config);
      myGauge.update();
      const val = setTimeout(() => console.log(myGauge.toBase64Image()), 800);
    }
  }, []);

  return (
    <div className="App">
      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2> */}
      <canvas ref={ref}></canvas>
    </div>
  );
}
