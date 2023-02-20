import { useEffect, useState } from 'react';
import { mapService } from '@services/api/map/map.service';
import socket from '@services/websocket/webSocketIO';

// Toast
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from '@hooks/useLocalStorage';

const HumanQuit = () => {
  const getStorageLocationFound = useLocalStorage('locations-found', 'get');
  const [setStorageLocationFound] = useLocalStorage('locations-found', 'set');
  const [result, setResult] = useState(0);
  const [local, setLocal] = useState(0);
  const customId = 'custom-id-yes';
  const notify = (message) =>
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      toastId: customId,
    });

  useEffect(() => {
    // Compare Both Numbers
    const compareAmounts = async () => {
      try {
        // Find the Amount of locations saved in Local Storage
        setResult(await getStorageLocationFound);
        console.log(`Line 35: Local Storage Number -> ${result}`);

        // get the number of all locations saved
        await mapService.getAllLocations().then((res) => {
          console.log('Line38: result ->', res, 'HumanQuite');
          setLocal(res?.data?.locations.length);

          if (local) {
            console.log('location Spotted length: ->', res?.data?.locations.length, 'HumanQuite');
            // check if its the same as the locations in local storage
            if (result === local) {
              console.log(
                'They are the same numbers. SO NO broadcast',
                result,
                res?.data?.locations.length,
                'HumanQuite'
              );
            } else {
              console.log('Humans Have Quite', result, local, 'HumanQuite');
              // if the number in the database is less than the number saved to local storage
              if (res?.data?.locations.length < result) {
                socket.emit('human-quite', {
                  message: `A Human just Quite a zone. There are ${local} zones left where humans are trashing! `,
                });
                // setStorageLocationFound(local);
                notify(`broadcast sent`);
              }
            }
          }
        });
      } catch (error) {
        console.log(`Line 56: Error Fetching number of locations from database ${error}`, 'HumanQuite');
      }
    };
    compareAmounts();
  }, [getStorageLocationFound, setStorageLocationFound, result, local]);

  // Handle Receive Antler Exchange BroadCast Sign
  useEffect(() => {
    socket.on('human_quite_received_broadcast', (data) => {
      // setSocketAntlerExchangeMsg(data.message);
      // console.log(data.message);
      notify(data.message);
    });
  }, [socket]);

  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={true} />{' '}
    </div>
  );
};

export default HumanQuit;
