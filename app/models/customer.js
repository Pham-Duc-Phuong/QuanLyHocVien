import Person from "./person.js";
class Customer extends Person{
    constructor(psID, name, diachi, email, doituong, firm, bill, rate){
        super(psID, name, diachi, email, doituong)
        this.firm = firm
        this.bill = bill
        this.rate = rate
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
export {Customer}