import { createContext, useState } from "react";

interface zoomInter {
    value: number, 
    set: Function
}

const zoomContext = createContext<zoomInter>({value: 1, set: () => {}});

function ZoomProvider(
    {children}: 
    {
        children: any
    }
) {
    const [zoom, setZoom] = useState<number>(1);

    return (
        <zoomContext.Provider value={{value: zoom, set: setZoom}}>
            {children}
        </zoomContext.Provider>
    );
}

export default zoomContext;
export { ZoomProvider };
export type { zoomInter };