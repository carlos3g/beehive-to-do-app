import type React from 'react';
import type { ViewProps } from 'react-native';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useAppSafeArea } from '@/shared/hooks/use-app-safe-area';
import { useAppTheme } from '@/shared/hooks/use-app-theme';
import { ScreenHeader } from '@/shared/components/ui/screen/screen-header';
import { ScrollViewContainer, ViewContainer } from '@/shared/components/ui/screen/screen-container';

export interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  HeaderComponent?: React.ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
  title?: string;
  noPaddingHorizontal?: boolean;
}

export const Screen = ({
  children,
  canGoBack = false,
  scrollable = false,
  noPaddingHorizontal = false,
  style,
  title,
  HeaderComponent,
  ...viewProps
}: ScreenProps) => {
  const { bottom, top } = useAppSafeArea();
  const theme = useAppTheme();

  const Container = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container backgroundColor={theme.colors.background}>
        <View
          style={[
            {
              paddingTop: top,
              paddingBottom: bottom,
              paddingHorizontal: noPaddingHorizontal ? undefined : theme.spacing.s24,
              flex: 1,
            },
            style,
          ]}
          {...viewProps}
        >
          <ScreenHeader
            paddingHorizontal={noPaddingHorizontal ? theme.spacing.s24 : undefined}
            HeaderComponent={HeaderComponent}
            canGoBack={canGoBack}
            title={title}
          />
          {children}
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};
