import * as R from "ramda";

import {useMapEvents} from 'react-leaflet';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getDistance} from '../../utils'

import Human from './human';
import ReportHumanPopup from './reportHumanPopup';

const InteractionMap = () => {
  const dispatch = useDispatch();
  const trashZone = useSelector(s => s.trashZone);

  const [humans, setHumans] = useState([]);
  const [insiders, setInsiders] = useState([]);

  const requestRef = useRef();
  const previousRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const notificationDuration = 3000;
      humans.forEach((h) => {
        if (h.isInside === true && !R.find(R.propEq('id', h.id))(insiders)) {
          setInsiders((insiders) => [...insiders, h]);
          dispatch({type: "NOTIFY_HUMAN_MOVE", humanId: h.id, move: "IN"});
          setTimeout(() => {
            dispatch({type: "CLEAR_HUMAN_MOVE_NOTIFICATION", humanId: h.id, move: "IN"});
          }, notificationDuration);
        }
        if (h.isInside === false && R.find(R.propEq('id', h.id))(insiders)) {
          setInsiders((insiders) => insiders.filter((insider) => insider.id !== h.id));
          dispatch({type: "NOTIFY_HUMAN_MOVE", humanId: h.id, move: "OUT"});
          setTimeout(() => {
            dispatch({type: "CLEAR_HUMAN_MOVE_NOTIFICATION", humanId: h.id, move: "OUT"});
          }, notificationDuration);
        }
      });
    }, 100);
    return () => clearInterval(interval);
  }, [humans.length, insiders]);

  const animate = time => {
    const stepDivider = 100000;
    if (!!previousRef.current) {
      setHumans((hms) => {
        return hms.map((h) => {
          h.position = {
            lat: h.position.lat + Math.random() / stepDivider * h.directionV,
            lng: h.position.lng + Math.random() / stepDivider * h.directionH,
          };
          h.isInside = getDistance(h.position, trashZone) < trashZone.radius;
          return h;
        })
      });
    }
    previousRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [humans]);

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
                isInside: getDistance(e.latlng, trashZone) < trashZone.radius,
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