import Person from "./person.js";
class Employee extends Person{
    constructor(ID, name, diachi, email, doituong, dayWork, wageOnDay){
        super(ID, name, diachi, email, doituong)
        this.dayWork = dayWork
        this.wageOnDay = wageOnDay 
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
export {Employee}