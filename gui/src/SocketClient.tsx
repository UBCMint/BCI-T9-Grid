import { useState, useEffect } from 'react'
import WebSocket from 'ws';


const localURL: string = "http://127.0.0.1:5173/";

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
  

class WebSocketClient {
    private socket: WebSocket;
    private isOpen: boolean = false;
  
    constructor(private url: string) {
      this.socket = new WebSocket(this.url); //hmm maybe catch if something goes wrong with init
    }
  
    //connect to client
    public async connect() {
      await new Promise<void>((resolve) => {
        this.socket.on('open', () => {
          this.isOpen = true;
          resolve();
        });
      });
    }
  
    //send predict request
    public async predict(request: Request): Promise<Response> {
      if (!this.isOpen) {
        throw new Error('WebSocket is not open');
      }
  
      this.socket.send(JSON.stringify(request)); //REQUEST IN JSON FORMAT
  
      //Maybe more complex promise if more status are added
      return new Promise((resolve, reject) => {
        this.socket.on('message', (data: WebSocket.Data) => {
          const response = JSON.parse(data.toString()) as Response;
  
          if (response.status === 'Success') {
            console.log("Success!")
            resolve(response);
          } else {
            reject(response);
          }
        });
      });
    }
  
    public async close() {
      if (!this.isOpen) {
        return;
      }
  
      await new Promise<void>((resolve) => {
        this.socket.on('close', () => {
          this.isOpen = false;
          resolve();
        });
  
        this.socket.close();
      });
    }
  }


  
  const SocketClient: React.FC<ClientData> = (props: ClientData) => {
    const [response, setResponse] = useState<Response | null>(null);
    const [activeClient, setActiveClient] = useState<WebSocketClient | null>(null);
  
    const handleConnect = async () => {
      const req = buildRequest(props);
      const client = new WebSocketClient(localURL);
      await client.connect();
      setActiveClient(client);
      const result = await client.predict(req);
      setResponse(result);
    };
  
    const handleClose = () => {
      if (activeClient) {
        activeClient.close();
        setActiveClient(null);
      }
    };
  
    return (
      <div>
        <button onClick={handleConnect}>Connect</button>
        <button onClick={handleClose}>Disconnect</button>
        {response && <div>Response: {JSON.stringify(response)}</div>}
      </div>
    );
  };
  

export default SocketClient;

