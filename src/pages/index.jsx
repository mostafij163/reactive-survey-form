import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import { nanoid } from "nanoid";

import Group from "../components/Group";
import Question from "../components/Question";
import Sidebar from "../components/Sidebar";
import GroupConfModal from "../components/GroupConfModal";
import NodecontextMenu from "../components/NodeContextMenu";

import "reactflow/dist/style.css";
import ContextMenu from "../components/ContextMenu";

export const nodeTypes = {
  Group,
  Question,
};

let id = 1;
export const getId = () => `${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const contextRef = useRef(null);
  const ref = useRef(null);
  const [menu, setMenu] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
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

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();
      event.stopPropagation();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const openContextMenu = useCallback((e) => {
    e.preventDefault();
    contextRef.current.display = "block";
    contextRef.current.left = `${e.clientX - 50}px`;
    contextRef.current.top = `${e.clientY - 50}px`;
  }, []);

  const onBackgroundClick = useCallback(() => {
    contextRef.current.display = "none";
  }, []);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            ref={ref}
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            onPaneClick={onPaneClick}
            onNodeContextMenu={onNodeContextMenu}
            onContextMenu={openContextMenu}
            onClick={onBackgroundClick}
          >
            <GroupConfModal />
            <ContextMenu ref={contextRef} />
            {menu && <NodecontextMenu onClick={onPaneClick} {...menu} />}
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
