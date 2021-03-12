/* 
    Rules for BST => Binary search Tree

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
            else {
                return this;
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

    getNodeByValue(value) {

        let currentNode = this.root;
        let parentNode = null;
        while (currentNode) {
            if (currentNode.value === value) {
                return [parentNode, currentNode];
            }
            else if (value < currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            }
            else if (value > currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            }
        }
        return [null, null];
    }

    inOrderTraversal(node, arr) {
        if (node === null) {
            return;
        }
        this.inOrderTraversal(node.left, arr);
        arr.push(node.value);
        this.inOrderTraversal(node.right, arr);
        return arr;
    }

    preOrderTraversal(node, arr) {
        if (node === null) {
            return;
        }
        arr.push(node.value);
        this.preOrderTraversal(node.left, arr);
        this.preOrderTraversal(node.right, arr);
        return arr;
    }

    postOrderTraversal(node, arr) {
        if (node === null) {
            return;
        }
        this.postOrderTraversal(node.left, arr);
        this.postOrderTraversal(node.right, arr);
        arr.push(node.value);
        return arr;
    }

    delete(value) {

        if (this.root === null) {
            return this;
        }
        const [parentNode, nodeToDelete] = this.getNodeByValue(value);

        //console.log("Test parent Node", parentNode);
        //console.log("Test node To delete", nodeToDelete);
        // base condition
        if (parentNode === null && nodeToDelete === null) {
            return null;
        }

        // condition 1 - delete leaf node 
        // leaf node delete
        // set parent left or right pointer to null on value match
        if (nodeToDelete.left === null && nodeToDelete.right === null) {
            if (parentNode === null) {
                this.root = null;
                return this;
            }
            else if (parentNode.left?.value === nodeToDelete.value) {
                parentNode.left = null;
            }
            else if (parentNode.right?.value === nodeToDelete.value) {
                parentNode.right = null;
            }
        }

        // condition 2 - delete node with two child  (Two ways are valid)
        // Inorder predecesser way ie either find max value in left side of delete Node 
        //and take out that value and replace the delete node
        // Inorder successor way ie either find min value in right side of delete Node
        //and take out that value and replace the delete node

        else if (nodeToDelete.left !== null && nodeToDelete.right !== null) {
            // Inorder predecesser method
            let leftMaxNode = nodeToDelete.left;
            while (leftMaxNode.right) {
                leftMaxNode = leftMaxNode.right;
            }
            // after finiding inorder predecessor delete it 
            this.delete(leftMaxNode.value);
            // Take out the node as a left max precedessor 
            // point left and right pointers to leftMax Node
            leftMaxNode.left = nodeToDelete.left;
            leftMaxNode.right = nodeToDelete.right;
            // copy the max predecessor to nodeToDelete
            if (parentNode === null) {
                this.root = leftMaxNode;
            }
            else if (parentNode.left?.value === nodeToDelete.value) {
                parentNode.left = leftMaxNode;
            }
            else if (parentNode.right?.value === nodeToDelete.value) {
                parentNode.right = leftMaxNode;
            }
        }


        // condition 3 - delete node with one child 
        // point parent right or left to delete node right or left whichever has meaningful value
        else if (nodeToDelete.left !== null || nodeToDelete.right !== null) {
            const singleChildRef = nodeToDelete.left ?? nodeToDelete.right;
            if (parentNode === null) {
                this.root = singleChildRef;
                return this;
            }
            else if (parentNode.left?.value === nodeToDelete.value) {
                parentNode.left = singleChildRef;
            }
            else if (parentNode.right?.value === nodeToDelete.value) {
                parentNode.right = singleChildRef;
            }
        }

        return this;

    }

    stackInOrderTraversal(node) {

        const stack = [];
        const test = [];
        let currentNode = node;
        while (currentNode) {
            stack.push(currentNode);
            currentNode = currentNode.left;
        }
        while (stack.length) {
            const node = stack.pop();
            if (node.right) {
                stack.push(node.right);
                let currentNode = node.right.left;
                while (currentNode) {
                    stack.push(currentNode);
                    currentNode = currentNode.left;
                }
            }

            test.push(node.value);
        }

        console.log("Testing stacking instace", stack, test);
    }

    simplefiedInOrder(root) {

        let currentNode = root;
        const stack = [];
        const test = [];
        while (currentNode || stack.length) {
            while (currentNode) {
                stack.push(currentNode);
                currentNode = currentNode.left;
            }
            currentNode = stack.pop();
            test.push(currentNode.value);
            currentNode = currentNode.right;
        }

        console.log("Simplified test", test);
    }

    simpliedPreorder(root) {

        let currentNode = root;
        const test = [];
        const stack = [];

        while (stack.length || currentNode) {
            while (currentNode) {
                test.push(currentNode.value);
                stack.push(currentNode);
                currentNode = currentNode.left;
            }
            currentNode = stack.pop();
            currentNode = currentNode.right;
        }
        console.log(test);
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
    .insert(8.5)
    .insert(15)
    .insert(3)
    .insert(3.5)
    .insert(16)
    .insert(14)
    .insert(2)
    .insert(1)
    .insert(2.5)
    .insert(2.4)
    .insert(2.3)
    .insert(2.6)
    .insert(2.7)
    .insert(2.52)
    .insert(13.5)

// bstTree
//     .insert(1)
//     .insert(2)
//     .insert(3)


//console.log(`%cSearch Value 10 ${bstTree.search(10)}`);
//console.log(`%cSearch Value 14 ${bstTree.search(14)}`);

// console.log("delete test value 3\n", bstTree.delete(3));
// console.log("delete test value 4 \n", bstTree.delete(4));
// console.log("delete test value 5 \n", bstTree.delete(5))
//console.log("Tree", bstTree);
// console.log("delete test value 1 \n", bstTree.delete(1));
//console.log("delete test value 13 \n", bstTree.delete(13));
//console.log("delete test value 4 \n", bstTree.delete(4));
//console.log("delete test value 15 \n", bstTree.delete(15));


console.log("Inorder", bstTree.inOrderTraversal(bstTree.root, []));
bstTree.stackInOrderTraversal(bstTree.root,);
//bstTree.simplefiedInOrder(bstTree.root,);
//console.log("Tree", bstTree);
console.log("------------------------------------------------------------")
console.log("preorder", bstTree.preOrderTraversal(bstTree.root, []));
console.log("simplied preorder", bstTree.simpliedPreorder(bstTree.root, []));