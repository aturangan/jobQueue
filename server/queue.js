class Queue {
  constructor() {
    this.data = []; 
  }

  enqueue(job) {
    this.data.push(job); 
  }

  dequeue(job) {
    this.data.shift(); 
  }

  front() {
    return this.data[0];
  }

  back() {
    return this.data[this.data.length - 1];
  }
}

module.exports = Queue; 