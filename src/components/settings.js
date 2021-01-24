import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Settings({
  short,
  long,
  pomodoro,
  setShort,
  setLong,
  setPomodoro,
  applySettings,
  setFontFamily,
  setColor,
}) {
  // Functions to add or substract minutes based on user input
  function increment(func) {
    func((val) => val + 1);
  }

  function decrement(func) {
    func((val) => val - 1);
  }

  // Close the settings window when close is clicked
  function closeSettings() {
    let settingsTab = document.querySelector(".settings");
    settingsTab.style.display = "none";
  }

  // When a font is selected, loop through the existing fonts and remove the active class, then add the active class to the font that was clicked
  function handleFontFamily(font, event) {
    setFontFamily(font);
    let fontButtons = document.querySelectorAll(".font-button");
    fontButtons.forEach((item) => {
      item.classList.remove("active");
    });
    event.target.classList.add("active");
  }

  // When a color is selected, loop through the existing colors and remove the active class, then add the active class to the font that was clicked
  function handleColor(color, event) {
    setColor(color);
    let colorButtons = document.querySelectorAll(".color-button");
    colorButtons.forEach((item) => {
      item.classList.remove("active");
    });
    event.target.classList.add("active");
  }

  return (
    <div className="settings">
      <div className="settings-header">
        <h2>Settings</h2>
        <svg
          className="close-button"
          onClick={closeSettings}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
        >
          <path
            fill="#1E213F"
            fill-rule="evenodd"
            d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
            opacity=".5"
          />
        </svg>
      </div>
      <div className="settings-time settings-container">
        <h4>Time (minutes)</h4>
        <div className="time-control-container">
          <div className="time-control">
            <p>Pomodoro</p>
            <div className="time-toggle">
              <p>{pomodoro}</p>
              <div className="toggles">
                <svg
                  onClick={pomodoro > 60 ? increment(setPomodoro) : null}
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="7"
                >
                  <path
                    fill="none"
                    stroke="#1E213F"
                    strokeOpacity=".25"
                    strokeWidth="2"
                    d="M1 6l6-4 6 4"
                  />
                </svg>
                <svg
                  onClick={() => decrement(setPomodoro)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="7"
                >
                  <path
                    fill="none"
                    stroke="#1E213F"
                    strokeOpacity=".25"
                    strokeWidth="2"
                    d="M1 1l6 4 6-4"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="time-control">
            <p>Short break</p>
            <div className="time-toggle">
              <p>{short}</p>
              <div className="toggles">
                <svg
                  onClick={() => increment(setShort)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="7"
                >
                  <path
                    fill="none"
                    stroke="#1E213F"
                    strokeOpacity=".25"
                    strokeWidth="2"
                    d="M1 6l6-4 6 4"
                  />
                </svg>
                <svg
                  onClick={() => decrement(setShort)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="7"
                >
                  <path
                    fill="none"
                    stroke="#1E213F"
                    strokeOpacity=".25"
                    strokeWidth="2"
                    d="M1 1l6 4 6-4"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="time-control">
            <p>Long break</p>
            <div className="time-toggle">
              <p>{long}</p>
              <div className="toggles">
                <svg
                  onClick={() => increment(setLong)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="7"
                >
                  <path
                    fill="none"
                    stroke="#1E213F"
                    strokeOpacity=".25"
                    strokeWidth="2"
                    d="M1 6l6-4 6 4"
                  />
                </svg>
                <svg
                  onClick={() => decrement(setLong)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="7"
                >
                  <path
                    fill="none"
                    stroke="#1E213F"
                    strokeOpacity=".25"
                    strokeWidth="2"
                    d="M1 1l6 4 6-4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-font settings-container">
        <h4>Font</h4>
        <div className="font-buttons">
          <button
            onClick={(event) => handleFontFamily("kumbh", event)}
            className="font-button kumbh active"
          >
            Aa
          </button>
          <button
            onClick={(event) => handleFontFamily("roboto", event)}
            className="font-button roboto"
          >
            Aa
          </button>
          <button
            onClick={(event) => handleFontFamily("space", event)}
            className="font-button space"
          >
            Aa
          </button>
        </div>
      </div>

      <div className="settings-color settings-container">
        <h4>color</h4>
        <div className="color-buttons">
          <button
            className="color-button red active"
            onClick={(event) => handleColor("red", event)}
          >
            <FontAwesomeIcon className="check" icon={faCheck} />
          </button>
          <button
            className="color-button teal"
            onClick={(event) => handleColor("teal", event)}
          >
            <FontAwesomeIcon className="check" icon={faCheck} />
          </button>
          <button
            className="color-button purple"
            onClick={(event) => handleColor("purple", event)}
          >
            <FontAwesomeIcon className="check" icon={faCheck} />
          </button>
        </div>
      </div>
      <button
        onClick={() => applySettings(pomodoro, "pomodoro")}
        className="apply-button"
      >
        Apply
      </button>
    </div>
  );
}
