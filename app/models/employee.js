import Person from "./person.js";
class Employee extends Person{
    constructor(ID, name, diachi, email, doituong, dayWork, wageOnDay){
        super(ID, name, diachi, email, doituong)
        this.dayWork = dayWork
        this.wageOnDay = wageOnDay 
    }
   
}
export {Employee}