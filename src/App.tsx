import { Box } from "@mui/material";
import SearchAppBar from "./components/appBar";
import FormComponent from "./components/form";
import CardsComponents from "./components/cards";
import { PostsProvider } from "./Contexts/dataContext";

export default function App() {
  return (
    <PostsProvider>
      <Box width={"100%"}>
        <SearchAppBar />
        <FormComponent />
        <CardsComponents />
      </Box>
    </PostsProvider>
  );
}
