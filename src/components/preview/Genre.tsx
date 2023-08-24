import { Box, Chip, Grid } from "@mui/material";
import { IGenre } from "./interfaces/IGenre";
import Link from "next/link";
import { chipSx } from "../../common/styles/material-ui/chip";

export default function Genre({
  genres,
  isDominantColorDark,
}: {
  genres: IGenre[];
  isDominantColorDark: boolean;
}) {
  return (
    <Box>
      <Grid container spacing={1}>
        {genres.map((item: IGenre) => (
          <Grid item key={item.id}>
            <Link
              href={`/explore?genres=[${item.name
                .toLowerCase()
                .split(" ")
                .join("-")}]`}
            >
              <Chip
                label={item.name}
                sx={{
                  ...chipSx,
                  "& .MuiChip-label": {
                    color: isDominantColorDark ? "white" : "custom.dark",
                  },
                }}
                data-genre={item.name.toLowerCase().split(" ").join("-")}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
