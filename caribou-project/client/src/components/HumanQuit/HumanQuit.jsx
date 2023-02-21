import { useEffect } from 'react';

// SocketIO
import socket from '@services/websocket/webSocketIO';

// Toast
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HumanQuit = () => {
  const customId = 'custom-id-HumanQuite';

  const notify = (message) =>
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

  // Handle Receive Antler Exchange BroadCast Sign
  useEffect(() => {
    let isCancelled = true;
    socket.on('human_quite_received_broadcast', (data) => {
      if (isCancelled) {
        notify(data.message);
      }
    });
    return () => {
      toast.dismiss('custom-id-why');
      isCancelled = false;
    };
  }, []);

  return (
    <div>
      <ToastContainer
        transition={Slide}
        theme="dark"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default HumanQuit;
