import { memo } from "react";
import { Paper, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";
import CreateNode from "./CreateNode";

// import setNodeData from "../../../pages/FlowVisualizer/setNodeData";

const Question = ({ data }) => {
  return (
    <>
      {/* <NodeResizer minWidth={100} minHeight={30} /> */}
      <Handle type="target" position={Position.Left} />
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".1rem",
        }}
      >
        <Typography variant="caption">{data.id}</Typography>
        <Typography variant="caption">{data.type}</Typography>
        <Typography variant="caption">{data.question}</Typography>
      </Paper>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(CreateNode(Question));
