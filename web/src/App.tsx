import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './providers/ThemeProvider';
import { VisibilityProvider } from './providers/VisibilityProvider';

import './styles/index.css';
import { debugData } from './utils/debugData';

debugData([
  { action: 'setVisible', data: { visible: true } }
]);

function App() {
  return (
    <ThemeProvider defaultTheme='dark'>
      <VisibilityProvider>
        <RouterProvider router={router} />
        <Toaster />
      </VisibilityProvider>
    </ThemeProvider>
  );
}

export default App;
