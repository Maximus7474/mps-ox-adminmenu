import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { isEnvBrowser } from './utils/misc';
import { useNuiEvent } from './hooks/useNuiEvent';
import { fetchNui } from './utils/fetchNui';
import VisibilityProvider from './providers/visibilityProvider'
import { type NavLink } from './components/navbar';
import PageLayout from './components/pagelayout';

// Pages
import Home from './pages/Home';
import Groups from './pages/Groups';
import Players from './pages/Players';

const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Groups', path: '/groups', children: [
    { name: 'View', path: 'view' },
    { name: 'Create', path: 'create' },
  ]},
  { name: 'Players', path: '/players', children: [
    { name: 'View Online', path: 'view' },
    { name: 'Search', path: 'search' },
  ]},
];

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
          <Route path='/' element={<PageLayout links={navLinks} close={handleClose} />} >
            <Route index element={<Home />} />
            
            <Route path='/groups'>
              {Object.entries(Groups).map(([path, Component], idx) => (
                <Route key={idx} path={path} element={<Component />} />
              ))}
            </Route>
            
            <Route path='/players'>
              {Object.entries(Players).map(([path, Component], idx) => (
                <Route key={idx} path={path} element={<Component />} />
              ))}
            </Route>
          </Route>
        </Routes>
      </div>
    </VisibilityProvider>
  );
}

export default App;
