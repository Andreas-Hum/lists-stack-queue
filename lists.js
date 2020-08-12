

/**  Single directional node class
*/
class SingleDirNode {

    /**
     * @param {any} data The nodes data
     */
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    /** Returns the next node
     */
    getNext() {
        return this.next;
    }

    /** Sets the next node
     * @param {SingleDirNode} nextNode It has to be an instance of this class or null
     */
    setNext(nextNode) {
        if (nextNode instanceof SingleDirNode || !nextNode) {
            this.next = nextNode;
        } else {
            throw new Error('The argument has to an instance of the SingleDirNode or null');
        }
    }
}



/**  Single directional list class
*/
class SingleDirLinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
    }


    /** Inserts a new head into the list
    * @param {*} data The new head's data
    */
    insertHead(data) {

        const newHead = new SingleDirNode(data);
        if (this.head) {
            newHead.setNext(this.head)
        }

        this.head = newHead;

        if (!this.tail) {
            this.tail = this.head
        }

    }

    /** Inserts a new tail into the list
    * @param {*} data The new tail's data
    */
    insertTail(value) {

        const newTail = new SingleDirNode(value);
        if (this.tail) {
            this.tail.setNext(newTail);
        }

        this.tail = newTail;

        if (!this.head) {
            this.head = this.tail;
        }
    }

    /** Removes and returns the current head
    */
    deleteHead() {

        if (!this.head) {
            return null;
        }

        const removedHead = this.head;

        if (!removedHead.getNext()) {
            this.dropList();
        } else {
            this.head = removedHead.getNext();
            removedHead.setNext(null);
        }

        return removedHead;
    }

    /** Removes and returns the current tail
    */
    deleteTail() {

        if (!this.tail) {
            return null;
        }

        let removedTail = this.tail;

        if (removedTail === this.head) {
            this.dropList();
        } else {
            let newTial = this.head;

            while (newTial.getNext() !== removedTail) {
                newTial = newTial.getNext();
            }

            newTial.setNext(null);
            this.tail = newTial;
        }

        return removedTail;
    }


    /** Drops the list
    */
    dropList() {
        this.head = null;
        this.tail = null;
    }


    /** Returns the current list's data as an array
    */
    returnList() {

        let list = [];

    }


    /** Prints the list
    */
    printList() {

        let
            output = '<Head> ',
            currentNode = this.head;

        while (currentNode) {
            output += currentNode.data + ' ';
            currentNode = currentNode.getNext();
        }

        console.log(output.concat('<Tail>'));
    }


}

const list = new SingleDirLinkedList();
list.insertHead(10);
list.insertHead(20);
// list.deleteHead();
// list.deleteTail()
// list.deleteTail()
console.log(list.tail)
list.printList();