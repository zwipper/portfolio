import React, { useEffect, useRef } from "react";

export const Bear = (props) => {
  const bear = useRef();
  const happyEyes = [useRef(), useRef()];
  const blushes = [useRef(), useRef()];

  const hover = (state) => {
    blushes.forEach((blush) => {
      blush.current.style.opacity = state === "enter" ? "1" : "0";
    });

    happyEyes.forEach((eye) => {
      eye.current.style.opacity = state === "enter" ? "1" : "0";
    });

    [document.getElementById("eye"), document.getElementById("eye_2")].forEach(
      (eye) => {
        eye.style.opacity = state !== "enter" ? "1" : "0";
      }
    );
  };

  useEffect(() => {
    const moveEyes = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const rekt = document
        ?.getElementById("bear")
        ?.getBoundingClientRect();
      if (!rekt) return;
      const anchorX = rekt.left + rekt.width / 2;
      const anchorY = rekt.top + rekt.height / 2;
      let intensity = 0.01;
      let moveX = (mouseX - anchorX) * intensity;
      let moveY = (mouseY - anchorY) * intensity;
      [
        document.getElementById("eye"),
        document.getElementById("eye_2"),
      ].forEach((eye) => {
        if (eye) {
          eye.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        }
      });
    };

    document.addEventListener("mousemove", moveEyes);

    blushes.forEach((blush) => {
      blush.current.style.opacity = "0";
      blush.current.style.transition = "all 0.15s ease";
    });

    happyEyes.forEach((eye) => {
      eye.current.style.opacity = "0";
      eye.current.style.transition = "all 0.15s ease";
    });

    [document.getElementById("eye"), document.getElementById("eye_2")].forEach(
      (eye) => {
        if (eye) {
          eye.style.transition = "opacity 0.15s ease";
        }
      }
    );

    return () => {
      document.removeEventListener("mousemove", moveEyes);
    };
  }, []);

  return (
    <div
      id="bear"
      style={{ width: "100px", cursor: "pointer" }}
      ref={bear}
      onMouseEnter={() => hover("enter")}
      onMouseLeave={() => hover("leave")}
    >
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        style={{ pointerEvents: "none" }}
      >
        {/* Head */}
        <circle cx="100" cy="100" r="80" fill="#8B5E3C" />
        {/* Ears */}
        <circle cx="40" cy="50" r="25" fill="#8B5E3C" />
        <circle cx="160" cy="50" r="25" fill="#8B5E3C" />
        <circle cx="40" cy="50" r="12" fill="#C49A6C" />
        <circle cx="160" cy="50" r="12" fill="#C49A6C" />
        {/* Eyes */}
        <circle id="eye" cx="70" cy="100" r="8" fill="#353A42" />
        <circle id="eye_2" cx="130" cy="100" r="8" fill="#353A42" />
        {/* Happy eyes (hidden by default) */}
        <path
          ref={happyEyes[0]}
          d="M60 95 q10 10 20 0"
          stroke="#353A42"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          ref={happyEyes[1]}
          d="M120 95 q10 10 20 0"
          stroke="#353A42"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Nose + muzzle */}
        <ellipse cx="100" cy="130" rx="30" ry="20" fill="#C49A6C" />
        <circle cx="100" cy="125" r="8" fill="#353A42" />
        {/* Mouth */}
        <path
          d="M100 133 q0 10 -10 10"
          stroke="#353A42"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M100 133 q0 10 10 10"
          stroke="#353A42"
          strokeWidth="3"
          fill="none"
        />
        {/* Blush */}
        <ellipse
          ref={blushes[0]}
          cx="65"
          cy="115"
          rx="12"
          ry="6"
          fill="#FDB0D1"
        />
        <ellipse
          ref={blushes[1]}
          cx="135"
          cy="115"
          rx="12"
          ry="6"
          fill="#FDB0D1"
        />
      </svg>
    </div>
  );
};
