//Class that takes in the lecturers question/answer graph as well as the students answer graph then
//determines if their answer is correct

class ShortestPathMarker {
  //Takes in original question graph/lecturer's answer graph and the
  //students answer graph then allows user to checks if it is correct
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
    this.maxNumber = Math.pow(10, 1000);
  }

  //Checks if the answer is correct and then returns a boolean value
  checkAnswerShortestPath() {
    var answer = null;
    //Check if the answer must be calculated then checked or if the answer must just be compared to the lecturer's answer
    if (this.lecturer_answer_graph == null) {
      //First check if edges are valid, and if graphs are the same size
      var edges_valid = this.areGraphEdgesValid();
      var graphs_same_size = this.areGraphsSameSize();

      if (edges_valid && graphs_same_size) {
        //Run shortest path on lecturer graph and get dists/then do the same for student and get dists
        var question_graph_dists = this.getShortestDists(this.question_graph);
        var answer_graph_dists = this.getShortestDists(
          this.student_answer_graph
        );
        //console.log(question_graph_dists, answer_graph_dists);
        //Then compare dists
        if (
          JSON.stringify(question_graph_dists) ==
          JSON.stringify(answer_graph_dists)
        ) {
          answer = true;
        } else {
          answer = false;
        }
      } else {
        answer = false;
      }
    } else if (this.question_graph == null) {
      if (
        JSON.stringify(this.student_answer_graph) ==
        JSON.stringify(this.lecturer_answer_graph)
      ) {
        answer = true;
      } else {
        answer = false;
      }
    }

    return answer;
  }

  areGraphEdgesValid() {
    for (var i = 0; i < this.student_answer_graph.length; i++) {
      //console.log(this.student_answer_graph,this.student_answer_graph[i].length);
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

  areGraphsSameSize() {
    if (this.question_graph.length == this.student_answer_graph.length) {
      return true;
    } else {
      return false;
    }
  }

  getShortestDists(curr_graph) {
    //store priortiy q, visited arr, dists arr
    var num_nodes = curr_graph.length;
    var priortiyQ = new PriorityQueue();
    var visited_arr = [];
    var shortest_dists_arr = [];

    for (var i = 0; i < num_nodes; i++) {
      //Add element(id, weight) to priority queue
      visited_arr.push(false);
      shortest_dists_arr.push(-1);
      if (i == this.start_node) {
        priortiyQ.enqueue(i, 0);
      } else {
        priortiyQ.enqueue(i, this.maxNumber);
      }
    }

    while (!priortiyQ.isEmpty()) {
      var curr_node = priortiyQ.dequeue();
      var curr_node_ind = curr_node.data;
      var curr_node_dist = curr_node.priority;
      if (visited_arr[curr_node_ind] == true) {
        continue;
      } else {
        visited_arr[curr_node_ind] = true;
        shortest_dists_arr[curr_node_ind] = curr_node_dist;
        //get and update neighbours
        var curr_neighbours = this.getCurrNodeNeighbours(
          curr_node_ind,
          curr_graph,
          visited_arr
        );
        for (var i = 0; i < curr_neighbours.length; i++) {
          var curr_neighbour_ind = curr_neighbours[i];
          var curr_neighbour_dist =
            curr_node_dist + curr_graph[curr_node_ind][curr_neighbour_ind];
          priortiyQ.enqueue(curr_neighbour_ind, curr_neighbour_dist);
        }
      }
    }

    return shortest_dists_arr;
  }

  getCurrNodeNeighbours(curr_node_ind, curr_graph, visited_arr) {
    var neighbours = [];
    for (var i = 0; i < curr_graph[curr_node_ind].length; i++) {
      if (!visited_arr[i] && curr_graph[curr_node_ind][i] != 0) {
        neighbours.push(i);
      }
    }
    return neighbours;
  }
}




