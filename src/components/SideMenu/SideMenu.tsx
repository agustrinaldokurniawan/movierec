import { Drawer, Stack } from "@mui/material";
import { ISideMenu } from "./interface/ISideMenu";

export default function SideMenu(props: ISideMenu) {
  return (
    <Drawer
      anchor={"left"}
      open={props.open}
      onClose={props.toggleDrawer(false)}
      sx={{ zIndex: 3 }}
    >
      <Stack>
        <p>Language</p>
      </Stack>
    </Drawer>
  );
}
