import CanvasJSReact from '../../../assets/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (props) => {
  const { user1, user2, evolution1, evolution2, together } = props;

  const options = {
    animationEnabled: true,
    title: {
      text: 'Evolution of drinks comparison',
    },
    axisY: {
      title: 'Number of drinks',
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'spline',
        name: user1,
        showInLegend: true,
        dataPoints: evolution1,
      },
      {
        type: 'spline',
        name: user2,
        showInLegend: true,
        dataPoints: evolution2,
      },
      {
        type: 'spline',
        name: 'Together',
        showInLegend: true,
        dataPoints: together,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef = {ref => this.chart = ref} */
      />
    </div>
  );
};

export default Chart;
