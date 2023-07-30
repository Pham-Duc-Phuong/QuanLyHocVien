import Person from "./person.js";
class Student extends Person{
    constructor(ID, name, diachi, email, doituong, toan, ly, hoa){
        super(ID, name, diachi, email, doituong)
        this.toan = toan
        this.ly = ly
        this.hoa = hoa
    }
    DTB () {
        return (this.toan + this.ly + this.hoa)/3
    }
}
export {Student}