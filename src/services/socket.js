import React from "react";
import socketio from "socket.io-client";
export const socket = socketio.connect(`http://192.168.0.170:5050`);