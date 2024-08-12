import { useCallback,useState, useMemo } from 'react';
import { Handle, Position,ReactFlowProvider, ReactFlow, addEdge, applyEdgeChanges, applyNodeChanges, } from '@xyflow/react';
import TextUpdaterNode from './TextUpdaterNode.jsx';
import '@xyflow/react/dist/style.css';
import './TextUpdater.css';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const initialNodes = [
  {
    id: 'node-1',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
 



export default function Flow({data}) {  


  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <div style={{ height: '100vh', width:'100vw' }}>
    <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    nodeTypes={nodeTypes}
    fitView
    style={rfStyle}
  /></div>
  );
}

