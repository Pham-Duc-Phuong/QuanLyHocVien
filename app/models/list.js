class List {
    constructor(_list = []) {
        this.list = _list;
    }
    addPerson(add) {
        this.list.push(add)
    }
    findID(A) {
        for (var i = 0; i < this.list.length; i++) {
            var kh = this.list[i].ID;
            if (kh == A) {
                return i
            }
        } return -1
    }
    deletePerson(A) {
        var index = this.findID(A)
        if (index !== -1) {
            this.list.splice(index, 1)
        }
    }
    updatePerson(A) {
        var index = this.findID(A.ID)
        if (index !== -1) {
            this.list[index] = A
        }
    }
}
export default List;