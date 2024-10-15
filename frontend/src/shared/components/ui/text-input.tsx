import type { TextInputProps as RNTextInputProps } from 'react-native';
import { Pressable, TextInput as RNTextInput } from 'react-native';
import styled from 'styled-components/native';
import { useAppTheme } from '@/shared/hooks/use-app-theme';
import { Text } from '@/shared/components/ui/text';
import { colors as themeColors } from '@/shared/theme/colors';
import { useRef } from 'react';
import { $fontFamily, $fontSizes } from '@/shared/theme/theme';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  RightComponent?: React.ReactElement;
  LeftComponent?: React.ReactElement;
  boxProps?: React.ComponentProps<typeof Container>;
  containerProps?: React.ComponentProps<typeof InputContainer>;
}

const Container = styled.View`
  flex-grow: 1;
  flex-shrink: 1;
`;

const InputContainer = styled.View<{ hasError?: boolean }>`
  flex-direction: row;
  border-width: ${({ hasError, theme }) => (hasError ? 2 : 1)}px;
  border-color: ${({ hasError, theme }) => (hasError ? theme.colors.error : theme.colors.gray4)};
  padding: ${({ theme }) => theme.spacing.s16}px;
  border-radius: ${({ theme }) => theme.borderRadii.s12}px;
  background-color: ${({ theme }) => theme.colors.grayWhite};
`;

const StyledTextInput = styled(RNTextInput)`
  padding: 0;
  flex-grow: 1;
  flex-shrink: 1;
  color: ${themeColors.palette.grayBlack};
  font-family: ${$fontFamily.regular};
  font-size: ${$fontSizes.paragraphMedium.fontSize}px;
  line-height: ${$fontSizes.paragraphMedium.lineHeight}px;
`;

const LeftComponentContainer = styled.View`
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.s16}px;
`;

const RightComponentContainer = styled.View`
  justify-content: center;
  margin-left: ${({ theme }) => theme.spacing.s16}px;
`;

export const TextInput = ({
  label,
  errorMessage,
  RightComponent,
  LeftComponent,
  boxProps,
  containerProps,
  ...rnTextInputProps
}: TextInputProps) => {
  const theme = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Container {...boxProps}>
      <Pressable onPress={focusInput}>
        {label && (
          <Text preset="paragraphMedium" style={{ marginBottom: theme.spacing.s4 }}>
            {label}
          </Text>
        )}
        <InputContainer hasError={!!errorMessage} {...containerProps}>
          {LeftComponent && <LeftComponentContainer>{LeftComponent}</LeftComponentContainer>}
          <StyledTextInput
            autoCapitalize="none"
            ref={inputRef}
            placeholderTextColor={theme.colors.gray2}
            {...rnTextInputProps}
          />
          {RightComponent && <RightComponentContainer>{RightComponent}</RightComponentContainer>}
        </InputContainer>
        {errorMessage && (
          <Text preset="paragraphSmall" bold style={{ color: theme.colors.error }}>
            {errorMessage}
          </Text>
        )}
      </Pressable>
    </Container>
  );
};
