"use client"

import { useEffect, useState } from 'react';
import useSocket from '../../hooks/useSocket';

export default function Home() {
  const socket = useSocket('http://localhost:8080/events');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastPong, setLastPong] = useState<string | null>(null);

  useEffect(() => {
		if (!socket) {
			console.log(`Socket is null, can't connect to server`);
		}
    if (socket) {

			console.log("Socket is connected");
      socket.on('connect', () => {
        setIsConnected(true);
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
      });

      socket.on('pong', (data: string) => {
        setLastPong(data);
      });
    }

    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('pong');
      }
    };
  }, [socket]);

  const sendPing = () => {
    if (socket) {
      socket.emit('ping', 'Hello from Next.js!');
    }
  };

  return (
    <div>
      <h1>WebSocket Test</h1>
      <p>Connected: {isConnected.toString()}</p>
      <button onClick={sendPing}>Send Ping</button>
      {lastPong && <p>Last pong: {lastPong}</p>}
    </div>
  );
}