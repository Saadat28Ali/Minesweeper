import { createContext, useState } from "react";

interface muteInter {
    value: boolean, 
    invertMute: Function
}

const muteContext = createContext<muteInter>({value: false, invertMute: () => {}});

function MuteProvider(
    { children }: 
    {children: any}
) {

    const [mute, setMute] = useState<boolean>(true);

    return (
        <div className="MuteProvider">
            <muteContext.Provider value={{value: mute, invertMute: () => {setMute((oldMute: any) => {return !oldMute})}}}>
                {children}
            </muteContext.Provider>
        </div>
    );
}

export type { muteInter };
export { MuteProvider };
export default muteContext;