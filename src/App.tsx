import react from "react";

import './App.css'
import Grid from "./components/Grid/Grid";
import Modal from "./components/Modal/Modal";

import dimensionsContext, { gridDimensionsInter } from "./contexts/dimensionsContext";
import currentModalContext, { currentModalInter } from "./contexts/currentModalContext";
import gridRefresherContext, { gridRefresherInter } from "./contexts/gridRefresherContext";
import currentPhaseContext, { currentPhaseInter } from "./contexts/currentPhaseContext";
import GameStatus from "./components/GameStatus/GameStatus";
import muteContext, { muteInter } from "./contexts/muteContext";
import zoomContext, { zoomInter } from "./contexts/zoomContext";

function App() {

  const dimensions: gridDimensionsInter = react.useContext(dimensionsContext);
  const currentModal: currentModalInter = react.useContext(currentModalContext);
  const gridRefresher: gridRefresherInter = react.useContext(gridRefresherContext);
  const currentPhase: currentPhaseInter = react.useContext(currentPhaseContext);
  const mute: muteInter = react.useContext(muteContext);
  const zoom: zoomInter = react.useContext(zoomContext);

  function saturationModalOkHandler() {
    currentModal.setCurrentModal("");
    gridRefresher.refreshGrid();
    currentPhase.setPhase("game");
  }

  function clickSoundEventHandler() {
    if (mute.value) {
      const sound = new Audio("./assets/click_fx.mpga");
      sound.play();
    }
  }

  react.useEffect(() => {
    if (mute.value) {
      document.addEventListener("click", clickSoundEventHandler);
      return () => {document.removeEventListener("click", clickSoundEventHandler);}
    }
    else return;
  }, [mute.value])

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
            : (currentModal.currentModal === "victory") 
            ? 
              <Modal 
              header="You Win!"
              body="You successfully traversed the minefield!"
              buttons={{
                "Replay": () => {saturationModalOkHandler()}, 
                "Quit to Menu": () => {
                  currentModal.setCurrentModal("");
                  currentPhase.setPhase("welcome");
                }
              }}
              />
            : (currentModal.currentModal === "loss") 
            ? 
              <Modal 
              header="You Lose!"
              body="Oops, you stepped on a bomb!"
              buttons={{
                "Replay": () => {saturationModalOkHandler()}, 
                "Quit to Menu": () => {
                  currentModal.setCurrentModal("");
                  currentPhase.setPhase("welcome");
                }
              }}
              />
            : <></>
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
