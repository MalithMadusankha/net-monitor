import React from "react";

function LoadingUI({ name }) {
  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "40px 0",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#8884d8"
            strokeWidth="5"
            strokeDasharray="31.4 31.4"
            strokeDashoffset="0"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <span
          style={{
            marginTop: "16px",
            fontSize: "18px",
            color: "#8884d8",
          }}
        >
          Loading {name} data...
        </span>
      </div>
    </>
  );
}

export default LoadingUI;
