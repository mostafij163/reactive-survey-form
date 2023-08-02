import { MenuItem, MenuList, Paper, Typography } from "@mui/material";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { useReactFlow } from "reactflow";

import { getId } from "../pages";
import { nanoid } from "nanoid";

const ContextMenu = forwardRef((_, ref) => {
  const paperRef = useRef(null);
  const { setNodes, project } = useReactFlow();

  useImperativeHandle(ref, () => paperRef.current?.style, []);

  const handleCreateNode = useCallback(
    (e, type) => {
      setNodes((nds) => {
        const position = project({
          x: e.clientX,
          y: e.clientY,
        });

        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };

        if (type === "Group") {
          newNode.data = {
            type: "numbervalidation",
            id: nanoid(),
            questions: [],
          };
        }

        if (type === "Question") {
          newNode.data = {
            type: "select",
            id: nanoid(),
            question: "test question",
          };
        }

        return nds.concat(newNode);
      });
    },
    [project, setNodes]
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
          <Typography
            variant="caption"
            onClick={(e) => handleCreateNode(e, "Group")}
          >
            Create Group
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            variant="caption"
            onClick={(e) => handleCreateNode(e, "Question")}
          >
            Create Question
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
});

export default ContextMenu;
