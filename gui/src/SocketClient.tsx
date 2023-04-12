import { useState, useEffect } from 'react'
import WebSocket from 'ws';

const localURL: string = "http://127.0.0.1:5173/";

interface ClientData {
    url: string;
    sequence: string;
    time: number;
    //currentHighlight: string;
}

interface Request {
    Command: string;
    Message?: {
        Sequence?: string;
        Depth?: string;
        Number?: string;
    };
}
  
interface Response {
    status: string;
    data?: string[];
}

interface PredictionModuleData {
    word: string;
    frequency?: number;
}

const PredictionModule: React.FC<PredictionModuleData> = (props: PredictionModuleData) => {
    return(
        <button>{props.word}</button>
    )
}

const SocketClient: React.FC<ClientData> = (props: ClientData) => {

    const ActiveClient = new WebSocketClient(localURL); //placeholder
    
    const req = buildRequest(props)

    try{
        ActiveClient.connect()
        ActiveClient.predict(req)
    }

    return(
        <div>
            <PredictionModule word = {"test"}/>
        </div>
    )

}

interface Request {
    Command: string;
    message?: {
      sequence?: string;
      depth?: string;
      number?: string;
    };
  }
      

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
  
    //send predict reqest
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