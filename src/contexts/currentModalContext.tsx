import { createContext, useState } from "react";

interface currentModalInter {
    currentModal: string, 
    setCurrentModal: Function
}

const currentModalContext = createContext<currentModalInter>({currentModal: "", setCurrentModal: () => {}});

function CurrentModalProvider(
    { children }: 
    {children: any}
) {

    const [currentModal, setCurrentModal] = useState<string>("");

    return (
        <div className="CurrentModalProvider">
            <currentModalContext.Provider value={{currentModal: currentModal, setCurrentModal: setCurrentModal}}>
                {children}
            </currentModalContext.Provider>
        </div>
    );
}

export type { currentModalInter };
export default currentModalContext;
export { CurrentModalProvider }