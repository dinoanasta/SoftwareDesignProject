const {Graph} = require('./Graphs');
function Prim(graph) { // Function that takes in an adjacency matrix representation of a graph, and finds the cost of the MWST
    var V = graph.vertices.length; // Get the number of vertices in the graph
    var weight = 0;

    graph = graph.getAdjacenyMatrix(); // Get the adjacency matrix representation of the graph.
    var parent = new Array(V); // Array to store constructed MST

    var key = new Array(V); // Key values used to pick minimum weight edge

    var mstSet = new Array(V);     // To represent set of vertices not yet included in MST

    function minKey(key, mstSet){ // Find the vertex with the minimum key value from the set of vertices not yet included in MST
        var min = Number.MAX_VALUE; // Initialize min value
        var min_index = -1;

        for (let v = 0; v < V; v++)
            if (mstSet[v] == false && key[v] < min) {
                min = key[v];
                min_index = v;
            }
        return min_index;
    }

    // Initialize all keys as INFINITE
    for (let i = 0; i < V; i++) {
        key[i] = Number.MAX_VALUE;
        mstSet[i] = false;
    }

    key[0] = 0; // Make key 0 so that this vertex is picked as first vertex
    parent[0] = -1; // First node is always root of MST

    for (let count = 0; count < V - 1; count++) { // The MST will have V vertices
        var u = minKey(key, mstSet); // Pick the minimum key vertex from the set of vertices not yet included in MST
        mstSet[u] = true; // Add the picked vertex to the MST Set

        // Update key value and parent index of the adjacent vertices of the picked vertex.
        // Consider only those vertices which are not yet included in MST
        for (let v = 0; v < V; v++)

            /* graph[u][v] is non zero only for adjacent vertices of m
               mstSet[v] is false for vertices not yet included in MST
               Update the key only if graph[u][v] is smaller than key[v]
            */

            if (graph[u][v] != 0 && mstSet[v] == false && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
    }

    for (let i = 0; i < key.length; i++){ // Now Find the weight of the newly constructed spanning tree.
        weight+=key[i];
    }
    return weight;
}
exports.Prim = Prim;