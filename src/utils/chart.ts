import { Plugin } from 'chart.js';

export const WhiteBackground: Plugin = {
  id: 'white-background',

  beforeDraw: function (chart) {
    const ctx = chart.canvas.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  },
};
