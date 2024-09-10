import { createContext, useState } from "react";

interface gridDimensionsInter {
    get: {
        rows: number, 
        columns: number
    }, 
    set: Function
}


const dimensionsContext = createContext<gridDimensionsInter>({get: {rows: 0, columns: 0}, set: () => {}});

function DimensionsProvider(
    { children }: 
    {
        children: any
    }
) {

    const [dimensions, setDimensions] = useState({rows: 8, columns: 8});

    return (
        <div className="DimensionsProvider">
            <dimensionsContext.Provider value={{get: dimensions, set: setDimensions}} >
                {children}
            </dimensionsContext.Provider>
        </div>
    );
}

export type { gridDimensionsInter };
export { DimensionsProvider };
export default dimensionsContext;