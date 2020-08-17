const arrSoter = require('@andreas-hum/arraysorter');
const SingleDirNode = require('./nodes/singleDirNode');


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



    /** Returns the current list's data as an array with the key
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


    /** Search for a node via data or key
    * @param {*} data The nodes data if, left null will return the first node with the elements key or data
    * @param {String} key The key that should be searched for, if left null will only search for data
    * @returns Returns the first node with the matching the matching information
    */
    searchByData(data = null, key = null) {

        if (key === null && data === null) {
            throw new Error('Arguments are null');
        }

        if (!this.head) {
            return null;
        }

        let list = [];

        if (key) {

            if (this.head.data[key] === data) {
                return this.head;
            } else if (this.tail.data === data) {
                return this.tail;
            }

            if (data) {
                list = this.returnFullList().filter(element => element.data[key] === data);
            } else {
                list = this.returnFullList().filter(element => element.data[key] !== undefined);
            }

            return list.length
                ? list[0]
                : null;

        } else {

            if (this.head.data === data) {
                return this.head;
            } else if (this.tail.data === data) {
                return this.tail;
            }

            if (data) {
                list = this.returnFullList().filter(element => element.data === data);
            }

            return list.length
                ? list[0]
                : null;;

        }


    }

    /** Searches for all nodes with a specefic key
    * @param {*} data The nodes data if left null will return the first node with the elements key or data
    * @param {String} key The key that should be searched for, if left null will only use data
    * @returns Returns the nodes in an array with the matching key (pair) values else null
    */
    searchAllViaData(data = null, key = null) {

        if (key === null && data === null) {
            throw new Error('Arguments are null');
        }

        if (!this.head) {
            return null;
        }

        let list = [];

        if (key) {

            if (data) {
                list = this.returnFullList().filter(element => element.data[key] === data);
            } else {
                list = this.returnFullList().filter(element => element.data[key] !== undefined);
            }

            return list.length
                ? list
                : null;

        } else {

            if (data) {
                list = this.returnFullList().filter(element => element.data === data);
            }


            return list.length
                ? list
                : null;;

        }

    }



    /** Sorts the current list using mergesort
    * @param {String} comparison If keys are used specify a comparison
    * @param {string} order Sorting order, asc or des. Default is des
    */
    sortList(comparison = null, order = 'des') {

        if (!this.head) {
            return [];
        }

        const sortedList = arrSoter.mergeSort(this.returnList(), order, comparison);

        this.dropList();

        for (let i = 0; i < sortedList.length; i++) {
            this.insertTail(sortedList[i]);
        }

    }


    /** Reasigns the first nodes data that matches the data or key
    * @param {*} data The nodes data if left null the first key that matches the key will be reasigned
    * @param {*} newDat The new data
    * @param {String} key The key that should be searched for and, if left null will only use data to search for node
    * @returns Returns null if the data has not been reasigned
    */
    reasignData(data = null, newDat, key = null) {

        if (key === null && data === null) {
            throw new Error('Arguments are null');
        }

        if (!data && !newDat) {
            throw new Error('Data is missing');
        }

        let list = [];

        if (key) {

            if (data) {
                list = this.returnFullList().filter(element => element.data[key] === data);
                list[0].data[key] = newDat;
            } else {
                list = this.returnFullList().filter(element => element.data[key] !== undefined);
                list[0].data = newDat;
            }

        } else {

            list = this.returnFullList().filter(element => element.data === data);
            list[0].data = newDat
        }

        if (!list.length) {
            return null;
        }
    }


    /** Prints the list's data
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

for (let i = 0; i < 10; i++) {
    // list.insertHead({ 'key': i });
    list.insertHead({ 'key': i });
}
