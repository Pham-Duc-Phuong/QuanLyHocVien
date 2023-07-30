import Person from "../models/person.js";
import List from "../models/list.js";
import { Student } from "../models/student.js";
import { Customer } from "../models/customer.js";
import { Employee } from "../models/employee.js";

const getElement = (selector) => document.querySelector(selector)


let danhsach = new List


window.classStudent = () => {
    let sltClass = getElement('#slt-class').value
    let inpStudent = getElement('#inpStudent')
    let inpCustomer = getElement('#inpCustomer')
    let inpEmployee = getElement('#inpEmployee ')
    if (sltClass === "Student") {
        inpStudent.style.display = 'block'
        inpCustomer.style.display = 'none'
        inpEmployee.style.display = 'none'
    } else if (sltClass === 'Employee') {
        inpEmployee.style.display = 'block'
        inpStudent.style.display = 'none'
        inpCustomer.style.display = 'none'
    } else if (sltClass === 'Customer') {
        inpCustomer.style.display = 'block'
        inpStudent.style.display = 'none'
        inpEmployee.style.display = 'none'
    } else {
        inpCustomer.style.display = 'none'
        inpStudent.style.display = 'none'
        inpEmployee.style.display = 'none'
    }
}
const layThongTin = () => {
    let info = {}
    const element = document.querySelectorAll('.modal-body input , .modal-body select')
    element.forEach((a) => {
        const { name, value } = a
        info[name] = value
    })
    const { ID, name, diachi, email, doituong, toan, ly, hoa, dayWork, wageOnDay, firm, bill, rate } = info;
    // const person = new Person(ID, name, diachi, email, doituong)
    // const student = new Student(ID, name, diachi, email, doituong, toan, ly, hoa)
    // const employee = new Employee(ID, name, diachi, email, doituong,dayWork, wageOnDay)
    // const customer = new Customer(ID, name, diachi, email, doituong, firm, bill, rate)
    let sltClass = getElement('#slt-class').value
    if (sltClass === 'Student') {
        return new Student(ID, name, diachi, email, doituong, toan, ly, hoa)
    } else if (sltClass === 'Employee') {
        return new Employee(ID, name, diachi, email, doituong, dayWork, wageOnDay)
    } else if (sltClass === 'Customer') {
        return new Customer(ID, name, diachi, email, doituong, firm, bill, rate)
    }
}


getElement('#btnThemInfo').onclick = () => {
    let sltClass = getElement('#slt-class').value
    if (sltClass === 'Student') {
       renderStudent()
    } else if (sltClass === 'Employee') {
       renderEmployee()
    } else if (sltClass === 'Customer') {
        renderCustomer()
    }
    const info = layThongTin()
    danhsach.addPerson(info)
    setLocal()
}
const renderStudent = (arrList = danhsach.list) => {
    let contentHTML = ''
    arrList.forEach((a) => {
        contentHTML += `
            <tr>
                <td>${a.ID}</td>
                <td>${a.name}</td>
                <td>${a.diachi}</td>
                <td>${a.email}</td>
                <td>${a.doituong}</td>
                <td style="display: block">
                    Toán: ${a.toan} || Lý: ${a.ly} || Hóa: ${a.hoa} <br> ĐTB: ${Number((a.toan / 3 + a.ly / 3 + a.hoa / 3)).toLocaleString()}
                </td>
                <td>
                    <button class="btn btn-outline-info fw-bolder" data-toggle="modal" data-target="#exampleModal" onclick="editPerson(${a.ID})">Edit</button>
                    <button class="btn btn-outline-danger fw-bolder" onclick="deletePerson(${a.ID})">Detele</button>
                </td>
            </tr>
        `
    })
    getElement('#tbody').innerHTML = contentHTML
}
const renderEmployee = (arrList2 = danhsach.list) => {
    let contentHTML = ''
    arrList2.forEach((a) => {
        contentHTML += `
            <tr>
                <td>${a.ID}</td>
                <td>${a.name}</td>
                <td>${a.diachi}</td>
                <td>${a.email}</td>
                <td>${a.doituong}</td>                
                <td style="display: block">
                    Số ngày làm việc: ${a.dayWork} || Lương theo ngày: ${a.wageOnDay} <br> Tổng lương: ${Number(a.dayWork * a.wageOnDay).toLocaleString()}
                </td>
                <td>
                    <button class="btn btn-outline-info fw-bolder" data-toggle="modal" data-target="#exampleModal" onclick="editPerson(${a.ID})">Edit</button>
                    <button class="btn btn-outline-danger fw-bolder" onclick="deletePerson(${a.ID})">Detele</button>
                </td>
            </tr>
        `
    })
    getElement('#tbody').innerHTML = contentHTML
}
const renderCustomer = (arrList3 = danhsach.list) => {
    let contentHTML = ''
    arrList3.forEach((a) => {
        contentHTML += `
            <tr>
                <td>${a.ID}</td>
                <td>${a.name}</td>
                <td>${a.diachi}</td>
                <td>${a.email}</td>
                <td>${a.doituong}</td>
                <td style="display: block">
                    Tên công ty: ${a.firm} || Trị giá hóa đơn: ${a.bill} || Đánh giá: ${a.rate}
                </td>
                <td>
                    <button class="btn btn-outline-info fw-bolder" data-toggle="modal" data-target="#exampleModal" onclick="editPerson(${a.ID})">Edit</button>
                    <button class="btn btn-outline-danger fw-bolder" onclick="deletePerson(${a.ID})">Detele</button>
                </td>
            </tr>
        `
    })
    getElement('#tbody').innerHTML = contentHTML
}
const setLocal = () => {
    const tmp = JSON.stringify(danhsach.list)
    localStorage.setItem('tmp', tmp)
}
const getDataLocal = () => {
    const data = localStorage.getItem('tmp')
    const parsedata = JSON.parse(data)
    let arr = [];
    for (let i = 0; i < parsedata.length; i++) {
        let tmp = parsedata[i]
        if (tmp.doituong === 'Student') {
            var info = new Student(tmp.ID, tmp.name, tmp.diachi, tmp.email, tmp.doituong, tmp.toan, tmp.ly, tmp.hoa)
        } else if (tmp.doituong === 'Employee') {
            var info = new Employee(tmp.ID, tmp.name, tmp.diachi, tmp.email, tmp.doituong, tmp.dayWork, tmp.wageOnDay)
        } else if (tmp.doituong === 'Customer') {
            var info = new Customer(tmp.ID, tmp.name, tmp.diachi, tmp.email, tmp.doituong, tmp.firm, tmp.bill, tmp.rate)
        }
        arr.push(info)
    }
    danhsach.list = arr
    arr.forEach((a)=>{
        const {doituong} = a
        if(doituong === "Student") {
            renderStudent()
        } else if(doituong === "Customer"){
            renderCustomer
        } else if(doituong === "Employee"){
            renderEmployee()
        }
    })
}
getDataLocal()
window.deletaPerson = (A) => {
    person.deletePerson(A)
    renderPerson()
    setLocal()
}