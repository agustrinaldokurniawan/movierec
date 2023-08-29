import { Box, Chip, Grid } from "@mui/material";
import { IGenre } from "../../common/interfaces/IGenre";
import Link from "next/link";
import { chipSx } from "../../common/styles/material-ui/chip";
import { IPreviewGenre } from "./interfaces/IPreviewGenre";

export default function GenrePreview(props: IPreviewGenre) {
  return (
    !!props.genres?.length && (
      <Box>
        <Grid container spacing={1}>
          {props.genres.map((item: IGenre) => (
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
                      color: props.isDominantColorDark
                        ? "white"
                        : "custom.dark",
                    },
                  }}
                  data-genre={item.name.toLowerCase().split(" ").join("-")}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  );
}
