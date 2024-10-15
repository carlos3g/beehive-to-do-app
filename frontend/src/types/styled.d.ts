import type { Theme } from '@/shared/theme/theme';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
