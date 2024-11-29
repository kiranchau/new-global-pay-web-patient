import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Loader from "react-loader";

import LoadingOverlay from "react-loading-overlay";
//import BounceLoader from "react-spinners/BounceLoader";

import "./styles.css";

import styled, { css } from "styled-components";

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

function App() {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    // visible true -> false
    if (!loaded) {
      //setTimeout(() => setLoaded(true), 250); // 0.25초 뒤에 해제
      //debugger;
      setTimeout(() => setLoaded(true), 10000); // 10초 뒤에
    }

    //setLoaded(loaded);
  }, [loaded]);

  return (
    <div className="App">
      <button onClick={() => setLoaded(!loaded)}>Start Loading</button>
      <DarkBackground disappear={!loaded}>
        {/* <Loader
          loaded={false}
          lines={13}
          length={20}
          width={10}
          radius={30}
          corners={1}
          rotate={0}
          direction={1}
          color="#a5d8ff"
          speed={1}
          trail={60}
          shadow={false}
          hwaccel={false}
          className="spinner"
          zIndex={2e9}
          top="50%"
          left="50%"
          scale={1.0}
          loadedClassName="loadedContent"
        /> */}
        <LoadingOverlay
          active={true}
          // spinner={<BounceLoader />}
          spinner={true}
          text="Loading your content..."
        > 
          {/* <p>Some content or children or something.</p> */}
        </LoadingOverlay>
      </DarkBackground>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
