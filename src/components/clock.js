import React, { useEffect } from "react";
import clsx from "clsx";

export default function Clock({
  timer,
  session,
  startTime,
  setStartTime,
  color,
  pomodoro,
  short,
  long,
}) {
  // Conditionally change the class of the progress ring based on the color selected in settings
  const ringColor = clsx("progress-ring__circle", {
    red: color === "red",
    teal: color === "teal",
    purple: color === "purple",
  });

  // Function to calculate radius and circumference of the progress bar and implement progress every second through dash offset and dash array of SVG
  useEffect(() => {
    const circle = document.getElementById("circle");
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    // A new percentage must be caculated depending on which session is currently in place
    if (session === "pomodoro") {
      let percent = (timer / (pomodoro * 60)) * 100;
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    } else if (session === "short") {
      let percent = (timer / (short * 60)) * 100;
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    } else if (session === "long") {
      let percent = (timer / (long * 60)) * 100;
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }
  }, [timer, pomodoro, session, short, long]);

  return (
    <div className="clock">
      <button className="main-button" onClick={() => setStartTime(!startTime)}>
        {/* Conditionally add/remove a new SVG based on the screen size */}
        {window.screen.width < 700 ? (
          <svg
            id="circle-mobile"
            className="progress-ring"
            height="248"
            width="248"
          >
            <circle
              id="circle"
              className={ringColor}
              strokeWidth="8"
              stroke="#F87070"
              strokeLinecap="round"
              fill="transparent"
              r="120"
              cx="124"
              cy="124"
            ></circle>
          </svg>
        ) : (
          <svg
            id="circle-tablet"
            className="progress-ring"
            height="339"
            width="339"
          >
            <circle
              id="circle"
              className={ringColor}
              strokeWidth="8"
              stroke="#F87070"
              strokeLinecap="round"
              fill="transparent"
              r="165"
              cx="169"
              cy="169"
            ></circle>
          </svg>
        )}
        <h1>
          {/* As the timer is populated in seconds, functions to change countdown into minutes and seconds - appening a 0 to single digits  */}
          {Math.floor(timer / 60) < 10
            ? "0" + Math.floor(timer / 60)
            : Math.floor(timer / 60)}
          :
          {Math.floor(timer % 60) < 10
            ? "0" + Math.floor(timer % 60)
            : Math.floor(timer % 60)}
        </h1>
        {startTime && <h3>Pause</h3>}
        {!startTime && session !== "finished" && <h3>Start</h3>}
        {!startTime && session === "finished" && <h3>Restart</h3>}
      </button>
    </div>
  );
}
