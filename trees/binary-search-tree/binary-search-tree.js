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

    getNodeByValue(value) {

        let currentNode = this.root;
        let parentNode = currentNode;
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

    inOrderTraversal(node,arr){
        if(node === null){
            return ;
        }
        this.inOrderTraversal(node.left,arr);
        arr.push(node.value);
        this.inOrderTraversal(node.right,arr);
        return arr;
    }

    preOrderTraversal(node,arr){
        if(node === null){
            return ;
        }
        arr.push(node.value);
        this.inOrderTraversal(node.left,arr);
        this.inOrderTraversal(node.right,arr);
        return arr;
    }

    postOrderTraversal(node,arr){
        if(node === null){
            return ;
        }
        this.inOrderTraversal(node.left,arr);
        this.inOrderTraversal(node.right,arr);
        arr.push(node.value);
        return arr;
    }

    delete(value) {

        if (this.root === null) {
            return this;
        }
        const [parentNode, nodeToDelete] = this.getNodeByValue(value);

        console.log("Test parent Node", parentNode);
        console.log("Test node To delete", nodeToDelete);
        // base condition
        if (parentNode === null && nodeToDelete === null) {
            return this;
        }

        // condition 1 - delete leaf node 
        // leaf node delete
        // set parent left or right pointer to null on value match
        if (nodeToDelete.left === null && nodeToDelete.right === null) {
            if (parentNode.left.value === nodeToDelete.value) {
                parentNode.left = null;
            }
            else if (parentNode.right.value === nodeToDelete.value) {
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
            let leftMaxParentNode = nodeToDelete.left;
            let leftMaxNode = leftMaxParentNode;
            while (leftMaxNode.right) {
                leftMaxParentNode = leftMaxNode;
                leftMaxNode = leftMaxNode.right;
            }
            //break last min node (since inorder predeccessor take right)
            leftMaxParentNode.right = null;
            //move min node to delete node position
            leftMaxNode.right = nodeToDelete.right;
            leftMaxNode.left = nodeToDelete.left;
            nodeToDelete.right = null;
            nodeToDelete.left = null;
            // Point delete Node parent to new moved node
            parentNode.left = leftMaxNode;
            //console.log("two node delete min parent node", minParentNode);
            //console.log("two node delete minNode", minNode);
        }


        // condition 3 - delete node with one child 
        // point parent right or left to delete node right or left whichever has meaningful value
        else if (nodeToDelete.left !== null || nodeToDelete.right !== null) {
            const singleChildRef = nodeToDelete.left ?? nodeToDelete.right;
            if (parentNode.left.value === nodeToDelete.value) {
                parentNode.left = singleChildRef;
            }
            else if (parentNode.right.value === nodeToDelete.value) {
                parentNode.right = singleChildRef;
            }
        }

        return this;

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
    .insert(2)

console.log(`%cSearch Value 10 ${bstTree.search(10)}`);
console.log(`%cSearch Value 14 ${bstTree.search(14)}`);

// console.log("delete test value 3\n", bstTree.delete(3));
// console.log("delete test value 4 \n", bstTree.delete(4));
// console.log("delete test value 5 \n", bstTree.delete(5))
//console.log("delete test value 4 \n", bstTree.delete(4));


console.log("Inorder",bstTree.inOrderTraversal(bstTree.root,[]));
console.log("preorder",bstTree.preOrderTraversal(bstTree.root,[]));
console.log("postorder",bstTree.postOrderTraversal(bstTree.root,[]));