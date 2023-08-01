import { Button } from "@mui/material";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sidebar">
      <div className="description">Drag form components from here.</div>
      <div className="components">
        <Button
          className="dndnode group"
          onDragStart={(event) => onDragStart(event, "Group")}
          draggable
          variant="contained"
        >
          Group
        </Button>
        <Button
          variant="contained"
          className="dndnode dropdown"
          onDragStart={(event) => onDragStart(event, "Question")}
          draggable
        >
          Question
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
