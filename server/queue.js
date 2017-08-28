class Queue {
  constructor() {
    this.data = []; 
  }

  enqueue(job) {
    this.data.push(job); 
  }

  dequeue() {
    this.data.shift(); 
  }
}

module.exports = Queue; 