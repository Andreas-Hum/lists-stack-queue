/**  Bidirectional node class
*/
class BiDirNode {

    /**
     * @param {any} data The nodes data
     */
    constructor(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }

    /** Returns the next node
    */
    getNext() {
        return this.next;
    }

    /** Returns the previous node
    */
    getPrevious() {
        return this.previous;
    }

    /** Sets the next node
    * @param {BiDirNode} nextNode It has to be an of the BiDirNode class or null
    */
    setNext(nextNode) {
        if (nextNode instanceof BiDirNode || !nextNode) {
            this.next = nextNode;
        } else {
            throw new Error('The argument has to an instance of the BiDirNode class or null');
        }
    }

    /** Sets the next node
    * @param {BiDirNode} previousNode It has to be an instance of the BiDirNode class or null
    */
    setPrevious(previousNode) {
        if (previousNode instanceof BiDirNode || !previousNode) {
            this.previous = previousNode;
        } else {
            throw new Error('The argument has to an instance of the BiDirNode class or null');
        }
    }

}

module.exports = BiDirNode;