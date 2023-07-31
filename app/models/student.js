import Person from "./person.js";
class Student extends Person{
    constructor(psID, name, diachi, email, doituong, toan, ly, hoa){
        super(psID, name, diachi, email, doituong)
        this.toan = toan
        this.ly = ly
        this.hoa = hoa
    }
    mapDoiTuong(){
        if ( this.doituong === "Student"){
            return 'Học viên'
        } else if (this.doituong === "Employee"){
            return 'Nhân viên'
        } else {
            return 'Khách hàng'
        }
    }
}
export {Student}