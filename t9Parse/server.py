import asyncio
import json as json
import websockets as ws
import numpy as np
from t9Parser import *



async def server(websocket, path):

    async for message in websocket:
        with (
            open('Data/100k2005.json', 'r') as wm
        ):
            # Handle incoming message from the client
            print(f"Received message: {message}")

            # Send response back to client
            response = ProcessRequest(message, wm)
            print(response)
            await websocket.send(response)


def ProcessRequest(req, wordjson):
    wordmap = json.load(wordjson)
    reqmap = json.loads(req)
    cmd = reqmap["Command"]
    msg = reqmap["Message"]
    output = {
        "status": "Bad Request",
    }

    match cmd:
        case "Predict":
            try:
                output["data"] = predict(msg["Sequence"], wordmap, int(msg["Depth"]))[0:int(msg["Number"])]
                output["status"] = "Success"
            except TypeError as err:
                print("TypeError: " + repr(err))
                output["status"] = "TypeError: " + repr(err)
                output["data"] = []
            except Exception as err:
                print("Exception: " + err)
                output["status"] = "Exception: " + err
                output["data"] = []
        case _:
            output["status"] = "Bad Request: Invalid Command " + cmd
    
    return json.dumps(output)

print("server started")
start_server = ws.serve(server, "localhost", 8000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
