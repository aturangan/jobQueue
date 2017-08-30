class Queue {
  constructor() {
    this.data = []; 
  }

  enqueue(job) {
    this.data.push(job); 
  }

  dequeue() {
  	return this.data.shift(); 
  }
}

module.exports = Queue; 