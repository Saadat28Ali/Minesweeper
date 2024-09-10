import { createContext, useState } from "react";

interface gridRefresherInter {
    gridRefresher: boolean, 
    refreshGrid: Function
}

const gridRefresherContext = createContext<gridRefresherInter>({gridRefresher: false, refreshGrid: () => {}});

function GridRefresherProvider(
    { children }: 
    {children: any}
) {

    const [gridRefresher, setGridRefresher] = useState<boolean>(false);

    return (
        <div className="GridRefresherProvider">
            <gridRefresherContext.Provider value={{gridRefresher: gridRefresher, refreshGrid: () => {setGridRefresher((oldGridRefresher: any) => {return !oldGridRefresher})}}}>
                {children}
            </gridRefresherContext.Provider>
        </div>
    );
}

export type { gridRefresherInter };
export { GridRefresherProvider };
export default gridRefresherContext;