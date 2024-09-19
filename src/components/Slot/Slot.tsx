import { motion } from "framer-motion";

import "./Slot.css";

export default function Slot(
    { value, rowIndex, columnIndex, mouseDownHandler }:
    {
        mouseDownHandler: Function, 
        rowIndex: number, 
        columnIndex: number, 
        value: string
    }
) {
    return (
        <motion.div 
        initial={{
            scale: 1
        }}
        whileHover={{
            scale: 1.05, 
            transition: {
                duration: 0.1
            }

        }}
        className="Slot"
        onContextMenu={(event: any) => {event.preventDefault();}}
        onMouseDown={(event: any) => {mouseDownHandler(event, rowIndex, columnIndex)}}
        style={{
            backgroundColor: (value === "?") ? "rgb(100, 100, 100)" : ((value === "M") ? "rgb(100, 50, 0)" : ((value === "X") ? "rgb(100, 0, 0)" : "rgb(0, 100, 0)"))
        }}
        >
            {value}
        </motion.div>
    );
}