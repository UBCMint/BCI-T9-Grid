import { useState, useEffect, useCallback } from 'react'
import useWebSocket from 'react-use-websocket';

const localURL: string = "http://127.0.0.1:8000/";

interface ClientData { //current client stuff for signal processing syncing
    url: string;
    sequence: string;
    time: number;
    //currentHighlight: string;
}

interface Request { //actual websocket request being sent
    Command: string;
    Message?: {
        Sequence?: string;
        Depth?: string;
        Number?: string;
    };
}
  
interface Response { //whatever the server sends back
    status: string;
    data?: string[];
}

interface PredictionModuleData { //??
    word: string;
    frequency?: number;
}

const PredictionModule: React.FC<PredictionModuleData> = (props: PredictionModuleData) => {
    return(
        <button>{props.word}</button>
    )
}

interface Request {
    Command: string;
    message?: {
      sequence?: string;
      depth?: string;
      number?: string;
    };
  };
      

const buildRequest = (para: { sequence: string }): Request => {
    const req: Request = {
      Command: "Predict",
      message: {
        sequence: para.sequence,
        depth: "1",
        number: "4",
      },
    };
    return req;
  };
  

  //if there's a problem it's here zero doubt
  const SocketClient: React.FC<ClientData> = (props: ClientData) => {
    const [socketUrl, setSocketUrl] = useState("ws://localhost:8000");
    const [messageHistory, setMessageHistory] = useState(new Array<any>());


    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
      if (lastMessage !== null) {
        setMessageHistory((prev) => prev.concat(lastMessage));
      }
    }, [lastMessage, setMessageHistory]);
  

    const handleConnect = async () => {
      setSocketUrl(props.url);
    };

    const send = useCallback( ()=> sendMessage(JSON.stringify({"Command": "Predict", "Message": {"Sequence": "2232", "Depth": "2", "Number": "5"}}) ), []);
  
    const handleClose = () => {

    };
  
    return (
      <div>
        <button onClick={handleConnect}>Connect</button>
        <button onClick={send}>Send</button>
        <button onClick={handleClose}>Disconnect</button>
        {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      </div>
    );
  };
  

  const parseMessage = (message:string) => {
    let json = JSON.parse(message);
    return json["status"];
  }

export default SocketClient;

