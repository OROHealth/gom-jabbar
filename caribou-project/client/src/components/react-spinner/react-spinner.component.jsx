// stylesheet

import { BackDrop } from '@components/react-spinner/react-spinner.styles.jsx';

import { ThreeCircles } from 'react-loader-spinner';

const ReactSpinner = () => {
  return (
    <BackDrop>
      <ThreeCircles
        height="20"
        width="20"
        color="#ff895d"
        ariaLabel="three-circles-rotating"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </BackDrop>
  );
};

export default ReactSpinner;
