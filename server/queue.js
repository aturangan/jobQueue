class Queue {
  constructor() {
    this.data = []; 
    this.size = 0; 
  }

  enqueue(job) {
    this.data.push(job); 
  }

  dequeue() {
  	return this.data.shift(); 
  }
}

module.exports = Queue; 