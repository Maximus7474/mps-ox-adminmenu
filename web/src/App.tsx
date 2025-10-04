import { useState } from 'react';
import { isEnvBrowser } from './utils/misc';
import { useNuiEvent } from './hooks/useNuiEvent';
import { fetchNui } from './utils/fetchNui';

import { Button } from './components/ui/button'
import { ButtonGroup } from './components/ui/button-group';
import { Card, CardDescription, CardHeader } from './components/ui/card';

function App() {
  const [visible, setVisible] = useState(isEnvBrowser());
  const [count, setCount] = useState(0);

  useNuiEvent('setVisible', (data: { visible?: boolean }) => {
    setVisible(data.visible || false);
  });

  function handleHideModal() {
    setVisible(false);
    void fetchNui('exit');
  }

return (
  <>
    {visible && (
      <div className='flex items-center justify-center h-screen w-screen absolute'> 
        <Card className='w-full max-w-sm'>
          <CardHeader>
            <h3>Boilerplate Modal</h3>
            <p>Count: {count}</p>
          </CardHeader>

          <CardDescription>
            <ButtonGroup>
              <ButtonGroup>
                <Button onClick={() => setCount((prev) => ++prev)}>
                  Increment
                </Button>
                <Button onClick={() => setCount((prev) => --prev)}>
                  Decrement
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant='destructive' onClick={() => handleHideModal()}>
                  Hide modal
                </Button>
              </ButtonGroup>
            </ButtonGroup>
          </CardDescription>
        </Card>
      </div>
    )}
  </>
);
}

export default App;
