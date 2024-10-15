import styled from 'styled-components/native';
import type { TextStyle, TextProps as RNTextProps } from 'react-native';

type TextVariants =
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphCaption'
  | 'paragraphCaptionSmall';

const $fontSizes: Record<TextVariants, TextStyle> = {
  headingLarge: { fontSize: 32, lineHeight: 38.4 },
  headingMedium: { fontSize: 22, lineHeight: 26.4 },
  headingSmall: { fontSize: 18, lineHeight: 23.4 },
  paragraphLarge: { fontSize: 18, lineHeight: 25.2 },
  paragraphMedium: { fontSize: 16, lineHeight: 22.4 },
  paragraphSmall: { fontSize: 14, lineHeight: 19.6 },
  paragraphCaption: { fontSize: 12, lineHeight: 16.8 },
  paragraphCaptionSmall: { fontSize: 10, lineHeight: 14 },
};

const $fontFamily = {
  black: 'Poppins-Black',
  blackItalic: 'Poppins-BlackItalic',
  bold: 'Poppins-Bold',
  boldItalic: 'Poppins-BoldItalic',
  italic: 'Poppins-RegularItalic',
  light: 'Poppins-Light',
  lightItalic: 'Poppins-LightItalic',
  medium: 'Poppins-Medium',
  mediumItalic: 'Poppins-MediumItalic',
  regular: 'Poppins-Regular',
};

interface TextProps extends RNTextProps {
  preset: TextVariants;
  bold?: boolean;
  italic?: boolean;
  semiBold?: boolean;
}

const StyledText = styled.Text<TextProps>`
  color: ${({ theme }) => theme.colors.backgroundContrast};

  ${({ preset, bold, italic, semiBold }) => {
    const family = getFontFamily(preset, bold, italic, semiBold);
    const size = $fontSizes[preset];
    return `
      font-family: ${family};
      font-size: ${size.fontSize!}px;
      line-height: ${size.lineHeight!}px;
    `;
  }}
`;

export const Text = ({ children, preset = 'paragraphMedium', bold, italic, semiBold, ...textProps }: TextProps) => {
  return (
    <StyledText preset={preset} bold={bold} italic={italic} semiBold={semiBold} {...textProps}>
      {children}
    </StyledText>
  );
};

function getFontFamily(preset: TextVariants, bold?: boolean, italic?: boolean, semiBold?: boolean) {
  if (preset === 'headingLarge' || preset === 'headingMedium' || preset === 'headingSmall') {
    return italic ? $fontFamily.boldItalic : $fontFamily.bold;
  }
  switch (true) {
    case bold && italic:
      return $fontFamily.boldItalic;
    case bold:
      return $fontFamily.bold;
    case italic:
      return $fontFamily.italic;
    case semiBold && italic:
      return $fontFamily.mediumItalic;
    case semiBold:
      return $fontFamily.medium;
    default:
      return $fontFamily.regular;
  }
}
