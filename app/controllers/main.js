import Person from "../models/person.js";
import List from "../models/list.js";
import { Student } from "../models/student.js";
import { Customer } from "../models/customer.js";
import { Employee } from "../models/employee.js";
import { DOMAIN } from "../constants/API.js";

const getElement = (selector) => document.querySelector(selector)

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
const getInfoAPI = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET',
    })
    promise
        .then((result) => {
            renderPerson(result.data)
        })
        .catch((err) => {
            console.log('err', err)
        })
}

getInfoAPI()

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

const renderPerson = (arrList) => {
    let contentHTML = ''
    arrList.forEach((a) => {
        // contentHTML += `
        //     <tr>
        //         <td>${a.psID}</td>
        //         <td>${a.name}</td>
        //         <td>${a.diachi}</td>
        //         <td>${a.email}</td>
        //         <td name="doituong">${a.doituong}</td>
        //         <td>
        //            ${a.thuoctinh}
        //         </td>
        //         <td>
        //             <button class="btn btn-outline-info fw-bolder" data-toggle="modal" data-target="#exampleModal" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="editPerson(${a.id})">Edit</button>
        //             <button class="btn btn-outline-danger fw-bolder" onclick="deleteID(${a.id})">Detele</button>
        //         </td>
        //     </tr>
        // `
     if (a.doituong === "Student") {
            contentHTML += `
            <tr>
                <td>${a.psID}</td>
                <td>${a.name}</td>
                <td>${a.diachi}</td>
                <td>${a.email}</td>
                <td name="doituong">${a.doituong}</td>
                <td>
                    Toán: ${a.toan} <br> Lý: ${a.ly} <br> Hóa: ${a.hoa} <br> ĐTB: ${Number((a.toan / 3 + a.ly / 3 + a.hoa / 3)).toLocaleString()}
                </td>
                <td>
                    <button class="btn btn-outline-info fw-bolder" data-toggle="modal" data-target="#exampleModal" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="editPerson(${a.id})">Edit</button>
                    <button class="btn btn-outline-danger fw-bolder" onclick="deleteID(${a.id})">Detele</button>
                </td>
            </tr>
        `
     } else if (a.doituong === "Employee") {
            contentHTML += `
            <tr>
                <td>${a.psID}</td>
                <td>${a.name}</td>
                <td>${a.diachi}</td>
                <td>${a.email}</td>
                <td name="doituong">${a.doituong}</td>                
                <td>
                    Số ngày làm việc: ${a.dayWork} <br> Lương theo ngày: ${a.wageOnDay} <br> Tổng lương: ${Number(a.dayWork * a.wageOnDay).toLocaleString()}
                </td>
                <td>
                    <button class="btn btn-outline-info fw-bolder" data-toggle="modal" data-target="#exampleModal" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="editPerson(${a.id})">Edit</button>
                    <button class="btn btn-outline-danger fw-bolder" onclick="deleteID(${a.id})">Detele</button>
                </td>
            </tr>
        `
     } else if (a.doituong === "Customer") {
            contentHTML += `
            <tr>
                <td>${a.psID}</td>
                <td>${a.name}</td>
                <td>${a.diachi}</td>
                <td>${a.email}</td>
                <td name="doituong">${a.doituong}</td>
                <td>
                    Tên công ty: ${a.firm} <br> Trị giá hóa đơn: ${a.bill} <br> Đánh giá: ${a.rate}
                </td>
                <td>
                    <button class="btn btn-outline-info fw-bolder" data-toggle="modal" data-target="#exampleModal" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="editPerson(${a.id})">Edit</button>
                    <button class="btn btn-outline-danger fw-bolder" onclick="deleteID(${a.id})">Detele</button>
                </td>
            </tr>
        `
     }
    })
    getElement('#tbody').innerHTML = contentHTML
}

getElement('#btnThemInfo').onclick = () => {
    const info = layThongTin()
    const promise = axios({
        url: DOMAIN,
        method: 'POST',
        data: info
    })
    promise
        .then(() => {
            getInfoAPI()
        }).catch((err) => {
            console.log('err', err)
        })
}

