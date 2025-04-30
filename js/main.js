const img = document.getElementById("mainImg");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const slideShowBtn = document.getElementById("slideShowBtn");
const stopBtn = document.getElementById("stopBtn");
const images = ["img1.jpg", "img2.jpeg", "img4.jpeg"];
let current = 0;

nextBtn.onclick = function () {
    if (current < images.length - 1) {
        current++;
    } else {
        current = 0
    }

    img.src = `images/${images[current]}`;
}

prevBtn.onclick = function () {
    if (current > 0) {
        current--;
    } else {
        current = images.length - 1;
    }
    img.src = `images/${images[current]}`;
}

let interval;
function intervalSlideShow() {
    interval = setInterval(() => {
        if (current < images.length - 1) {
            current++;
        } else {
            current = 0
        }
        img.src = `images/${images[current]}`;
    }, 1000)
}

slideShowBtn.addEventListener("click", intervalSlideShow)

stopBtn.onclick = function () {
    clearInterval(interval);
}


const form = document.getElementById("form");

form.addEventListener("submit", handelSubmit)

function handelSubmit(e) {
    e.preventDefault();
    let stNameFlag = checkStName();
    let stGradeFlag = checkStGrade();
    let stDepartmentFlag = checkDepartment();

    if (stNameFlag && stGradeFlag && stDepartmentFlag) {
        insertDataToTable();
    }
}


const stName = document.getElementById("stName");
stName.addEventListener("input", checkStName);


function checkStName() {
    const errorStNameElement = document.querySelector(".stNameError");
    if (stName.value) {
        errorStNameElement.style.display = "none";
        return true;
    } else {
        errorStNameElement.style.display = "block";
        return false;
    }
}

const stGrade = document.getElementById("stGrade");
stGrade.addEventListener("input", checkStGrade);


function checkStGrade() {
    let grade = parseInt(stGrade.value);
    const errorStGradeElement = document.querySelector(".stGradeError");
    if (!isNaN(grade) && grade >= 0 && grade <= 100 && grade) {
        errorStGradeElement.style.display = "none";
        return true;
    } else {
        errorStGradeElement.style.display = "block";
        return false;
    }
}


const radioInput = document.querySelectorAll("input[type = 'radio']");
let selectedDept = null;
function checkDepartment() {
    for (let i = 0; i < radioInput.length; i++) {
        if (radioInput[i].checked) {
            selectedDept = radioInput[i].value;
            return true;
        }
    }
    return false;
}

const tableBody = document.getElementById("tableBody");
const addBtn = document.getElementById("addBtn");

let rowId = -1;

let tableData = [];
function insertDataToTable() {
    let tr = document.createElement('tr');
    tr.appendChild(insertStName())
    tr.appendChild(insertStGrade());
    tr.appendChild(insertDepartment());
    tr.appendChild(insertOption());
    tableBody.appendChild(tr);
    rowId++;
    let student = {
        name: stName.value,
        grade: parseInt(stGrade.value),
        department: selectedDept
    }
    tableData.push(student);
}


function insertStName() {
    let td = document.createElement("td");
    td.innerText = stName.value;
    return td;
}


function insertStGrade() {
    let td = document.createElement("td");
    td.innerText = parseInt(stGrade.value);
    return td;
}

function insertDepartment() {
    let td = document.createElement("td");
    td.innerText = selectedDept;
    return td;
}

function insertOption() {
    let td = document.createElement("td");
    td.innerHTML = "<button id = 'deleteBtn'> delete </button>";
    td.addEventListener('click', handleDelete)
    return td;
}

function handleDelete() {
    tableBody.removeChild(tableBody.children[rowId]);
    rowId--;
}


const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", function () {
    if (this.value == 'name') {
        sortByName();
    }
})

function sortByName() {
    tableData.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0
    })
    console.log(tableData)
    renderTable()
}

function renderTable() {
    tableBody.innerHTML = '';
    let htmlContent = '';

    tableData.forEach(student => {
        htmlContent += `
           <tr>
               <td>${student.name}</td>
               <td>${student.grade}</td>
               <td>${student.department}</td>
               <td>
                   <button id="deleteBtn">delete</button>
               </td>
           </tr>
       `;
    });
    tableBody.innerHTML = htmlContent;
    document.querySelectorAll('#deleteBtn').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });
}
