import react from "react";

import './App.css'
import Grid from "./components/Grid/Grid";
import Modal from "./components/Modal/Modal";

import dimensionsContext, { gridDimensionsInter } from "./contexts/dimensionsContext";
import currentModalContext, { currentModalInter } from "./contexts/currentModalContext";
import gridRefresherContext, { gridRefresherInter } from "./contexts/gridRefresherContext";
import currentPhaseContext, { currentPhaseInter } from "./contexts/currentPhaseContext";
import GameStatus from "./components/GameStatus/GameStatus";

function App() {

  const dimensions: gridDimensionsInter = react.useContext(dimensionsContext);
  const currentModal: currentModalInter = react.useContext(currentModalContext);
  const gridRefresher: gridRefresherInter = react.useContext(gridRefresherContext);
  const currentPhase: currentPhaseInter = react.useContext(currentPhaseContext);

  function saturationModalOkHandler() {
    currentModal.setCurrentModal("");
    gridRefresher.refreshGrid();
  }

  document.addEventListener("click", () => {
    const sound = new Audio("./assets/click_fx.mpga");
    sound.play();
  });

  return (
    <div 
    className="App">
      {
      (currentPhase.phase === "game")
      ? 
        <>
            <Grid dimensions={dimensions.get} />
            {
              (currentModal.currentModal === "saturation") 
              ? 
                <Modal 
                header="Hey!"
                body="The board has been saturated, there are no more moves to be made..."
                buttons={{
                  "Replay": () => {saturationModalOkHandler()}, 
                  "Quit to Menu": () => {
                    currentModal.setCurrentModal("");
                    currentPhase.setPhase("welcome");
                  }
                }}
                />
              : (<></>)
            }
            <GameStatus />
        </>
      : 
            (currentPhase.phase === "welcome") 
            ? <>
              <Modal 
              header="Welcome to Minesweeper!"
              body=""
              buttons={{
                "Start": () => {
                  currentPhase.setPhase("game");
                }
              }}
              />
            </>
            : <></>

      }
    </div>
  );
}

export default App
