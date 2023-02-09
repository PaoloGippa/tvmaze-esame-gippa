import { Grid, Card, CardMedia, CardHeader, CardContent, Typography, Button, CircularProgress } from "@mui/material";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getShowById, ShowDetailType } from "../api";
import { Interweave } from "interweave";
import { useNavigate } from "react-router-dom";
import useFirebaseFavourites from "../hooks/useFirebaseFavoutes";

const DetailPage = () => {
  const { showId } = useParams();
  const [showDetail, setShowDetail] = useState<ShowDetailType | null>(null);
  const navigate = useNavigate();
  const [favourites, addToFavourites, removeFromFavourites] = useFirebaseFavourites();
  useEffect(() => {
    if (!!showId) {
      //!! vuol dire verificare la sua esistenza (se esiste)
      try {
        const showIdNum = parseInt(showId);
        getShowById(showIdNum).then((show) => {
          setShowDetail(show);
        });
      } catch (error) {
        console.error("NaN");
      }
    }
  }, [showId]);

  const isFavourite = (id: number) => {
    return (favourites || []).includes(id);
  };

  console.log(favourites);

  return !!showDetail ? (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid item sm={5} style={{ padding: "2em" }}>
        <Button className="border" onClick={() => navigate(-1)}>
          Back
        </Button>
        {isFavourite(showDetail.id) ? (
          <Button className="border" onClick={() => removeFromFavourites(showDetail.id)}>
            Remove from Favourite
          </Button>
        ) : (
          <Button className="border" onClick={() => addToFavourites(showDetail.id)}>
            Add to Favourite
          </Button>
        )}
        <Card>
          <CardHeader title={showDetail.title} />
          <CardMedia component="img" image={showDetail.image} alt={showDetail.title} style={{ objectFit: "contain" }} />
          <CardContent>
            <Typography variant="body1">
              <Interweave content={showDetail.summary} />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <CircularProgress />
  );
};

export default DetailPage;
