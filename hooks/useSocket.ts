import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket(userId: string) {
  const socket:any = useRef()
  const [arrivalMessage, SetArrivalMessage] = useState()

  useEffect(() => {
    socket.current = io("https://alinavidi.ir/")
    socket.current.on("getMessage", (message: any) => {SetArrivalMessage(message)})
  },[])

  useEffect(() => {
    socket.current.emit("addUser", userId)
  },[userId])

  const returnedSocket = socket.current

  return { returnedSocket, arrivalMessage };
}