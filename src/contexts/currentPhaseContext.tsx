import { createContext, useState } from "react";

interface currentPhaseInter {
    phase: string, 
    setPhase: Function
}

const currentPhaseContext = createContext<currentPhaseInter>({phase: "", setPhase: () => {}});

function CurrentPhaseProvider(
    { children }:
    {children: any}
) {
    const [currentPhase, setCurrentPhase] = useState<string>("welcome");

    return (
        <div className="CurrentPhaseProvider">
            <currentPhaseContext.Provider value={{phase: currentPhase, setPhase: setCurrentPhase}}>
                {children}
            </currentPhaseContext.Provider>
        </div>
    );
}

export type { currentPhaseInter };
export { CurrentPhaseProvider };
export default currentPhaseContext;