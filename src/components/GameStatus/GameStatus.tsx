import { useContext } from "react";

import "./GameStatus.css";

import bombsLeftContext, {bombsLeftInter} from "../../contexts/bombsLeftContext";
import muteContext, { muteInter } from "../../contexts/muteContext";

export default function GameStatus(
) {

    const bombsLeft: bombsLeftInter = useContext(bombsLeftContext);
    const mute: muteInter = useContext(muteContext);

    return (
        <div 
        className="GameStatus">
            <div 
            className="BombsLeftArea">
                <div 
                className="Label">
                    Bombs Left:
                </div>
                <div 
                className="Value">
                    {bombsLeft.value}
                </div>
            </div>
            <div 
            className={"MuteArea"}>
                <button 
                className={"Button" + ((mute.value) ? " Muted " : " NonMuted ")}
                onClick={() => {mute.invertMute()}}
                >
                    Mute 
                </button>
            </div>
        </div>
    );
}