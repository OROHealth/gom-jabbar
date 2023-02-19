import React, { useEffect } from 'react';
import '@components/antlerExchange/AntlerExchange.styles.scss';
import socket from '@services/websocket/webSocketIO';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBroadcastTower } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AnterExchange = () => {
  const user = useSelector((state) => state.user.email);
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

  const firstLetter = user.charAt(0).toUpperCase;
  console.log(firstLetter);

  // Send broadcast
  const handleSendAntlerExchange = () => {
    socket.emit('antler_exchange', { message: `Secret Caribou known as "${firstLetter}" is ready to antler-exchange` });
    notify('Broadcast Sent!');
  };

  // Handle Receive Antler Exchange BroadCast Sign
  useEffect(() => {
    socket.on('antler_exchange_broadcast', (data) => {
      // setSocketAntlerExchangeMsg(data.message);
      // console.log(data.message);
      notify(data.message);
    });
  }, [socket]);

  return (
    <>
      <h2 style={{ fontSize: 24, color: '#de106f', fontWeight: 900 }}> Ready To Antler Exchange</h2>
      <label htmlFor="human-presence">Notify the other Caribous! </label>
      <FaBroadcastTower style={{ fontSize: 60 }} />
      <div className="anter-exchange-container">
        <div className="loading-button">
          <button type="submit" className="button" onClick={handleSendAntlerExchange}>
            Antler Exchange
          </button>
        </div>
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={true} />
      </div>
    </>
  );
};

export default AnterExchange;
