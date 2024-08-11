import { ReactFlow, Controls, Background,applyEdgeChanges, applyNodeChanges,addEdge } from '@xyflow/react';
import { useCallback,  useState } from 'react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
    type: 'input',
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'World' },
  },
  
  {
    id: '3',
    position: { x: 300, y: 200 },
    data: { label: 'of sport' },
  },
];

const initialEdges = [{ id: '1-2', source: '1', target: '2' ,  label: 'to the'},{ id: '1-3', source: '1', target: '3' ,  label: 'to the'}];
// const initialEdges = [];

export default function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

 

  return (
    <div style={{ height: '100vh', width:'100vw' }}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

