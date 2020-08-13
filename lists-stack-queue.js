const arrSoter = require('@andreas-hum/arraysorter');
const Node = require('./nodes/singleDirNode');


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

        const newHead = new Node(data);
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

        const newTail = new Node(value);
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



    /** Returns the current list's data as an array
    * @param {String} key If a key is provided then the key will be returned
    * @param {boolean} drop if true then the list gets dropped
    */
    returnList(key = null, drop = false) {

        if (!this.head) {
            return [];
        }

        let
            list = [],
            currentNode = this.head;

        while (currentNode) {

            key
                ? list.push(currentNode.data[key])
                : list.push(currentNode.data)

            currentNode = currentNode.getNext();
        }

        if (drop) {
            this.dropList();
        }

        return list;

    }


    /** Returns the list with all information
     * @param {boolean} drop if true then the list gets dropped
    */
    returnFullList(drop = false) {

        if (!this.head) {
            return [];
        }

        let
            list = [],
            currentNode = this.head;

        while (currentNode) {
            list.push(currentNode);
            currentNode = currentNode.getNext();
        }

        if (drop) {
            this.dropList();
        }
        return list;
    }


    /**
    * @param {SingleDirNode} node The note which data should be reassigned, if left null the method will search for a node with the matching data
    * @param {*} data The new data
    * @param {String} key If a key is specified, then the key's data whill change
    * @param {boolean} fullObj If set true then the key's whole dataset will change, will not function without the key argument
    * @returns {SingleDirLinkedList} If the return value is null then no results where found
    */
    reasignData(node = null, data, key = null, fullObj = false) {


        if (!key && fullObj) {
            console.log("fullObj will not function without a key");
            return;
        }

        if (key) {


            if (this.head === null) {
                return null;
            }

            if (this.head.data[key] === data[key] && key && fullObj) {
                this.head.data = data;
                return;
            } else if (this.head.data[key] === data[key] && key) {
                this.head.data[key] = data[key];
                return;
            }

            if (this.tail.data[key] === data[key] && key && fullObj) {
                this.tail.data = data;
                return;
            } else if (this.tail.data[key] === data[key] && key) {
                this.tail.data[key] = data[key];
                return;
            }


            if (!node) {

                let currentNode = this.head;

                if (data && key && fullObj) {

                    while (currentNode) {
                        if (currentNode.data[key] === data[key]) {
                            currentNode.data = data;
                            return;
                        }
                    }

                    currentNode = currentNode.getNext();
                }

                if (!currentNode) {
                    return null;
                }
            } else {
                if (data && key && fullObj) {
                    node.data = data
                } else {
                    node.data[key] = data[key]
                }

            }
        } else {

            if (!node) {

                if (this.head.data === data) {
                    this.head.data = data;
                    return;
                } else if (this.tail.data === data) {
                    this.tail.data = data;
                    return;
                }

                let currentNode = this.head;

                while (currentNode) {
                    if (currentNode.data === data) {
                        currentNode.data = data;
                        return;
                    }
                }

                return null;
            }


        }

    }


    searchViaKey(key, data) {

    }



    /** Sorts the current list using mergesort
    * @param {String} comparison If keys are used specify a comparison
    * @param {string} order Sorting order, asc or des. Default is des
    */
    sortList(comparison = null, order = 'des') {

        if (!this.head) {
            return [];
        }

        if (order.toLowerCase() !== 'des' && order.toLowerCase() !== 'asc') {
            order = 'des';
        }

        const sortedList = arrSoter.mergeSort(this.returnList(), order, comparison);

        this.dropList();

        for (let i = 0; i < sortedList.length; i++) {
            this.insertTail(sortedList[i]);
        }

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


    /** Drops the list
    */
    dropList() {
        this.head = null;
        this.tail = null;
    }

}


class BiDirList {

    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertHead(data) {

    }
}

const list = new SingleDirLinkedList();

for (let i = 10; i >= 1; i--) {
    list.insertTail(i);
}

