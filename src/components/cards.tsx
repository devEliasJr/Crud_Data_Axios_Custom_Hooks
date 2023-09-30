import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useUserContext } from "../Contexts/dataContext";
import SkeletonComponent from "./skeleton";

const CustomCard = ({ title, link, id }: ICustomCardProps) => {
  return (
    <Card key={id}>
      <CardContent>
        <Typography component={"h5"}>{title}</Typography>
      </CardContent>
      <CardMedia
        component="img"
        src={link}
        alt="Descrição da imagem"
        title="Título da imagem"
        sx={{ width: "100%", height: 250 }}
      />

      <CardContent>Teste Content</CardContent>
    </Card>
  );
};

export default function CardsComponents() {
  const { posts, isLoading, isError } = useUserContext();

  return (
    <Box maxWidth={"1500px"} m={"0 auto"} p={2}>
      <Grid container spacing={2}>
        {!isError && isLoading && (
          <Box width={"100%"} py={8}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              gap={4}
              flexWrap={"wrap"}
            >
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
            </Box>
          </Box>
        )}
        {isError ? (
          <Box width={"100%"} py={8}>
            <Box
              display={"flex"}
              justifyContent={"center"}
            >
              <Alert severity="error">{isError}</Alert>
            </Box>
          </Box>
        ) : (
          posts &&
          posts.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={Math.random()}>
              <CustomCard id={item.id} title={item.name} link={item.url} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
