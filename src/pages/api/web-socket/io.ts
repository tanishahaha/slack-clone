import { SocketIoApiResponse } from "@/types/app";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer } from "http";
import { Server as SocketServer } from "socket.io"


const initializeSocketServer = (httpServer: NetServer): SocketServer => {
    const path = '/api/web-socket/io';
    return new SocketServer(httpServer, {
        path,
        addTrailingSlash: false,
    })
}
const handler = async (req: NextApiRequest, res: SocketIoApiResponse) => {
    if (!res.socket.server.io) {
        res.socket.server.io = initializeSocketServer(
            res.socket.server.io as unknown as NetServer
        );
    }
    res.end();
}

export default handler;