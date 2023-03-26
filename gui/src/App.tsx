import { useState, useEffect } from 'react'
import './App.css'

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]; //FLASH SEQUENCE

const TIMEINTERVAL = 3000; //in ms

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

//COMPONENTS + TYPES
interface KeyProps {
  value: string;
  activeKey: string;
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Key = ({ value, activeKey, onMouseDown, onMouseUp,}: KeyProps) => {
  const keyCharacters = KEYS_JSON[value];
  const style = value == activeKey ? {backgroundColor: "WHITE" } : {};

  return (
    <td>
      <button data-value={value} className={`key`} onMouseDown={onMouseDown} onMouseUp={onMouseUp} style = {style}>
        {value}
        <span>{keyCharacters.join(" ")}</span>
      </button>
    </td>
  );
};


//APP

function App() {
  const [startTime, setStartTime] = useState<number>(0);
  const [word, setWord] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [previousButton, setPreviousButton] = useState('');
  const [repeat, setRepeat] = useState(0);
  const [activeKey, setActiveKey] = useState(KEYS[0]);
  const [isIntervalActive, setIsIntervalActive] = useState(true);

  //loop flashes
  useEffect(() => {
    let intervalId: any;
    if (isIntervalActive) {
      intervalId = setInterval(() => {
        const index = KEYS.indexOf(activeKey);
        const nextIndex = (index + 1) % KEYS.length;
        setActiveKey(KEYS[nextIndex]);
      }, TIMEINTERVAL);
    }
    return () => clearInterval(intervalId);
  }, [activeKey, isIntervalActive]);

  //Pause code  
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "KeyP") {
      toggleInterval();
    }
  };

  document.addEventListener("keydown", handleKeyPress);

  const toggleInterval = () => {
    setIsIntervalActive((b) => !b)
  }

  const updateTextBox = (w: string) => {
    setWord(w);
    (document.getElementById("textbox") as HTMLInputElement).value = w;
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => { 
    const oldTime = startTime;
    setStartTime(new Date().getTime());

    // console.log("time gap");
    // console.log(startTime - oldTime);

    if ((startTime - oldTime) > 1000) {
      setRepeat(0);
      setPreviousButton('');
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonPressed = event.currentTarget.getAttribute("data-value") || '';
    const timer = (new Date().getTime()) - startTime;
    //t9((document.getElementById("textbox") as HTMLInputElement).value, buttonPressed, timer);
    updateTextBox(word + buttonPressed);
  };

  //WILL UPDATE FORMATTING LATER 
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
            <Key value="1" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} activeKey = {activeKey}/>
            <Key value="2" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} activeKey = {activeKey}/>
            <Key value="3" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} activeKey = {activeKey}/>
          </tr>
          <tr>
            <Key value="4" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} activeKey = {activeKey}/>
            <Key value="5" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} activeKey = {activeKey}/>
            <Key value="6" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} activeKey = {activeKey}/>
          </tr>
          <tr>
            <Key value="7" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} activeKey = {activeKey}/>
            <Key value="8" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} activeKey = {activeKey}/>
            <Key value="9" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} activeKey = {activeKey}/>
          </tr>
        </div>
        
      </tbody>
    </table>
  );
}

export default App

  // BUGGY DUE TO STATE NOT UPDATING IMMEDIATELY - WILL FIX LATER - Trevor
  // const t9 = (text: string, buttonPressed: string, time: number) => {
  //   if (text === "" || null || '') {
  //     console.log("RESET TEXTBAR")
  //     updateTextBox("");
  //     return;
  //   }
  
  //   if (time > 500) { //HARD PRESS TO "SELECT" ??
  //     setWord((prevWord) => prevWord.concat(KEYS_JSON[buttonPressed][repeat]));
  //     console.log("WORD SET BY TIME")
  //     console.log(KEYS_JSON[buttonPressed][repeat])
  //     setRepeat(0);

  //   } else {

  //     if (previousButton !== buttonPressed) {
  //       setRepeat(0);
  //       setWord((w) => w + KEYS_JSON[buttonPressed][repeat]);
  //       setPreviousButton(buttonPressed);
  //       console.log("NEWBUTTON")

  //     } else {
  //       setRepeat((prevRepeat) => prevRepeat + 1);
  //       //repeat iterated
  //       if (repeat >=n {
  //         setRepeat(0);
  //       }
  //       setWord((w) => w.slice(-1,1) + KEYS_JSON[buttonPressed][repeat]); 
  //       console.log("CYCLE")
  //     }
  
  //   }
  //   updateTextBox();
  // };