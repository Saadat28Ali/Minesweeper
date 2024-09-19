import { motion } from "framer-motion";

export default function Button(
    {clickHandler, text, pressed = false}:
    {
        clickHandler: Function, 
        text: string, 
        pressed: boolean
    }
) {
    console.log(pressed);
    return (
        <motion.button
        initial={{
            scale: 1,

            border: "none",
            borderRadius: "5px",
        
            minWidth: "70px",
        
            padding: "20px",
            margin: "0 2px 0 2px",
        
            fontFamily: "sans-serif",
            fontSize: "1.5rem",
            fontWeight: 600,
            lineHeight: "0.5rem",
        }}
        whileHover={{
            scale: 1.01, 
            transition: {
                duration: 0.05
            }
        }}

        className="Button"
        onClick={(event: any) => {clickHandler(event)}}
        style={{
            backgroundColor: (!pressed) ? "rgb(0, 175, 250)" : "rgba(0, 0, 0, 0.2)",
            color: (!pressed) ? "white" : "black",
        }}
        >
            {text}
        </motion.button>
    );
}