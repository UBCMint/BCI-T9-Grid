import { useState } from 'react'
import './App.css'

const KEYS_JSON: Record<string,string[]>  = {
  "1": ["a", "b", "c"],
  "2": ["d", "e", "f"],
  "3": ["g", "h", "i"],
  "4": ["j", "k", "l"],
  "5": ["m", "n", "o"],
  "6": ["p", "q", "r", "s"],
  "7": ["t", "u", "v"],
  "8": ["w", "x", "y", "z"],
  "9": ["DEL"]
};

interface KeyProps {
  value: string;
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Key = ({ value, onMouseDown, onMouseUp }: KeyProps) => {
  const keyCharacters = KEYS_JSON[value];

  return (
    <td>
      <button data-value={value} className="key" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        {value}
        <span>{keyCharacters.join(" ")}</span>
      </button>
    </td>
  );
};


function App() {
  const [startTime, setStartTime] = useState<number>(0);
  const [word, setWord] = useState('');
  const [previousButton, setPreviousButton] = useState('');
  const [repeat, setRepeat] = useState(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => { //idk what event should be rn
    const oldTime = startTime;
    setStartTime(new Date().getTime());

    console.log("time gap");
    console.log(startTime - oldTime);

    if ((startTime - oldTime) > 1000) {
      setRepeat(0);
      setPreviousButton('');
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonPressed = event.currentTarget.getAttribute("data-value") || '';
    const timer = (new Date().getTime()) - startTime;

    const text = t9((document.getElementById("textbox") as HTMLInputElement).value, buttonPressed, timer);
    (document.getElementById("textbox") as HTMLInputElement).value = text;
  };

  const t9 = (text: string, buttonPressed: string, time: number) => {
    if (text === "") {
      setWord(text);
    }
  
    if (time > 200) {
      setWord((prevWord) => prevWord.concat(buttonPressed));
    } else {
      if (previousButton !== buttonPressed) {
        setRepeat(0);
      } else {
        setRepeat((prevRepeat) => prevRepeat + 1);
      }
  
      if (repeat > 3) {
        setRepeat(0);
      }
  
      let tempText = KEYS_JSON[buttonPressed][repeat];
  
      if (tempText === undefined) {
        setRepeat(0);
        tempText = KEYS_JSON[buttonPressed][repeat];
      }
      if (previousButton === buttonPressed) {
        setWord((prevWord) => prevWord.slice(0, -1));
      } else {
        setPreviousButton(buttonPressed);
      }
      setWord((prevWord) => prevWord.concat(tempText));
    }
  
    text = word;
    return text;
  };
  
  
  return (
    <table id="grid">
      <tbody>
        <div id="display">
          <tr>
            <td colSpan={3}>
              <input type="text" id="textbox" />
            </td>
          </tr>
        </div>
        <div id="keypad">
          <tr>
            <Key value="1" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
            <Key value="2" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
            <Key value="3" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
          </tr>
          <tr>
            <Key value="4" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
            <Key value="5" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
            <Key value="6" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
          </tr>
          <tr>
            <Key value="7" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
            <Key value="8" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
            <Key value="9" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
          </tr>
        </div>
        
      </tbody>
    </table>
  );
}

export default App
