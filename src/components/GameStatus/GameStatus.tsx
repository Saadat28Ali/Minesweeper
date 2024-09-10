import { useContext } from "react";

import "./GameStatus.css";

import bombsLeftContext, {bombsLeftInter} from "../../contexts/bombsLeftContext";

export default function GameStatus(
) {

    const bombsLeft: bombsLeftInter = useContext(bombsLeftContext);

    return (
        <div 
        className="GameStatus">
            <div 
            className="Label">
                Bombs Left:
            </div>
            <div 
            className="Value">
                {bombsLeft.value}
            </div>
        </div>
    );
}