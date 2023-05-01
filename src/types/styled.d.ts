import 'styled-components';
import theme from 'style/theme';

type CustomTheme = typeof theme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-shadow
  export interface DefaultTheme extends CustomTheme {}
}
