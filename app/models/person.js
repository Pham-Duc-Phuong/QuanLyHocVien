class Person{
    constructor(psID, name, diachi, email, doituong){
        this.psID= psID
        this.name= name
        this.diachi= diachi
        this.email= email
        this.doituong = doituong
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
export default Person