getElement('#btnThemDoiTuong').onclick = () => {
    getElement('#btnCapNhat').style.display = "none"
    getElement('#btnThemInfo').style.display = "inline-block"
}


// **** Không thể lấy lại được thông tin từ LocalStogae ****

// const setLocal = () => {
//     const tmp = JSON.stringify(danhsach.list)
//     localStorage.setItem('tmp', tmp)
// }
// const getDataLocal = () => {
//     const data = localStorage.getItem('tmp')
//     const parsedata = JSON.parse(data)
//     let arr = [];
//     for (let i = 0; i < parsedata.length; i++) {
//         let tmp = parsedata[i]
//         if (tmp.doituong === 'Student') {
//             var info = new Student(tmp.ID, tmp.name, tmp.diachi, tmp.email, tmp.doituong, tmp.toan, tmp.ly, tmp.hoa)
//         } else if (tmp.doituong === 'Employee') {
//             var info = new Employee(tmp.ID, tmp.name, tmp.diachi, tmp.email, tmp.doituong, tmp.dayWork, tmp.wageOnDay)
//         } else if (tmp.doituong === 'Customer') {
//             var info = new Customer(tmp.ID, tmp.name, tmp.diachi, tmp.email, tmp.doituong, tmp.firm, tmp.bill, tmp.rate)
//         }
//         arr.push(info)
//     }
//     danhsach.list = arr
//     renderPerson()
// }
// getDataLocal()


window.deleteID = (id) => {
    console.log('id', id)
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'DELETE',
    })
    promise
        .then((result) => {
            getInfoAPI()
        })
        .catch((err) => {
            console.log('err', err)
        })
}
window.editPerson = (id) => {
    console.log('id', id)
    getElement('#btnCapNhat').style.display = "inline-block"
    getElement('#btnThemInfo').style.display = "none"
    document.querySelector('#btnCapNhat').setAttribute('data-id', id)
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'GET',
    })
    promise
        .then((result) => {
            const element = document.querySelectorAll('.modal-body input , .modal-body select')
            element.forEach((ele) => {
                const { name } = ele
                ele.value = result.data[name]
            })
        })
        .catch((err) => {
            console.log('err', err)
        })

}
getElement('#btnCapNhat').onclick = () => {
    const info = layThongTin()
    const id = document.querySelector('#btnCapNhat').getAttribute('data-id')
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'PUT',
        data: info
    })
    promise
        .then((result) => {
            getInfoAPI()
            document.querySelector('#btnCapNhat').toggleAttribute('data-id', false)
        })
        .catch((err) => {
            console.log('err', err)
        })
}

getElement('#name').onclick = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET',
    })
    promise
        .then((result) => { 
            result.data.sort((a, b) => {
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
            renderPerson(result.data)
        })
        .catch((err) => {
            console.log('err', err)
        })
}

getElement('#idSort').onclick = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET',
    })
    promise
        .then((result) => { 
            result.data.sort((a, b) => {
                a = a.psID.toLowerCase()
                b = b.psID.toLowerCase()
                if (a < b) {
                    return -1
                }
                if (a > b) {
                    return 1
                }
                return 0
            })
            renderPerson(result.data)
        })
        .catch((err) => {
            console.log('err', err)
        })
}

window.filterDoiTuong = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET',
    })
    promise
    .then((result)=>{
        const filterStudent = result.data.filter((filterList) => {
            let filterDoiTuong = getElement('#filterDoiTuong').value
            if (filterDoiTuong === "Student") {
                return filterList.doituong === "Student"
            } else if (filterDoiTuong === "Employee") {
                return filterList.doituong === "Employee"
            } else if (filterDoiTuong === "Customer") {
                return filterList.doituong === "Customer"
            } else {
                return filterList
            }
        })
        renderPerson(filterStudent)

    })
    .catch((err) => {
        console.log('err', err)
    })
}