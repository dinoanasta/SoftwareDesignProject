//Takes in original question graph and the students answer graph then provides functionality to check if it is correct

class dfsMarker {
  //Takes in original question graph and the students answer graph then checks if it is correct
  constructor(
    lecturer_graph,
    student_answer_graph,
    is_lecturer_question_graph
  ) {
    if (is_lecturer_question_graph) {
      this.question_graph = lecturer_graph.getAdjacenyMatrix();
      this.lecturer_answer_graph = null;
    } else {
      this.question_graph = null;
      this.lecturer_answer_graph = lecturer_graph.getAdjacenyMatrix();
    }
    this.student_answer_graph = student_answer_graph.getAdjacenyMatrix();
    this.start_node = lecturer_graph.getSourceNode();
  }

  //Check if the student's answer is correct
  checkAnswerDFS() {
    var answer = null;
    //Check if the answer must be calculated then checked or if the answer must just be compared to the lecturer's answer
    if (this.lecturer_answer_graph == null) {
      var num_nodes = this.question_graph.length;
      var visited_array = this.getInitialVisitedArray(num_nodes);
      //First check for cycles, if edges are valid, and if graphs are the same size
      var cycles_exist = this.doesGraphHaveCycles(
        this.start_node,
        visited_array,
        true,
        this.student_answer_graph,
        -1
      );
      var edges_valid = this.areGraphEdgesValid();
      var graphs_same_size = this.areGraphsSameSize();

      //console.log("Cycles exist? ",cycles_exist," Edges are valid? ",edges_valid," Graphs are the same size? ",graphs_same_size);
      if (!cycles_exist && edges_valid && graphs_same_size) {
        // console.log("JesseT1:", cycles_exist, edges_valid, graphs_same_size);
        visited_array = this.getInitialVisitedArray(num_nodes);
        visited_array[this.start_node] = true;
        answer = this.isDFSFromNode(this.start_node, visited_array);
      } else {
        // console.log("JesseT2:", cycles_exist, edges_valid, graphs_same_size);
        answer = false;
      }
    } else if (this.question_graph == null) {
      if (this.student_answer_graph == this.lecturer_answer_graph) {
        answer = true;
      } else {
        answer = false;
      }
    }

    return answer;
  }

  areGraphEdgesValid() {
    for (var i = 0; i < this.student_answer_graph.length; i++) {
      // console.log("testt:",this.student_answer_graph, this.question_graph);
      //var curr_graph_length = this.student_answer_graph[i].length;
      for (var j = 0; j < this.student_answer_graph[i].length; j++) {
        if (
          this.student_answer_graph[i][j] != this.question_graph[i][j] &&
          this.student_answer_graph[i][j] != 0
        ) {
          return false;
        }
      }
    }
    return true;
  }

  doesGraphHaveCycles(curr_node, visited_array, is_first_node, graph, parent_node) {
    visited_array[curr_node] = true;
    var curr_node_neighbours = this.getCurrNodeNeighboursCycleCheck(
      curr_node,
      graph
    );

    if(is_first_node && curr_node_neighbours.length == 0){
      return true;
    }
    // if (!is_first_node) {
    //   var num_visited_neighbours = this.getNumNeighboursVisited(
    //     curr_node_neighbours,
    //     visited_array
    //   );
    //   console.log(curr_node, "num_visited_neighbours ",num_visited_neighbours,"curr_node_neighbours ",curr_node_neighbours);
    //   let tot_vis_const = 0;
    //   for(var i = 0;i<curr_node_neighbours.length;i++){
    //       if(curr_node_neighbours[i] == parent_node){
    //         tot_vis_const = 1;
    //         break;
    //       }
    //   }
    //   if (num_visited_neighbours > tot_vis_const) {
    //     return true;
    //   }
    // }

    for (var i = 0; i < curr_node_neighbours.length; i++) {
      var curr_neighbour = curr_node_neighbours[i];
      var cycles_exist;
      if (!visited_array[curr_neighbour]) {
        cycles_exist = this.doesGraphHaveCycles(
          curr_neighbour,
          visited_array,
          false,
          graph,
          curr_node
        );
        if (cycles_exist) {
          return true;
        }
      }else if(curr_neighbour != parent_node){
        return true;
      }
    }
    return false;
  }

  areGraphsSameSize() {
    if (this.question_graph.length == this.student_answer_graph.length) {
      return true;
    } else {
      return false;
    }
  }

