import { Chart, ChartTypeRegistry, TooltipModel } from 'chart.js';
import ReactDOM from 'react-dom';
import CO2ChartTooltip from './CO2ChartTooltip';

const getOrCreateTooltip = (chart: Chart) => {
  let tooltipElement: HTMLDivElement | null | undefined =
    chart.canvas?.parentNode?.querySelector('div.tooltip');

  if (!tooltipElement) {
    tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip';
    tooltipElement.style.opacity = '1';
    tooltipElement.style.pointerEvents = 'none';
    tooltipElement.style.position = 'absolute';
    tooltipElement.style.transform = 'translate(-50%, 0)';
    tooltipElement.style.transition = 'all .1s ease';
    tooltipElement.style.zIndex = '11';

    const rootElement = document.createElement('div');
    rootElement.className = 'tooltip-root';

    tooltipElement.appendChild(rootElement);
    chart.canvas?.parentNode?.appendChild(tooltipElement);
  }

  return tooltipElement;
};

export const externalTooltipHandler = <
  T extends keyof ChartTypeRegistry,
>(context: {
  chart: Chart;
  tooltip: TooltipModel<T>;
}) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipElement = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipElement.style.opacity = '0';
    return;
  }

  const title = tooltip.title[0];
  const labels = tooltip.dataPoints.map(
    (dataset) => (dataset.dataset as { label: string }).label,
  );
  const values = tooltip.dataPoints.map(
    (dataset) => (dataset.raw as { y: number }).y,
  );
  const after = tooltip.body.map((row) => row.after.join(' '));
  const colors = tooltip.labelColors.map((color) =>
    String(color.backgroundColor),
  );
  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
  const bodyBounds = document.body.getBoundingClientRect();
  const xOverflow =
    positionX + tooltip.caretX + tooltip.width > bodyBounds.width;

  const tooltipBody = document.createElement('div');
  ReactDOM.render(
    <CO2ChartTooltip
      title={title}
      xOverflow={xOverflow}
      elements={labels.map((label, index) => ({
        name: label,
        value: values[index],
        color: colors[index],
        after: after[index],
      }))}
    />,
    tooltipBody,
  );

  const tooltipRoot = tooltipElement.querySelector('.tooltip-root');

  // Remove old children
  while (tooltipRoot?.firstChild) {
    tooltipRoot.firstChild.remove();
  }

  tooltipRoot?.appendChild(tooltipBody);

  // Display and position
  tooltipElement.style.opacity = '1';
  if (xOverflow) {
    tooltipElement.style.left =
      positionX + tooltip.caretX - tooltip.width / 2 + 'px';
  } else {
    tooltipElement.style.left = positionX + tooltip.caretX + 'px';
  }
  // 8px added for caret
  tooltipElement.style.top = positionY + tooltip.caretY + 8 + 'px';
};
