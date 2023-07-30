import Person from "./person.js";
class Customer extends Person{
    constructor(ID, name, diachi, email, doituong, firm, bill, rate){
        super(ID, name, diachi, email, doituong)
        this.firm = firm
        this.bill = bill
        this.rate = rate
    }
    
}
export {Customer}