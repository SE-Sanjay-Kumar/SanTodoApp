
import ToDoList from "./components/ToDoList";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Advent Pro",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToDoList/>
      </ThemeProvider>
    </>
  );
}

export default App;
