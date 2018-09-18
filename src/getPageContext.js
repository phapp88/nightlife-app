/* eslint-disable no-underscore-dangle */
import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      sm: 400,
      md: 960,
      lg: 1280,
    },
  },
});

const createPageContext = () => ({
  theme,
  sheetsManager: new Map(),
  sheetsRegistry: new SheetsRegistry(),
  generateClassName: createGenerateClassName(),
});

const getPageContext = () => {
  if (!process.browser) {
    return createPageContext();
  }
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
};

export default getPageContext;
