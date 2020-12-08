import {useMapEvents} from 'react-leaflet';
import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Human from './human';
import ReportHumanPopup from './reportHumanPopup';

const InteractionMap = () => {
  const trashZone = useSelector(s => s.trashZone);

  const dispatch = useDispatch();

  const [humans, setHumans] = useState([]);

  useMapEvents({
    click(e) {
      dispatch({
        type: "SET_MODAL",
        content: (
          <ReportHumanPopup
            position={e.latlng}
            trashZone={trashZone}
            onSubmit={(trashingLevel, excitementLevel) => {
              const newMarker = {
                id: Math.random(),
                position: e.latlng,
                directionV: Math.trunc(Math.random() * 100) % 2 ? 1 : -1,
                directionH: Math.trunc(Math.random() * 100) % 2 ? 1 : -1,
                trashingLevel,
                excitementLevel,
              };
              setHumans((humans) => [...humans, newMarker]);
              dispatch({type: "RESET_MODAL"});}
            }
          />
        )
      });
    },
  });

  return (
    <div>
      {
        humans.map((human) => {
          return (
            <Human
              position={human.position}
              trashingLevel={human.trashingLevel}
              excitementLevel={human.excitementLevel}
            />
          );
        })
      }
    </div>
  );
};

export default InteractionMap;
