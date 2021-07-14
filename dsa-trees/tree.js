/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.children) return this.val;
    let sum = this.val;
    for (let child of this.children) {
      sum += child.sumValues();
    }
    return sum;
  }

   /** countEvens(): count all of the nodes in the tree with even values. */

   countEvens() {
     if (!this.children) {
       return this.val % 2 === 0 ? this.val : 0;
     }
     let evenCount = 0;
     for (let child of this.children) {
       if (child.val % 2 === 0) evenCount++;
       evenCount += child.countEvens();
     }
     return evenCount;
   }


}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;
    return this.root.sumValues();
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;
    return this.root.countEvens();


  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {

  }
}

module.exports = { Tree, TreeNode };
