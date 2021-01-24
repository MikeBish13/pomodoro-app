import "./styles/App.css";
import { useState, useEffect } from "react";
import Settings from "./components/settings";
import Clock from "./components/clock";
import SettingsIcon from "./images/icon-settings.svg";
import clsx from "clsx";
import Logo from "./images/logo.svg"

function App() {
  const [pomodoro, setPomodoro] = useState(25);
  const [short, setShort] = useState(5);
  const [long, setLong] = useState(15);
  const [startTime, setStartTime] = useState(false);
  const [timer, setTimer] = useState(25 * 60);
  const [session, setSession] = useState("pomodoro");
  const [fontFamily, setFontFamily] = useState("kumbh");
  const [ color, setColor ] = useState('red');
  
  // Conditionally add classes to the App based on font settings
  const fontClasses = clsx("App", {
    kumbh: fontFamily === "kumbh",
    roboto: fontFamily === "roboto",
    space: fontFamily === "space",
  });

   // Conditionally add classes to the App based on color settings
  const buttonColorClass = clsx("control-button active", {
    red: color === 'red',
    teal: color === 'teal',
    purple: color === 'purple'
  })

  // On click of settings button, display the settings window
  function displaySettings() {
    let settingsTab = document.querySelector(".settings");
    settingsTab.style.display = "block";
  }

 // Initiate the timer by setting the correct session and adding the value to the timer (multiplied by 60 to get total seconds) 
 // if initiated from the settings window, close the window by removing its display
  function applySettings(time, session) {
    let settingsTab = document.querySelector(".settings");
    settingsTab.style.display = "none";
    setStartTime(false);
    setTimer(time * 60);
    setSession(session);
  }


  useEffect(() => {
    // Function that is called when the timer hits 0, skipping to the next session and setting the relevant value of the timer
    function switchToBreak() {
      if (session === "pomodoro") {
        setSession("short");
        setTimer(short * 60);
      } else if (session === "short") {
        setSession("long");
        setTimer(long * 60);
      } else if (session === "long") {
        setSession("finished");
        setTimer(0);
        setStartTime(false);
      } else if (session === "finished") {
        setSession("pomodoro");
        setTimer(pomodoro * 60);
        setStartTime(true);
      }
    }

    // If the start is triggered and the amount of time is greater than 0, reduce the time by 1 each second
    if (startTime) {
      if (timer > 0) {
        let interval = setInterval(() => {
          setTimer((seconds) => seconds - 1);
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      } else {
        // when the timer hits 0, call the switch function above which changes the session or ends the cycle
        switchToBreak();
      }
    }
  }, [startTime, timer, pomodoro, short, long, session]);

  return (
    <div className={fontClasses}>
      <img className="page-title" src={Logo} alt="pomodoro logo"></img>
      <div className="control-buttons">
        <button
          className={session === 'pomodoro' ? buttonColorClass : 'control-button'}
          onClick={() => applySettings(pomodoro, "pomodoro")}
        >
          Pomodoro
        </button>
        <button
          className={session === 'short' ? buttonColorClass : 'control-button'}
          onClick={() => applySettings(short, "short")}
        >
          Short Break
        </button>
        <button
          className={session === 'long' ? buttonColorClass : 'control-button'}
          onClick={() => applySettings(long, "long")}
        >
          Long Break
        </button>
      </div>
      <Clock
        setStartTime={setStartTime}
        startTime={startTime}
        timer={timer}
        session={session}
        color={color}
        pomodoro={pomodoro}
        short={short}
        long={long}
      />
      <Settings
        pomodoro={pomodoro}
        long={long}
        short={short}
        setPomodoro={setPomodoro}
        setShort={setShort}
        setLong={setLong}
        applySettings={applySettings}
        setFontFamily={setFontFamily}
        setColor={setColor}
      />
      <img
        className="settings-wheel"
        src={SettingsIcon}
        alt="settings icon"
        onClick={displaySettings}
      ></img>
    </div>
  );
}

export default App;
