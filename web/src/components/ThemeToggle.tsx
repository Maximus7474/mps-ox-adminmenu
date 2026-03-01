import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='w-full justify-start'
    >
      <Sun className='size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='ml-2'>{theme === 'light' ? 'Light' : 'Dark'} Mode</span>
    </Button>
  );
}
