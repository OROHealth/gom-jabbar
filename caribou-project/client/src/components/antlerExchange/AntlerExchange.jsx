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
import { antlerExchangeService } from '@services/api/antlerExchangeRoom/antlerExchangeRoom.service';

const AnterExchange = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const userEmailFound = useSelector((state) => state?.user?.email);
  console.log('Line 20: redux User', userEmailFound, 'component');
  const userImage = useSelector((state) => state?.user?.avatarImage);
  const [showN, setSetShowN] = useState(false);

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

  // Send broadcast
  const firstLetter = userEmailFound?.charAt(0)?.toUpperCase();
  const handleSendAntlerExchange = async () => {
    socket.emit('antler_exchange', { message: `Secret Caribou known as "${firstLetter}" is ready to antler-exchange` });
    setSetShowN(true);

    try {
      await antlerExchangeService
        .saveAntlerExchangeCaribou({
          email: userEmailFound,
          userImage,
        })
        .then((result) => {
          if (result.data) {
            console.log(
              'Line 67: Saving Caribou who want too antler Exchange: ',
              result.data.success[0].successMsg,
              'AntlerExchange component'
            );
            const successMsg = result?.data?.success[0]?.successMsg;
            setSuccessMessages([successMsg]);
          }
        });
    } catch (error) {
      console.log(`Line 72: Error Saving antler exchange Caribou`, error, 'AntlerExchange component');

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
      <FaBroadcastTower style={{ fontSize: 60 }} />
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

export default AnterExchange;
