import react from "react";
import { motion } from "framer-motion";

import "./Grid.css";
import Slot from "../Slot/Slot";

import currentModalContext, { currentModalInter } from "../../contexts/currentModalContext";
import gridRefresherContext, { gridRefresherInter } from "../../contexts/gridRefresherContext";
import bombsLeftContext, { bombsLeftInter } from "../../contexts/bombsLeftContext";

interface Slot {
    rowIndex: number,
    columnIndex: number, 
    value: string, 
    bomb: boolean
}

export default function Grid(
    { dimensions }:
    {dimensions: {[key: string]: number}}
) 
{
    const [loss, setLoss] = react.useState<boolean>(false);
    const [modifyingGrid, setModifyingGrid] = react.useState<boolean>(false);

    const currentModal: currentModalInter = react.useContext(currentModalContext);
    const gridRefresher: gridRefresherInter = react.useContext(gridRefresherContext);
    const bombsLeft: bombsLeftInter = react.useContext(bombsLeftContext);

    const [grid, setGrid] = react.useState<Array<Array<Slot>>>([]);

    function createNewGrid() {
        setLoss(false);
        let gridProto: Array<Array<Slot>> = [];
        let bombCount: number = 0;
        for (let index = 0; index < dimensions.rows; index++) {
            let row: Array<Slot> = [];
            for (let index_c = 0; index_c < dimensions.columns; index_c++) {
                let bombPresent: boolean = (Math.random() * 100) < 10;
                if (bombPresent) bombCount++;

                row.push({
                    rowIndex: index, 
                    columnIndex: index_c, 
                    value: "?", 
                    bomb: bombPresent                
                });
            }
            gridProto.push(row);
        }
        setGrid(() => [...gridProto]);
        bombsLeft.set(bombCount);
    }
    
    react.useEffect(() => {
        createNewGrid();
    }, []);

    function getAdjacentBombsCount(rowIndex: number, columnIndex: number): number {
        let retThis: number = 0;
        [
            [rowIndex - 1, columnIndex - 1], 
            [rowIndex - 1, columnIndex], 
            [rowIndex - 1, columnIndex + 1], 
            [rowIndex, columnIndex - 1], 
            [rowIndex, columnIndex + 1], 
            [rowIndex + 1, columnIndex - 1], 
            [rowIndex + 1, columnIndex], 
            [rowIndex + 1, columnIndex + 1]
        ].forEach((tuple) => {
            try {
                if (grid[tuple[0]][tuple[1]].bomb) retThis++;
            } catch(error: any) {
                if (error.name === TypeError) {}
            }
        });
        return retThis;
    }

    // function revealZeroEdges() {
    //     for (let rowIndex: number = 0; rowIndex < grid.length; rowIndex++) {
    //         for (let columnIndex: number = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
    //             if (grid[rowIndex][columnIndex].value === "0") {
    //                 [
    //                     [rowIndex - 1, columnIndex - 1], 
    //                     [rowIndex - 1, columnIndex], 
    //                     [rowIndex - 1, columnIndex + 1], 
    //                     [rowIndex, columnIndex - 1], 
    //                     [rowIndex, columnIndex + 1], 
    //                     [rowIndex + 1, columnIndex - 1], 
    //                     [rowIndex + 1, columnIndex], 
    //                     [rowIndex + 1, columnIndex + 1]
    //                 ].forEach((tuple) => {
    //                     try {
    //                         modifySlot(tuple[0], tuple[1], "1");
    //                     } catch(error: any) {
    //                         if (error.name === TypeError) {}
    //                     }
    //                 });
    //             }
    //         }
    //     }
    // }

    function revealAdjacentZeroes(row: number, column: number) {
        [
            [row - 1, column - 1], 
            [row - 1, column], 
            [row - 1, column + 1], 
            [row, column - 1], 
            [row, column + 1], 
            [row + 1, column - 1], 
            [row + 1, column], 
            [row + 1, column + 1]
        ].forEach((tuple) => {
            try {
                if (getAdjacentBombsCount(tuple[0], tuple[1]) === 0) {
                    modifySlot(tuple[0], tuple[1], "1");
                }
            } catch(error: any) {
                if (error.name === TypeError) {}
            }
        });
    }

    function revealAll() {
        setGrid((oldGrid: any) => {
            let newGrid: Array<Array<Slot>> = [];
            for (let rowIndex in oldGrid) {
                let newRow: Array<Slot> = [];
                for (let slotIndex in oldGrid[rowIndex]) {
                    let newSlot: Slot = {...oldGrid[rowIndex][slotIndex]};
                    if (newSlot.bomb) newSlot.value = "X";
                    else newSlot.value = getAdjacentBombsCount(parseInt(rowIndex), parseInt(slotIndex)).toString();
                    newRow.push(newSlot);
                }
                newGrid.push(newRow);
            }
            return newGrid;
        });
    }

    function modifySlot(row: number, column: number, newValue: string) {
        setGrid((oldGrid: any) => {
            let newGrid: Array<Array<Slot>> = [];
            for (let rowIndex in oldGrid) {
                if (rowIndex !== row.toString()) newGrid.push(oldGrid[rowIndex]);
                else {
                    let newRow: Array<Slot> = [];
                    for (let slotIndex in oldGrid[rowIndex]) {
                        if (slotIndex !== column.toString()) newRow.push(oldGrid[rowIndex][slotIndex]);
                        else {
                            let newSlot: Slot = {...oldGrid[rowIndex][slotIndex]};
                            if (newSlot.value === "?") {
                                if (newValue === "1") {
                                    if (newSlot.bomb) {
                                        revealAll();
                                        setLoss(true);
                                    }
                                    else {
                                        let adjacentBombsCount = getAdjacentBombsCount(parseInt(rowIndex), parseInt(slotIndex));
                                        newSlot.value = adjacentBombsCount.toString();
                                        if (adjacentBombsCount === 0) revealAdjacentZeroes(parseInt(rowIndex), parseInt(slotIndex));
                                    }
                                } else if (newValue === "2") {
                                    newSlot.value = "M";
                                    bombsLeft.set(() => {return bombsLeft.value - 1});
                                }
                            }
                            else if ("XG".includes(newSlot.value)) {}
                            else if (newSlot.value === "M") {
                                if (newValue === "2") newSlot.value = "?";
                                bombsLeft.set(() => {return bombsLeft.value + 1});
                            }
                            newRow.push(newSlot);
                        }
                    }
                    newGrid.push(newRow);
                }
            }
            return newGrid;
        });
        
    }

    function checkIfGridSaturated() {
        for (let rowIndex in grid) {
            for (let slotIndex in grid[rowIndex]) {
                if (grid[rowIndex][slotIndex].value === "?") return false;
            }
        }
        return true;
    }

    function handleGridItemMouseDown(event: MouseEvent, rowIndex: number, columnIndex: number) {
        event.preventDefault();
        if (event.button === 0) {
            console.log("left click");
            setModifyingGrid(true);
            modifySlot(rowIndex, columnIndex, "1");
            setModifyingGrid(false);
        }
        else if (event.button === 2) {
            console.log("right click");
            setModifyingGrid(true);
            modifySlot(rowIndex, columnIndex, "2");
            setModifyingGrid(false);
        }
    }

    react.useEffect(() => {
        if (grid.length !== 0 && !modifyingGrid && checkIfGridSaturated()) {
            console.log(`Losing condition: ${loss}`);
            if (loss) {
                currentModal.setCurrentModal("loss");
            } else {
                currentModal.setCurrentModal("victory");
            }
            // console.log(grid);
            // currentModal.setCurrentModal("saturation");
        }
        // if (grid.length !== 0) revealZeroEdges();
    }, [grid]);

    react.useEffect(() => {
        console.log("Refreshing grid");
        setGrid(() => []);
        createNewGrid();
    }, [gridRefresher.gridRefresher])

    return (
        <motion.div 
        initial={{
            scale: 0.9, 
            opacity: 0

        }}
        animate={{
            scale: 1, 
            opacity: 1, 
            transition: {
                duration: 0.1
            }
        }}
        className="Grid">
            {
                grid.map((row: Array<Slot>, rowIndex: number) => {
                    return (
                        <div 
                        className="Row">
                            <>
                                {
                                    row.map((item: Slot, columnIndex: number) => {
                                        return (
                                            <Slot key={`${rowIndex}_${columnIndex}`} mouseDownHandler={handleGridItemMouseDown} rowIndex={rowIndex} columnIndex={columnIndex} value={item.value} />
                                        );
                                        
                                    })
                                }
                            </>
                            <br></br>
                        </div>
                        
                    );
                })
            }
        </motion.div>
    );
}