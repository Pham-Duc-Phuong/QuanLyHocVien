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
    const info = layThongTin()
    danhsach.addPerson(info)
    renderPerson()
    setLocal()
}

getElement('#btnThemDoiTuong').onclick = () => {
    getElement('#btnCapNhat').style.display = "none"
    getElement('#btnThemInfo').style.display = "inline-block"
}

const renderPerson = (arrList = danhsach.list) => {
    let contentHTML = ''
    arrList.forEach((a) => {
        if (a.doituong === "Student") {
            contentHTML += `
            <tr>
                <td>${a.ID}</td>
                <td>${a.name}</td>
                <td>${a.diachi}</td>
                <td>${a.email}</td>
                <td name="doituong">${a.doituong}</td>
                <td>
                    Toán: ${a.toan} <br> Lý: ${a.ly} <br> Hóa: ${a.hoa} <br> ĐTB: ${Number((a.toan / 3 + a.ly / 3 + a.hoa / 3)).toLocaleString()}
                </td>
                <td>
                    <button class="btn btn-outline-info fw-bolder" data-toggle="modal" data-target="#exampleModal" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="editPerson(${a.ID})">Edit</button>
                    <button class="btn btn-outline-danger fw-bolder" onclick="deleteID(${a.ID})">Detele</button>
                </td>
            </tr>
        `
        } else if (a.doituong === "Employee") {
            contentHTML += `
            <tr>
                <td>${a.ID}</td>
                <td>${a.name}</td>
                <td>${a.diachi}</td>
                <td>${a.email}</td>
                <td name="doituong">${a.doituong}</td>                
                <td>
                    Số ngày làm việc: ${a.dayWork} <br> Lương theo ngày: ${a.wageOnDay} <br> Tổng lương: ${Number(a.dayWork * a.wageOnDay).toLocaleString()}
                </td>
                <td>
                    <button class="btn btn-outline-info fw-bolder" data-toggle="modal" data-target="#exampleModal" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="editPerson(${a.ID})">Edit</button>
                    <button class="btn btn-outline-danger fw-bolder" onclick="deleteID(${a.ID})">Detele</button>
                </td>
            </tr>
        `
        } else if (a.doituong === "Customer") {
            contentHTML += `
            <tr>
                <td>${a.ID}</td>
                <td>${a.name}</td>
                <td>${a.diachi}</td>
                <td>${a.email}</td>
                <td name="doituong">${a.doituong}</td>
                <td>
                    Tên công ty: ${a.firm} <br> Trị giá hóa đơn: ${a.bill} <br> Đánh giá: ${a.rate}
                </td>
                <td>
                    <button class="btn btn-outline-info fw-bolder" data-toggle="modal" data-target="#exampleModal" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="editPerson(${a.ID})">Edit</button>
                    <button class="btn btn-outline-danger fw-bolder" onclick="deleteID(${a.ID})">Detele</button>
                </td>
            </tr>
        `
        }
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
    renderPerson()
}
getDataLocal()


window.deleteID = (A) => {
    console.log('A', A)
    danhsach.deletePerson(A)
    renderPerson()
    setLocal()
}
window.editPerson = (B) => {
    getElement('#btnCapNhat').style.display = "inline-block"
    getElement('#btnThemInfo').style.display = "none"
    const element = document.querySelectorAll('.modal-body input , .modal-body select')
    console.log(danhsach.list);
    //     element.forEach((a) => {
    //         const {name} =a
    //         a.value = danhsach.list[]
    // })
}
getElement('#name').onclick = () => {
    danhsach.list.sort((a, b) => {
        a = a.name.toLowerCase()
        b = b.name.toLowerCase()
        if (a < b) {
            return -1
        }
        if (a > b) {
            return 1
        }
        return 0
    })
    console.log('danhsach', danhsach.list)
    renderPerson()
    setLocal()
}
getElement('#idSort').onclick = () => {
    danhsach.list.sort((a, b) => {
        a = a.ID.toLowerCase()
        b = b.ID.toLowerCase()
        if (a < b) {
            return -1
        }
        if (a > b) {
            return 1
        }
        return 0
    })
    console.log('danhsach', danhsach.list)
    renderPerson()
    setLocal()
}
window.filterDoiTuong = () => {
    const filterStudent = danhsach.list.filter((filterList)=>{
        let filterDoiTuong = getElement('#filterDoiTuong').value
        if (filterDoiTuong === "Student"){
           return filterList.doituong === "Student"
        } else if (filterDoiTuong === "Employee"){
            return filterList.doituong === "Employee"
        } else if (filterDoiTuong === "Customer"){
            return filterList.doituong === "Customer"
        } else {
            return filterList
        }
    })
    renderPerson(filterStudent)
}