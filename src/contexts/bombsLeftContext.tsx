import { createContext, useState } from "react";

interface bombsLeftInter {
    value: number, 
    set: Function
}

const bombsLeftContext = createContext<bombsLeftInter>({value: 0, set: () => {}});

function BombsLeftProvider(
    { children }: 
    {children: any}
) {

    const [bombs, setBombs] = useState<number>(0);

    return (
        <div 
        className="BombsLeftProvider">
            <bombsLeftContext.Provider value={{value: bombs, set: setBombs}}>
                {children}
            </bombsLeftContext.Provider>
        </div>
    );
}

export type { bombsLeftInter };
export { BombsLeftProvider };
export default bombsLeftContext;