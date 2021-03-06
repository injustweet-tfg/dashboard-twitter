import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8)
};

const PRIMARY = {
  lighter: '#C5E7FC',
  light: '#78C6F7',
  main: '#1DA1F2',
  dark: '#0A6FAE',
  darker: '#01295F', // '#03253A'
  contrastText: '#fff'
};
const SECONDARY = {
  lighter: '#FFD6DD',
  light: '#FF7088',
  main: '#FF002B',
  dark: '#A3001B',
  darker: '#3D000A',
  contrastText: '#fff'
};
const INFO = {
  lighter: '#ECF7FE',
  light: '#78C6F7',
  main: '#1DA1F2',
  dark: '#0A6FAE',
  darker: '#01295F',
  contrastText: '#fff'
};
const SUCCESS = {
  lighter: '#7FF0C3',
  light: '#48EAA9',
  main: '#18C981', // rt color'#18C981',
  dark: '#0F8053',
  darker: '#09492F',
  contrastText: GREY[800]
};
const WARNING = {
  lighter: '#FFECC2',
  light: '#FFCB5C',
  main: '#FFB30F',
  dark: '#CC8B00',
  darker: '#A37000',
  contrastText: GREY[800]
};
const ERROR = {
  lighter: '#FFD6DD',
  light: '#FF7088',
  main: '#FF002B',
  dark: '#A3001B',
  darker: '#3D000A',
  contrastText: '#fff'
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main)
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
  pink: ['#ffafcc', '#ffc4d6ff', '#ff87abff', '#ffacc5ff'],
  other: ['#184e77ff', '#1e6091ff', '#1a759fff', '#168aadff', '#34a0a4ff', '#52b69aff', '#76c893ff', '#99d98cff', '#b5e48cff', '#d9ed92ff'],
  other2: ["#1DA1F2", "#1CA5E5", "#1CAAD9", "#1BAECC", "#1BB3C0", "#1AB7B3", "#1ABCA7", "#19C09A", "#19C58E", "#18C981"],
  wordcloud: ["#FFB30F", "#1da1f2", "#18C981", "#A3001B", "#d5573b"] // , "#94c9a9", "#c6ecae"]


};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: '#FFF', default: '#F5F8FA', neutral: GREY[200] },
  action: {
    active: GREY[600],
    hover: alpha('#FFF', 0.3),
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
};

export default palette;
