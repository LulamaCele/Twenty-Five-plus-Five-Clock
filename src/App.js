import React from "react";
import './App.css';
import {useState} from 'react';
import {AiOutlineArrowDown} from "react-icons/ai";
import {AiOutlineArrowUp} from "react-icons/ai";
import {PiPlayPauseFill} from "react-icons/pi";
import {LuTimerReset} from "react-icons/lu";

const Controls = ({handleBreakIncrement,
                   handleBreakDecrement,
                   handleSessionDecrement,
                   handleSessionIncrement,
                   breakLen, sessionLen}) => {
  return (
    <div>
       <div>
      <label id='break-label'>Break Length</label>
      <AiOutlineArrowDown id='break-decrement' onClick={handleBreakDecrement} />
      <label id='break-length'>{breakLen}</label>
      <AiOutlineArrowUp id='break-increment' onClick={handleBreakIncrement}/>
    </div>
    <div>
      <label id='session-label'>Session Length</label>
      <AiOutlineArrowDown id='session-decrement' onClick={handleSessionDecrement} />
      <label id='session-length'>{sessionLen}</label>
      <AiOutlineArrowUp id='session-increment' onClick={handleSessionIncrement}/>
    </div>
    </div>
  )
}

const Timer = ({handleReset, handlePlayPause, sessionLen, minutes, seconds}) => {
  
  return (
    <div>
      <div class='timer-container'>
        <label id='timer-label'>Session</label>
        <div id='time-left'>{minutes}:{seconds}</div>
      </div>
      <div class='timer-buttons'>
        <PiPlayPauseFill onClick={handlePlayPause}/>
        <LuTimerReset onClick={handleReset}/>
      </div>
    </div>
  )
}

const App = () => {
  const [breakLen, setBreakLen] = useState(5);
  const [sessionLen, setSessionLen] = useState(25);
  const [minutes, setMinutes] = useState(sessionLen);
  const [seconds, setSeconds] = useState(60);
  
  const handleBreakIncrement = () => {
    setBreakLen((prevState) => prevState + 1)
    console.log({breakLen})
  };
  
  const handleBreakDecrement = () => {
    if(breakLen > 0) {
        setBreakLen((prevState) => prevState - 1)
    } else {
      setBreakLen(0);
    }
    console.log({breakLen})
  };
  
  const handleSessionIncrement = () => {
     setSessionLen((prevState) => prevState + 1)
     setMinutes(sessionLen + 1);
    console.log({sessionLen})
  }
  
   const handleSessionDecrement = () => {
    if(sessionLen > 0) {
        setSessionLen((prevState) => prevState - 1)
        setMinutes(sessionLen - 1);
    } else {
      setSessionLen(0);
    }
    console.log({sessionLen})
  };
  
  const handleReset = () => {
    setBreakLen(5);
    setSessionLen(25);
    setMinutes(25);
    setSeconds(60);
    
  }
  
  const handlePlayPause = () => {
    const myInterval = setInterval(myTimer, 1000);
    
    function myTimer() {
     setSeconds((prevState) => prevState -1) 
    }
  }
  
 
  return(
  <div class='container'>
      <div id='clock'>
         25+5 Clock
        <Controls breakLen={breakLen} 
          sessionLen={sessionLen}
          handleBreakIncrement={handleBreakIncrement} 
          handleBreakDecrement={handleBreakDecrement} 
          handleSessionDecrement = {handleSessionDecrement}
          handleSessionIncrement = {handleSessionIncrement}
          />
        <Timer handleReset={handleReset} handlePlayPause={handlePlayPause} minutes={minutes} seconds={seconds}/>
      </div>
  </div>)
}

export default App;
