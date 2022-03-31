// ----------------------------------------------------------------------

export default function Card(theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.z2,
          borderRadius: theme.shape.borderRadius,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
          // backgroundImage: `linear-gradient(50deg, #FFF 70%, ${theme.palette.grey[800]} 30%);`,

        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(2, 2, 2, 2),
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3)
        }
      }
    }
  };
}
