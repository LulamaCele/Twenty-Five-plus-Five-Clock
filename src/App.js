import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { PiPlayPauseFill } from "react-icons/pi";
import { LuTimerReset } from "react-icons/lu";

const App = () => {

  const [breakLen, setBreakLen] = React.useState(5);
  const [sessionLen, setSessionLen] = React.useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState('SESSION');
  const [timeLeft, setTimeLeft] = useState(1500);

  const timeout = setTimeout(() => {
    if(timeLeft && play) {
      setTimeLeft(timeLeft -1)
    }
  }, 1000);

  const handleBreakIncrement = () => {
    if(breakLen < 60) {
      setBreakLen((prevState) => prevState + 1)
    }
  };
  
  const handleBreakDecrement = () => {
    if(breakLen > 1) {
        setBreakLen((prevState) => prevState - 1)
    }
  };
  
  const handleSessionIncrement = () => {
    if(sessionLen < 60){
      setSessionLen((prevState) => prevState + 1);
      setTimeLeft((prevState) => prevState + 60);
    }
  }
  
   const handleSessionDecrement = () => {
    if(sessionLen > 1) {
        setSessionLen((prevState) => prevState - 1);
        setTimeLeft((prevState) => prevState - 60);
    } 
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLen(5);
    setSessionLen(25);
    setTimingType('SESSION');
    const audio = document.getElementById('beep');
    audio.pause()
    audio.currentTime = 0;
  }

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }

  const resetTimer = () => {
    const audio = document.getElementById('beep');
    if(!timeLeft && timingType === 'SESSION') {
      setTimeLeft(breakLen * 60)
      setTimingType('Break')
      audio.play()
    }
    if(!timeLeft && timingType === 'BREAK') {
      setTimeLeft(sessionLen * 60)
      setTimingType('SESSION')
      audio.pause();
      audio.currentTime = 0;
    }
  }

  const clock = () => {
    if(play){
      timeout
      resetTimer()
    }else {
      clearTimeout(timeout)
    }
  }

  useEffect(() => {
    clock()
  }, [play, timeLeft, timeout])

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  const title = timingType ==='SESSION' ? 'Session' : 'Break';

return (
  <div>
    <div className="container">
      <h2>25 + 5 Clock</h2>
      <div id="break-session-length">
        <div>
          <h3 id="break-label">Break Length</h3>
          <AiOutlineArrowDown
            disabled={play}
            id="break-decrement"
            onClick={handleBreakDecrement}
          />
          <label id="break-length">{breakLen}</label>
          <AiOutlineArrowUp
            disabled={play}
            id="break-increment"
            onClick={handleBreakIncrement}
          />
        </div>
        <div>
          <h3 id="session-label">Session Length</h3>
          <AiOutlineArrowDown
            disabled={play}
            id="session-decrement"
            onClick={handleSessionDecrement}
          />
          <label id="session-length">{sessionLen}</label>
          <AiOutlineArrowUp
            disabled={play}
            id="session-increment"
            onClick={handleSessionIncrement}
          />
        </div>
      </div>
      <div className="timer-container">
        <div class="timer-container">
          <h2 id="timer-label">{title}</h2>
          <h3 id="time-left">{timeFormatter()}</h3>
        </div>
        <div class="timer-buttons">
          <PiPlayPauseFill onClick={handlePlay} id="start_stop" />
          <LuTimerReset onClick={handleReset} id="reset" />
        </div>
      </div>
    </div>
    <audio
      id="beep"
      preload="auto"
      src="https:///raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
  </div>
);
};

// const App = () => {
//   const [breakLen, setBreakLen] = useState(5);
//   const [sessionLen, setSessionLen] = useState(25);
//   const [minutes, setMinutes] = useState(sessionLen);
//   const [seconds, setSeconds] = useState(60);

//   const handleBreakIncrement = () => {
//     setBreakLen((prevState) => prevState + 1)
//     console.log({ breakLen })
//   };

//   const handleBreakDecrement = () => {
//     if (breakLen > 0) {
//       setBreakLen((prevState) => prevState - 1)
//     } else {
//       setBreakLen(0);
//     }
//     console.log({ breakLen })
//   };

//   const handleSessionIncrement = () => {
//     setSessionLen((prevState) => prevState + 1)
//     setMinutes(sessionLen + 1);
//     console.log({ sessionLen })
//   }

//   const handleSessionDecrement = () => {
//     if (sessionLen > 0) {
//       setSessionLen((prevState) => prevState - 1)
//       setMinutes(sessionLen - 1);
//     } else {
//       setSessionLen(0);
//     }
//     console.log({ sessionLen })
//   };

//   const handleReset = () => {
//     setBreakLen(5);
//     setSessionLen(25);
//     setMinutes(25);
//     setSeconds(60);

//   }

//   const handlePlayPause = () => {
//     const myInterval = setInterval(myTimer, 1000);

//     function myTimer() {
//       setSeconds((prevState) => prevState - 1)
//     }
//   }

//   return (
//     <div class='container'>
//       <div id='clock'>
//         25+5 Clock
//         <Controls breakLen={breakLen}
//           sessionLen={sessionLen}
//           handleBreakIncrement={handleBreakIncrement}
//           handleBreakDecrement={handleBreakDecrement}
//           handleSessionDecrement={handleSessionDecrement}
//           handleSessionIncrement={handleSessionIncrement}
//         />
//         <Timer handleReset={handleReset} handlePlayPause={handlePlayPause} minutes={minutes} seconds={seconds} />
//       </div>
//     </div>)
// }

export default App;
