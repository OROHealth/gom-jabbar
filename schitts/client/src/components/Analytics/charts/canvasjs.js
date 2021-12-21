import CanvasJSReact from '../../../assets/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (props) => {
  const { quantity, totalEarnings, medianRating } = props;

  const options = {
    title: {
      text: '8-rated dinners in the past 6 months',
    },
    data: [
      {
        type: 'column',
        dataPoints: [
          { x: 1, y: quantity, label: 'Quantity' },
          { x: 2, y: totalEarnings, label: 'Total earnings' },
          { x: 3, y: medianRating, label: 'Median rating' },
        ],
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
