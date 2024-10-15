import type { TouchableOpacityProps, ViewStyle } from 'react-native';
import { Text as RNText, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { ActivityIndicator } from '@/shared/components/ui/activity-indicator';
import type { ButtonPreset } from '@/shared/components/ui/button.presets';
import { buttonPresets } from '@/shared/components/ui/button.presets';
import type { ThemeColors } from '@/shared/theme/theme';
import { $fontFamily, $fontSizes } from '@/shared/theme/theme';

export const StyledButton = styled(TouchableOpacity)<{
  backgroundColor: ThemeColors;
  borderWidth?: number;
  borderColor?: ThemeColors;
}>`
  background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
  border-radius: 16px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-width: ${({ borderWidth }) => borderWidth || 0}px;
  border-color: ${({ theme, borderColor }) => (borderColor ? theme.colors[borderColor] : 'transparent')};
`;

const StyledText = styled(RNText)<{ color: string }>`
  font-family: ${$fontFamily.bold};
  color: ${({ theme, color }) => theme.colors[color]};
  font-size: ${$fontSizes.paragraphMedium.fontSize}px;
  line-height: ${$fontSizes.paragraphMedium.lineHeight}px;
`;

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  preset?: ButtonPreset;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { title, loading, disabled, preset = 'primary', style, ...touchableProps } = props;

  const buttonPreset = buttonPresets[preset][disabled ? 'disabled' : 'default'];

  return (
    <StyledButton
      style={style}
      disabled={disabled || loading}
      backgroundColor={buttonPreset.container.backgroundColor}
      borderWidth={buttonPreset.container.borderWidth}
      borderColor={buttonPreset.container.borderColor}
      {...touchableProps}
    >
      {loading ? (
        <ActivityIndicator color={buttonPreset.content.color} />
      ) : (
        <StyledText color={buttonPreset.content.color}>{title}</StyledText>
      )}
    </StyledButton>
  );
};
