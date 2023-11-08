import { useEffect } from 'react';
import { io } from 'socket.io-client';

export const useSocketConnect = () => {
  const socket = io('http://localhost:8000');

  const connectionCallback = () => {
    console.log('Соединение с сервером установлено');
  };

  useEffect(() => {
    socket.on('connect', connectionCallback);
    return () => {
      socket.off('connect', connectionCallback);
    };
  }, [socket]);

  return socket;
};
