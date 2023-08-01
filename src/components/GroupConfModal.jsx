import { Drawer, MenuItem, Select } from "@mui/material";

import { useAppContext } from "../context/AppContext";
import { useReactFlow } from "reactflow";

export default function GroupConfModal() {
  const { activeComponent, setActiveComponent } = useAppContext();
  const { getNode, setNodes } = useReactFlow();
  const node = getNode(activeComponent);

  console.log(node);

  const onGroupTypeChange = (e) => {
    setNodes((nds) => {
      const updatedNodes = nds.map((nd) => {
        if (nd.id === activeComponent) {
          nd.data = {
            ...nd.data,
            type: e.target.value,
          };
        }
        return nd;
      });

      return updatedNodes;
    });
  };

  return (
    <Drawer
      anchor="left"
      open={Boolean(activeComponent)}
      onClose={() => setActiveComponent(null)}
    >
      <Select value={node?.data.type} label="Type" onChange={onGroupTypeChange}>
        <MenuItem value="numbervalidation">Number Validation</MenuItem>
        <MenuItem value="non-refering">Non Refering</MenuItem>
        <MenuItem value="refering">Refering</MenuItem>
      </Select>

      {/* <Select value={node?.data.type} label="Question">
        {
            node?.data.questions.map(q => {

            })
        }
        <MenuItem value="numbervalidation">Number Validation</MenuItem>
        <MenuItem value="non-refering">Non Refering</MenuItem>
        <MenuItem value="refering">Refering</MenuItem>
      </Select> */}
    </Drawer>
  );
}
