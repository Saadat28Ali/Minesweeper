import "./Modal.css";

export default function Modal(
    { header, body, buttons }:
    {
        header: string, 
        body: string, 
        buttons: {[keys: string]: Function}
    }
) {
    return (
        <div 
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
                        return <button className="ModalButton" onClick={() => {buttons[buttonKey]()}}> {buttonKey} </button>
                    })
                    }
                </section>
                : <></>
            }
            
        </div>
    );
}