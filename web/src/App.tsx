import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { isEnvBrowser } from './utils/misc';
import { useNuiEvent } from './hooks/useNuiEvent';
import { fetchNui } from './utils/fetchNui';
import VisibilityProvider from './providers/visibilityProvider'

function App() {
  const [visible, setVisible] = useState(isEnvBrowser());

  useNuiEvent('setVisible', (data: { visible?: boolean }) => {
    setVisible(data.visible || false);
  });

  function handleClose() {
    setVisible(false);
    void fetchNui('exit');

    if (isEnvBrowser()) setTimeout(() => setVisible(true), 500);
  }

return (
  <VisibilityProvider isVisible={visible}>
    <div className='flex items-center justify-center h-screen w-screen absolute'>
      <Routes>
        <Route path='/' element={'<PageLayout />'}>
          <Route index element={'<Home />'} />
        </Route>
      </Routes>
    </div>
  </VisibilityProvider>
);
}

export default App;
