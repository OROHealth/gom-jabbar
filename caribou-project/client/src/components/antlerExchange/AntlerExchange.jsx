import React, { useEffect, useState } from 'react';

// Toast Notification, React Icons and Stylesheets
import { ToastContainer, Slide, toast } from 'react-toastify';
import { FaBroadcastTower } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import '@components/antlerExchange/AntlerExchange.styles.scss';

// Socket IO
import socket from '@services/websocket/webSocketIO';

// Redux
import { useSelector } from 'react-redux';

// API
import { antlerExchangeService } from '@services/api/antlerExchangeRoom/antlerExchangeRoom.service';
import { chatRoomService } from '@services/api/chatroom/chatroom.service';

const AntlerExchange = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const userEmailFound = useSelector((state) => state?.user?.email);
  const userImage = useSelector((state) => state?.user?.avatarImage);
  const [showN, setSetShowN] = useState(false);

  // console.log('Line 22: redux User', userEmailFound, 'Antler exchange component');

  // handle the messages popup
  const timeLimitMessage = () => {
    setTimeout(() => {
      setShowErrorMsg(false);
      setShowSuccessMsg(false);
    }, 15000);
  };

  // Toast
  const customId = 'custom-id-yes';
  const customIdReceive = 'custom-id-yes';
  const notify = (message) => {
    //
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      toastId: customId,
      newestOnTop: true,
    });

    return toast;
  };

  const receiveNotify = (message) => {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      toastId: customIdReceive,
      newestOnTop: false,
    });

    return toast;
  };

  // Generating random numbers
  const generateRandomIntegers = (integerLength) => {
    const characters = '0123ABCDEFGHIJKLMNOPQRSTUVWXYZ456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < integerLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // return parseInt(result, 10);
    return result;
  };

  // Send broadcast
  const letter = userEmailFound?.slice(0, 4)?.toUpperCase();
  const handleSendAntlerExchange = async () => {
    socket.emit('antler_exchange', { message: `Secret Caribou known as "${letter}" is ready to antler-exchange` });
    setSetShowN(true);

    // generate a random string
    const getRoom = () => {
      const roomNumber = generateRandomIntegers(12);
      // console.log('Params:', roomNumber);
      return roomNumber;
    };

    // call the Custom Room Id Generator
    const theCustomRoomNumber = getRoom();

    // sending the room to the database
    // socket.emit('new_room_created', { message: theCustomRoomNumber });
    console.log('Line 107:, Antler-Exchange-component ->  The CustomRoomNumber is:', theCustomRoomNumber);

    try {
      await antlerExchangeService
        .saveAntlerExchangeCaribou({
          email: userEmailFound,
          userImage,
          customRoomNumber: theCustomRoomNumber,
        })
        .then(async (result) => {
          if (result.data) {
            setShowErrorMsg(false);
            setShowSuccessMsg(true);
            const successMsg = result?.data?.success[0]?.successMsg;
            setSuccessMessages([successMsg]);
          }
        })
        .then(async () => {
          await chatRoomService.createChatRoom({ room: theCustomRoomNumber }).then((newRoomCreated) => {
            console.log('Line 125: Antler Exchange and Room was Created', newRoomCreated);
          });
        });
    } catch (error) {
      console.log(`Line 72: Error Saving antler exchange Caribou`, error, 'AntlerExchange component');
      setShowSuccessMsg(false);
      setShowErrorMsg(true);
      setErrorMessages([error?.response?.data[0]?.errorMsg || error?.message]);
      timeLimitMessage();
    }
  };

  // Handle Sent Antler Exchange BroadCast Sign
  useEffect(() => {
    let isCancelled = true;
    if (isCancelled) {
      if (showN) {
        receiveNotify('Broadcast Sent!');
      }
    }
    setSetShowN(false);
    return () => {
      isCancelled = false;
    };
  }, [showN]);

  // Handle Receive Antler Exchange BroadCast Sign
  useEffect(() => {
    let isCancelled = true;
    if (isCancelled) {
      socket.on('antler_exchange_broadcast', (data) => {
        notify(data.message);
      });
    }
    return () => {
      isCancelled = false;
    };
  });

  return (
    <>
      <h2 style={{ fontSize: 24, color: '#de106f', fontWeight: 900 }}> Ready To Antler Exchange</h2>
      {showSuccessMsg && successMessages && (
        <div className={`alerts alert-success`} role="alert">
          {successMessages}
        </div>
      )}
      {showErrorMsg && errorMessages && (
        <div className={`alerts alert-error`} role="alert">
          {errorMessages}
        </div>
      )}
      <label htmlFor="human-presence">Notify the other Caribous! </label>
      <div>
        <FaBroadcastTower style={{ fontSize: 60 }} />
      </div>
      <div className="anter-exchange-container">
        <div className="loading-button">
          <button type="submit" className="button" onClick={handleSendAntlerExchange}>
            Antler Exchange
          </button>
        </div>
        <ToastContainer
          transition={Slide}
          theme="dark"
          position="bottom-right"
          autoClose={5000}
          toastId={customId}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default AntlerExchange;
