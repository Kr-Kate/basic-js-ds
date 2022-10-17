const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(value) {
    this.data = value;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.radix = null;
  }

  root() {
    if(this.radix === null){
      return null;
    }

    return this.radix;
  }

  add(value) {

    this.radix = addWithin(this.radix, value);

      function addWithin(node, value) {
        if (!node) {
          return new Node(value);
        }

        if (node.data === value) {
          return node;
        }

        if (value < node.data) {
          node.left = addWithin(node.left, value);
        } else {
          node.right = addWithin(node.right, value);
        }

        return node;
      }
  }

  has(value) {
    return searchWithin(this.radix, value);

      function searchWithin(node, value) {
        if (!node) {
          return false;
        }

        if (node.data === value) {
          return true;
        }

        return value < node.data ? 
          searchWithin(node.left, value) : 
          searchWithin(node.right, value);
      }
  }

  find(value) {
    return findeNode(this.radix, value);

      function findeNode(node, value) {
        if(node === null) {
          return null;
        }
        else if(value === node.data) {
          return node;
        }
        else if(value > node.data) {
          return findeNode(node.right, value);
        }
        else {
          return findeNode(node.left, value);
        }
      }
  }

  remove(value) {
    this.radix = removeNode(this.radix, value);

      function removeNode(node, value) {
        if (!node) {
          return null;
        }

        if (value < node.data) {
          node.left = removeNode(node.left, value);
          return node;
        } else if (node.data < value) {
          node.right = removeNode(node.right, value);
          return node;
        } else {
          if (!node.left && !node.right) {
            return null;
          }

          if (!node.left) {
            node = node.right;
            return node;
          }

          if (!node.right) {
            node = node.left;
            return node;
          }

          let minFromRight = node.right;
          while (minFromRight.left) {
            minFromRight = minFromRight.left;
          }
          node.data = minFromRight.data;

          node.right = removeNode(node.right, minFromRight.data);

          return node;
        }
      }
  }

  min() {
    if (!this.radix) {
      return null;
    }

    let node = this.radix;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.radix) {
      return null;
    }

    let node = this.radix;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};