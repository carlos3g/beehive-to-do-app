import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import type { Theme } from '@/shared/theme/theme';

export const useAppTheme = (): Theme => {
  return useContext(ThemeContext) as Theme;
};
