// toast
import { useEffect, useRef } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = (props) => {
  // const toastDark = () => toast.dark('This is Toast Notification for Dark');
  // const toastInfo = () => toast.info('This is Toast Notification for Info');
  // const toastSuccess = () => toast.success('This is Toast Notification for Success');
  // const toastWarn = () => toast.warn('This is Toast Notification for Warn');
  // const toastError = () => toast.error('This is Toast Notification for Error');

  const toastId = useRef(null);

  // Toast
  // const customId = 'custom-id-yes';
  const notify = (message) => {
    toastId.current = toast.success(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      // toastId: customId,
      newestOnTop: true,
    });

    return toast;
  };

  useEffect(() => {
    notify('hello');
    toast.dismiss(toastId.current);
    return () => {
      notify('');
      toast.dismiss(toastId.current);
    };
  });

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        transition={Slide}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        theme="dark"
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // toastId={customId}
      />
    </div>
  );
};

export default ToastNotification;
