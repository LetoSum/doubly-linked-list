const Node = require('./node');//data, prev, next

class LinkedList {
    constructor() {
        this._head = this._tail = null;
        this.length = 0;
    }

    append(data) {
        var node = new Node(data, this._tail);
        if(this._tail) {
            this._tail.next = node;
        }
        this._tail = node;
        if(this._head == null) {
            this._head = this._tail;
        }
        this.length++;
        return this;
    }

    head() {
        return this.isEmpty()? null: this._head.data;
    }

    tail() {
        return this.isEmpty()? null: this._tail.data;
    }

    at(index) {
        if(index < 0 || index >= this.length) {
            throw new Error('invalid index provided to #at method');
        }
        return this._getNode(index).data; 
    }

    insertAt(index, data) {
        if(index < 0 || index > this.length) {
            throw new Error('invalid index provided to #insertAt method');
        }
        if(index == this.length) {
            return this.append(data);
        }
        var next = this._getNode(index);
        var prev = next.prev;
        var node = new Node(data, prev, next);
        next.prev = node;
        if(prev) {
            prev.next = node;
        }
        this.length++;
        return this;
    }

    isEmpty() {
        return this.length == 0;
    }

    clear() {
        this._head = this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if(index < 0 || index >= this.length) {
            throw new Error('invalid index provided to #deleteAt method');
        }
        var nodeToDelete = this._getNode(index);
        var next = nodeToDelete.next;
        var prev = nodeToDelete.prev;
        if(next != null) {
            next.prev = prev;
        } else {
            this._tail = prev;
        }
        if(prev != null) {
            prev.next = next;
        } else {
            this._head = next;
        }
        this.length--;
        return this;
    }

    reverse() {
        for(var currentNode = this._head; currentNode != null; currentNode = currentNode.prev) {
            var temp = currentNode.next;
            currentNode.next = currentNode.prev;
            currentNode.prev = temp;
        }
        var temp = this._head;
        this._head = this._tail;
        this._tail = temp;
        return this;
    }

    indexOf(data) {
        var currentNode = this._head;
        for(var i = 0; i < this.length; i++) {
            if(currentNode.data == data)
                return i;
            currentNode = currentNode.next;
        }
        return -1;
    }

    _getNode(index) {
        var currentNode = this._head;
        for(var i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
}

module.exports = LinkedList;