  isDFSFromNode(curr_node, visited_array) {
    var curr_node_neighbours = this.getCurrNodeNeighbours(
      curr_node,
      visited_array
    );
    //console.log(curr_node,curr_node_neighbours);
    var is_dfs = true;
    while (curr_node_neighbours.length != 0) {
      //check if there is a max node
      var fully_connected_node_index = this.getFullyConnectedNode(
        curr_node_neighbours,
        visited_array
      );
      //console.log(curr_node,"fully_connected_node_index",fully_connected_node_index," ",curr_node_neighbours);
      if (fully_connected_node_index != -1) {
        //fully connected node exists
        var fully_connected_node =
          curr_node_neighbours[fully_connected_node_index];
        visited_array[fully_connected_node] = true;
        curr_node_neighbours.splice(fully_connected_node_index, 1);

        var is_dfs_from_node = this.isDFSFromNode(
          fully_connected_node,
          visited_array
        );
        if (!is_dfs_from_node) {
          is_dfs = false;
        }
      } else {
        //fully connected node doesn't exist
        is_dfs = false;
        break;
      }
    }

    return is_dfs;
  }

  getFullyConnectedNode(curr_node_neighbours, overall_visited) {
    //return index of fully connected node inside curr_node_neighbours
    var fully_connected_node_index = -1;

    for (var i = 0; i < curr_node_neighbours.length; i++) {
      var curr_neighbour = curr_node_neighbours[i];

      var curr_dfs_visited = this.getInitialVisitedArray(
        overall_visited.length
      );
      var num_nodes_connected_question_graph = this.numNodesConnectedDFS(
        curr_neighbour,
        this.question_graph,
        overall_visited,
        curr_dfs_visited
      );
      //console.log(curr_neighbour,"num_nodes_connected_question_graph: ",num_nodes_connected_question_graph);

      curr_dfs_visited = this.getInitialVisitedArray(overall_visited.length);
      var num_nodes_connected_answer_graph = this.numNodesConnectedDFS(
        curr_neighbour,
        this.student_answer_graph,
        overall_visited,
        curr_dfs_visited
      );
      //console.log(curr_neighbour,"num_nodes_connected_answer_graph: ",num_nodes_connected_answer_graph);

      if (
        num_nodes_connected_answer_graph == num_nodes_connected_question_graph
      ) {
        fully_connected_node_index = i;
        break;
      }
    }

    return fully_connected_node_index;
  }

  getInitialVisitedArray(size) {
    var curr_visited_array = [];
    for (var i = 0; i < size; i++) {
      curr_visited_array.push(false);
    }

    return curr_visited_array;
  }

  numNodesConnectedDFS(curr_node, graph, overall_visited, curr_dfs_visited) {
    curr_dfs_visited[curr_node] = true;
    var curr_node_neighbours = this.getCurrNodeNeighboursNormalDFS(
      curr_node,
      graph,
      overall_visited,
      curr_dfs_visited
    );
    var total_count = 0;
    for (var i = 0; i < curr_node_neighbours.length; i++) {
      var curr_neighbour = curr_node_neighbours[i];
      if (!curr_dfs_visited[curr_neighbour]) {
        total_count += this.numNodesConnectedDFS(
          curr_neighbour,
          graph,
          overall_visited,
          curr_dfs_visited
        );
      }
    }
    total_count++;
    //console.log(curr_node,"total_count",total_count);
    return total_count;
  }

  getCurrNodeNeighbours(curr_node, visited_array) {
    var curr_node_neighbours = [];
    for (var i = 0; i < this.question_graph[curr_node].length; i++) {
      if (
        this.question_graph[curr_node][i] != 0 &&
        this.student_answer_graph[curr_node][i] != 0 &&
        !visited_array[i]
      ) {
        curr_node_neighbours.push(i);
      }
    }
    return curr_node_neighbours;
  }

  getCurrNodeNeighboursNormalDFS(
    curr_node,
    graph,
    overall_visited,
    curr_dfs_visited
  ) {
    var curr_node_neighbours = [];
    for (var i = 0; i < graph[curr_node].length; i++) {
      if (
        graph[curr_node][i] != 0 &&
        !curr_dfs_visited[i] &&
        !overall_visited[i]
      ) {
        curr_node_neighbours.push(i);
      }
    }
    return curr_node_neighbours;
  }

  getCurrNodeNeighboursCycleCheck(curr_node, graph) {
    var curr_node_neighbours = [];
    for (var i = 0; i < graph[curr_node].length; i++) {
      if (graph[curr_node][i] != 0) {
        curr_node_neighbours.push(i);
      }
    }
    return curr_node_neighbours;
  }

  getNumNeighboursVisited(curr_node_neighbours, visited_array) {
    var total_visited = 0;
    for (var i = 0; i < curr_node_neighbours.length; i++) {
      if (visited_array[curr_node_neighbours[i]]) {
        total_visited++;
      }
    }
    return total_visited;
  }
}
