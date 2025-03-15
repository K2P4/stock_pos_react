import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '5px', 
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          padding: '0px 0px', 
          ":hover": {
            backgroundColor: "#f1f1f1",
            transition: "0.3s",
            animationDuration: '0.5s',
        

          },
         
          
        },
      },
    },
  },
});

export default theme;
