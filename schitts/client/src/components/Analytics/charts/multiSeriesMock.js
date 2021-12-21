import CanvasJSReact from '../../../assets/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (props) => {
  const { mocktails, reviews } = props;
  const options = {
    theme: 'light2',
    animationEnabled: true,
    title: {
      text: 'Mocktails sold vs Reviews',
    },
    axisX: {
      title: 'Day',
    },
    axisY: {
      title: 'Mocktails',
      titleFontColor: '#6D78AD',
      lineColor: '#6D78AD',
      labelFontColor: '#6D78AD',
      tickColor: '#6D78AD',
    },
    axisY2: {
      title: 'Reviews',
      titleFontColor: '#51CDA0',
      lineColor: '#51CDA0',
      labelFontColor: '#51CDA0',
      tickColor: '#51CDA0',
    },
    data: [
      {
        type: 'spline',
        name: mocktails[0] ? mocktails[0].name : 'Mocktails',
        showInLegend: true,
        dataPoints: mocktails[0] ? mocktails[0].data : '',
      },
      {
        type: 'spline',
        name: 'Reviews',
        axisYType: 'secondary',
        showInLegend: true,
        dataPoints: reviews,
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
