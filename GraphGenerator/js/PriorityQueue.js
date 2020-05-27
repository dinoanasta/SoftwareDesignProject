class PriorityQueue {
  constructor() {
    // Init an array that'll contain the queue values.
    this.container = [];
  }
  // Helper function to display all values while developing
  display() {
    console.log(this.container);
  }
  // Checks if queue is empty
  isEmpty() {
    return this.container.length === 0;
  }

  enqueue(data, priority) {
    // Check if Queue is full
    let currElem = new this.Element(data, priority);
    let addedFlag = false;
    // Since we want to add elements to end, we'll just push them.
    for (let i = 0; i < this.container.length; i++) {
      if (currElem.priority < this.container[i].priority) {
        this.container.splice(i, 0, currElem);
        addedFlag = true;
        break;
      }
    }
    if (!addedFlag) {
      this.container.push(currElem);
    }
  }
  dequeue() {
    // Check if empty
    if (this.isEmpty()) {
      console.log("Queue Underflow!");
      return;
    }
    return this.container.shift();
  }
  peek() {
    if (isEmpty()) {
      console.log("Queue Underflow!");
      return;
    }
    return this.container[0];
  }
  clear() {
    this.container = [];
  }
}
// Create an inner class that we'll use to create new nodes in the queue
// Each element has some data and a priority
PriorityQueue.prototype.Element = class {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
  }
}
