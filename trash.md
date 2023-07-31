const renderEmployee = (arrList = danhsach.list) => {
    let contentHTML = ''
    arrList.forEach((a) => {
        contentHTML += `
            <tr>
                <td>${a.ID}</td>
                <td>${a.name}</td>
                <td>${a.diachi}</td>
                <td>${a.email}</td>
                <td>${a.doituong}</td>                
                <td>
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
const renderCustomer = (arrList = danhsach.list) => {
    let contentHTML = ''
    arrList.forEach((a) => {
        contentHTML += `
            <tr>
                <td>${a.ID}</td>
                <td>${a.name}</td>
                <td>${a.diachi}</td>
                <td>${a.email}</td>
                <td>${a.doituong}</td>
                <td>
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