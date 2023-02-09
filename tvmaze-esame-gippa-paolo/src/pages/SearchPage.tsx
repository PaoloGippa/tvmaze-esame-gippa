import { FormControl, InputBase, Grid, Paper, Button, Card, CardMedia, CardContent, Typography } from "@mui/material";

import { Link, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getShowsBySearch, ShowType } from "../api";

const SearchPage = () => {
  const [currentSearch, setCurrentSearch] = useSearchParams();
  const [shows, setShows] = useState<ShowType[]>([]);

  const handleOnSearchChange = useCallback(
    (query: string) => {
      setCurrentSearch({ search: query });
    },
    [setCurrentSearch]
  );

  const isSearchButtonDisabled = () => currentSearch.get("search")?.trim().length === 0;

  const handleSearch = () => {
    getShowsBySearch(currentSearch?.get("search") || "").then((responde) => setShows(responde));
  };

  useEffect(() => {
    const currentSearchStr = currentSearch?.get("search")?.trim();
    if (!!currentSearchStr && currentSearchStr.length > 0 && shows.length === 0) {
      handleSearch();
    }
  }, []);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
        <Grid item lg={6} style={{ padding: "2em", width: "100%" }}>
          <Paper
            component="form"
            sx={{ display: "flex", alignItems: "center" }}
            style={{ padding: "2em" }}
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <FormControl>
              <InputBase
                id="outlined-basic"
                placeholder="Search by title"
                onChange={(event) => handleOnSearchChange(event.target.value)} //funzione anonima onChange: non gli ho dato il nome//
                value={currentSearch.get("search")}
                autoFocus
              ></InputBase>
            </FormControl>
            <FormControl>
              <Button disabled={isSearchButtonDisabled()} onClick={handleSearch}>
                Search
              </Button>
            </FormControl>
          </Paper>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" style={{ padding: "2em" }} sm={24}>
          {shows.map((element) => (
            <Grid item style={{ padding: "2em" }} lg={4}>
              <Link to={`/${element.id.toString()}`}>
                <Card sx={{ margin: "2em" }}>
                  <CardMedia component="img" image={element.image} alt={element.title} style={{ width: "100%" }} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {element.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchPage;
