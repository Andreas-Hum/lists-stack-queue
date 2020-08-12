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
     * @param {SingleDirNode} nextNode It has to be an instance of the SingleDirNode class or null
     */
    setNext(nextNode) {
        if (nextNode instanceof SingleDirNode || !nextNode) {
            this.next = nextNode;
        } else {
            throw new Error('The argument has to an instance of the SingleDirNode class or null');
        }
    }
}

module.exports = SingleDirNode;