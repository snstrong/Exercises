/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    let node = new Node(val);
    if (this.first) node.next = this.first;
    if (!this.last) this.last = node;
    this.first = node;
    this.size++;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if (!this.first) throw Error("Empty queue");
    let first = this.first;
    this.first = this.first.next;
    this.size--;
    return first.val;
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.first.val;

  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return (!this.first) ? true : false;

  }
}

module.exports = Stack;
