class Person{
    constructor(ID, name, diachi, email, doituong){
        this.ID= ID
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