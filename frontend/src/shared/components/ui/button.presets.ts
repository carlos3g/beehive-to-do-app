import type { TouchableOpacityProps } from 'react-native';
import type { ThemeColors } from '@/shared/theme/theme';

export type ButtonPreset = 'primary' | 'outline' | 'ghost';

interface ButtonUI {
  container: TouchableOpacityProps & {
    backgroundColor: ThemeColors;
    borderWidth?: number;
    borderColor?: ThemeColors;
  };
  content: { color: ThemeColors };
}

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI;
    disabled: ButtonUI;
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      content: { color: 'primaryContrast' },
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      content: { color: 'gray2' },
    },
  },
  outline: {
    default: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'primary',
      },
      content: { color: 'primary' },
    },
    disabled: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'gray4',
      },
      content: { color: 'gray2' },
    },
  },
  ghost: {
    default: {
      container: {
        backgroundColor: 'white70',
        borderWidth: 0,
      },
      content: {
        color: 'grayBlack',
      },
    },
    disabled: {
      container: {
        backgroundColor: 'grayWhite',
        borderWidth: 0,
      },
      content: { color: 'grayBlack' },
    },
  },
};
