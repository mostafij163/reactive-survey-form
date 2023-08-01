import { useCallback, useRef } from "react";
import { useReactFlow, useUpdateNodeInternals } from "reactflow";
import { useAppContext } from "../context/AppContext";

const CreateNode = (Component) => {
  function Node({ id, data }) {
    const { activeComponent, setActiveComponent } = useAppContext();
    const { setNodes } = useReactFlow();
    const reactFlowWrapper = useRef(null);
    const reactFlowInstance = useReactFlow();
    const updateNodeInternals = useUpdateNodeInternals();

    //   const handleTypeChange = (value) => {
    //     setNodeData(setNodes, id, "type", value);
    //   };

    console.log("activeComponent ", activeComponent);

    const onDragStart = useCallback((event) => {
      event.dataTransfer.effectAllowed = "move";
    }, []);

    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    }, []);

    const dragend = useCallback(
      (event) => {
        event.preventDefault();

        const reactFlowBounds =
          reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        console.log(position);

        setNodes((nds) =>
          nds.map((nd) => {
            if (nd.id === id) {
              nd.position = position;
            }
            updateNodeInternals(id);
            return nd;
          })
        );
      },
      [reactFlowInstance]
    );

    return (
      <div
        onClick={() => setActiveComponent(id)}
        className="nodrag"
        onDragStart={onDragStart}
        onDragEnd={dragend}
        onDragOver={onDragOver}
        draggable="true"
        ref={reactFlowWrapper}
      >
        <Component data={data} />
      </div>
    );
  }

  return Node;
};

export default CreateNode;
