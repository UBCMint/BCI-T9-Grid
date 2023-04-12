import asyncio
import websockets
import json

async def client():
    async with websockets.connect("ws://localhost:8000") as websocket:
        # Send a message to the server
        await websocket.send(mockReq())

        # Receive a message from the server
        response = await websocket.recv()
        print(f"Received response: {repr(response)}")

def mockReq():
    req = {
        "Command": "Predict",
        "Message": {
            "Sequence": "1554", 
            "Depth": "2",
            "Number": "5"
        }
    }
    return json.dumps(req)

asyncio.get_event_loop().run_until_complete(client())
