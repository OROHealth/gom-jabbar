import * as R from "ramda";

import {useMapEvents} from 'react-leaflet';
import {useEffect, useRef, useState, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {registerHuman, checkHuman} from '../../actions/human';
import {registerCaribou, retrieveCaribous} from '../../actions/caribou';
import {getDistance} from '../../utils'

import Human from './human';
import Caribou from './caribou';
import LocationPopup from './locationPopup';
import {initSocket, sendMessage} from "../../actions/chat";

const room = 'myRoom';
let socket;

const InteractionMap = () => {
  const dispatch = useDispatch();
  const trashZone = useSelector(s => s.trashZone);
  const storedCaribous = useSelector(s => s.caribou.list);

  const [humans, setHumans] = useState([]);
  const [caribous, setCaribous] = useState(storedCaribous);
  const [insiders, setInsiders] = useState([]);

  const requestRef = useRef();
  const previousRef = useRef();

  useEffect(() => {
    setCaribous(storedCaribous);
  }, [storedCaribous]);

  useEffect(() => {
    socket = initSocket();
    dispatch(retrieveCaribous());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      humans.forEach((h) => {
        if (h.isInside === true && !R.find(R.propEq('id', h.id))(insiders)) {
          setInsiders((insiders) => [...insiders, h]);
          dispatch(
            sendMessage(socket, `Je viens de voir un humain entrer dans la zone rouge...`, room, false)
          );
        }
        if (h.isInside === false && R.find(R.propEq('id', h.id))(insiders)) {
          setInsiders((insiders) => insiders.filter((insider) => insider.id !== h.id));
          dispatch(
            sendMessage(socket, `Je viens de voir un humain sortir de la zone rouge...`, room, false)
          );
        }
      });
    }, 100);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [humans.length, insiders, dispatch]);

  const animate = useCallback(time => {
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
  }, [trashZone]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  useMapEvents({
    click(e) {
      dispatch({
        type: "SET_MODAL",
        content: (
          <LocationPopup
            position={e.latlng}
            trashZone={trashZone}
            closeModal={() => dispatch({type: "RESET_MODAL"})}
            submitHumanPosition={(data) => {
              const {trashingLevel, excitementLevel} = data;
              const newHuman = {
                id: Math.random(),
                position: e.latlng,
                directionV: Math.trunc(Math.random() * 100) % 2 ? 1 : -1,
                directionH: Math.trunc(Math.random() * 100) % 2 ? 1 : -1,
                isInside: getDistance(e.latlng, trashZone) < trashZone.radius,
                trashingLevel,
                excitementLevel,
              };
              setHumans((humans) => [...humans, newHuman]);
              dispatch(registerHuman(newHuman));
              dispatch({type: "RESET_MODAL"});
            }}
            submitHumanCheck={(data) => {
              const {radiusToCheck} = data;
              dispatch(checkHuman(e.latlng, radiusToCheck, (zoneNotSafe) => dispatch(
                sendMessage(socket, `La zone vérifiée (latitude ${e.latlng.lat} / longitude ${e.latlng.lng}) ${zoneNotSafe ? "n'est pas sûre !" : "est sûre"}`, room, false)
              )));
              dispatch({type: "RESET_MODAL"});
            }}
            submitCaribouPosition={() => {
              const newCaribou = {
                id: Math.random(),
                position: e.latlng,
              };
              dispatch(registerCaribou(newCaribou));
              dispatch({type: "RESET_MODAL"});
            }}
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
              key={human.id}
              position={human.position}
              trashingLevel={human.trashingLevel}
              excitementLevel={human.excitementLevel}
            />
          );
        })
      }
      {
        caribous.map(({lat, lng, _id}) => {
          return (
            <Caribou
              key={_id}
              position={{lat, lng}}
            />
          );
        })
      }
    </div>
  );
};

export default InteractionMap;
