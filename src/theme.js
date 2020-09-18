import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      sm: 400,
      md: 960,
      lg: 1280,
    },
  },
});

export default theme;
