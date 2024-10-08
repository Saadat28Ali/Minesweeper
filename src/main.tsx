import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { DimensionsProvider } from './contexts/dimensionsContext.tsx';
import { CurrentModalProvider } from './contexts/currentModalContext.tsx';
import { GridRefresherProvider } from './contexts/gridRefresherContext.tsx';
import { CurrentPhaseProvider } from './contexts/currentPhaseContext.tsx';
import { BombsLeftProvider } from './contexts/bombsLeftContext.tsx';
import { MuteProvider } from './contexts/muteContext.tsx';
import { ZoomProvider } from './contexts/zoomContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <ZoomProvider children={[
      <MuteProvider children={[
        <BombsLeftProvider children={[
          <CurrentPhaseProvider children={[
            <GridRefresherProvider children={[
              <CurrentModalProvider children={[
                <DimensionsProvider children={[<App key="0"/>]} />
              ]} />
            ]} />    
          ]} />
        ]} />
      ]}/>
    ]} />
    
    
    
    
  </StrictMode>,
)
