import { motion } from "framer-motion";

import "./Modal.css";

import Button from "../Button/Button";

export default function Modal(
    { header, body, buttons }:
    {
        header: string, 
        body: string, 
        buttons: {[keys: string]: Function}
    }
) {
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
                duration: 0.3
            }
        }}

        className="Modal">
            {
                (header)
                ? 
                <>
                    <h1 className="ModalHeader"> {header} </h1>
                    <hr className="ModalHeaderUnderline"></hr>
                </>
                : <></>
            }
            {
                (body)
                ? <p className="ModalBody"> {body} </p>
                : <></>
            }
            {
                (buttons)
                ? 
                <section className="ButtonsSection">
                    {
                    Object.keys(buttons).map((buttonKey: string) => {
                        // return <button key={buttonKey} className="ModalButton" onClick={() => {buttons[buttonKey]()}}> {buttonKey} </button>
                        return <Button key={buttonKey} pressed={false} clickHandler={() => {buttons[buttonKey]()}} text={buttonKey}></Button>
                    })
                    }
                </section>
                : <></>
            }
            
        </motion.div>
    );
}