import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View, type ViewProps } from 'react-native';
import type { ScreenProps } from '@/shared/components/ui/screen';
import { useAppTheme } from '@/shared/hooks/use-app-theme';
import { $fontFamily, $fontSizes } from '@/shared/theme/theme';

const ICON_SIZE = 20;
type Props = Pick<ScreenProps, 'title' | 'canGoBack' | 'HeaderComponent'> &
  ViewProps & {
    paddingHorizontal?: number;
  };

export const ScreenHeader = (props: Props) => {
  const { canGoBack, title, HeaderComponent, paddingHorizontal, ...viewProps } = props;
  const navigation = useNavigation();
  const theme = useAppTheme();

  if (!title && !canGoBack && !HeaderComponent) {
    return null;
  }

  const showBackLabel = !title && !HeaderComponent;

  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: theme.spacing.s24,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal,
      }}
      {...viewProps}
    >
      {canGoBack && (
        <TouchableOpacity
          testID="screen-back-button"
          style={{
            marginRight: showBackLabel ? theme.spacing.s10 : undefined,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={navigation.goBack}
        >
          <Ionicons size={ICON_SIZE} name="arrow-back" color="primary" />
          {showBackLabel && (
            <Text
              style={{
                fontFamily: $fontFamily.medium,
                fontSize: $fontSizes.paragraphMedium.fontSize,
                lineHeight: $fontSizes.paragraphMedium.lineHeight,
                marginLeft: theme.spacing.s8,
              }}
            >
              Voltar
            </Text>
          )}
        </TouchableOpacity>
      )}
      {HeaderComponent}
      {title && (
        <Text
          style={{
            fontSize: $fontSizes.headingSmall.fontSize,
            lineHeight: $fontSizes.headingSmall.lineHeight,
          }}
        >
          {title}
        </Text>
      )}
      {title && <View style={{ width: ICON_SIZE, backgroundColor: theme.colors.carrotSecondary }} />}
    </View>
  );
};
