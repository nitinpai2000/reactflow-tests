import { ReactFlow, Controls, Background,applyEdgeChanges, applyNodeChanges,addEdge } from '@xyflow/react';
import { useCallback,  useState, useEffect } from 'react';
import '@xyflow/react/dist/style.css';

const initialNodes = [];

const initialEdges = [];

export default function Flow() {  

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  useEffect(() => {
    console.log("Use effect called");
    fetch('http://localhost:5146/api/Graph')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        var data = response.json();
        console.log(data);
        return data;
      })
      .then(function(json){
        console.log(json);
        setNodes(json.nodes);
        
      })
      .catch(error => console.error(error));      
  }, []);

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

