'use client';

import { createContext, FC, ReactNode, use, useContext, useEffect, useState } from "react";
import { io as ClientIO, Socket } from 'socket.io-client'

type SocketContextType = {
    socket: Socket | null;
    isConnected: boolean;
};
const SocketContetxt = createContext<SocketContextType>({
    isConnected: false,
    socket: null,
});

export const useSocket = () => useContext(SocketContetxt);
export const WebSocketProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
        if (!siteUrl) {
            console.log("no url")
            return;
        }

        const SocketInstance = ClientIO(siteUrl, {
            path: '/api/web-socket/io',
            addTrailingSlash: false,
        })

        SocketInstance.on('connect', () => {
            setIsConnected(true);
        })

        SocketInstance.on('disconnect', () => {
            setIsConnected(false)
        })

        setSocket(SocketInstance);

        return () => {
            SocketInstance.disconnect()
        }
    }, []);

    return (
        <SocketContetxt.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContetxt.Provider>
    )

}