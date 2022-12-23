import { toast } from 'react-toastify';

export const notify = msg =>
  toast(`🦄 ${msg}`, {
    position: 'bottom-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
