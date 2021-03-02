/* 
    Rules for Insertion 

    Left subtree for any particular node will be always lesser than node value

    Right subtree for any particular node will be always greater than that node 

*/


class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.left = null;
        this.right = null;
    }
    insert(value) {
        const newNode = new Node(value);
        let currentNode = this.root;
        if (currentNode === null) {
            this.root = newNode;
            return this;
        }
        while (currentNode) {
            if (newNode.value < currentNode.value) {
                if (currentNode.left === null) {
                    currentNode.left = newNode;
                    return this;
                }
                else {
                    currentNode = currentNode.left;
                }
            }
            else if (newNode.value > currentNode.value) {
                if (currentNode.right === null) {
                    currentNode.right = newNode;
                    return this;
                } else {
                    currentNode = currentNode.right;
                }
            }
        }
    }
    search(value) {
        let currentNode = this.root;
        if (currentNode === null) {
            return "Empty tree";
        }
        while (currentNode) {
            if (currentNode.value === value) {
                return 'Match Found';
            }
            else if (value < currentNode.value) {
                currentNode = currentNode.left;
            }
            else if (value > currentNode.value) {
                currentNode = currentNode.right;
            }
        }
        return 'Match Not Found';
    }

}


const bstTree = new BinarySearchTree();

bstTree
    .insert(13)
    .insert(4)
    .insert(5)
    .insert(8)
    .insert(7)
    .insert(9)
    .insert(15)
    .insert(3)
    .insert(16)
    .insert(14)

console.log(`%cSearch Value 10 ${bstTree.search(10)}`,);
console.log(`%cSearch Value 14 ${bstTree.search(14)}`);
console.log(bstTree);