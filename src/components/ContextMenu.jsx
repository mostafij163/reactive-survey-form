import { MenuItem, MenuList, Paper, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef } from "react";

const ContextMenu = forwardRef((props, ref) => {
  const paperRef = useRef(null);
  useImperativeHandle(
    ref,
    () => {
      return paperRef.current?.style;
    },
    []
  );

  return (
    <Paper
      sx={{
        width: "fit-content",
        maxWidth: "280px",
        minWidth: "185px",
        position: "relative",
        zIndex: "999",
        display: "none",
      }}
      ref={paperRef}
    >
      <MenuList>
        <MenuItem>
          <Typography variant="caption">Create Group</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="caption">Create Question</Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
});

export default ContextMenu;
