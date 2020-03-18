let inputLi = document.querySelector(".inputText");
let ul = document.querySelector("ul");
let footer = document.querySelector(".footer");
let remaining = document.querySelector(".remainingList");
let footerUl = document.querySelector(".footerUl");
let clearBtn = document.querySelector(".clearBtn");
let activeList = document.querySelector(".activeList");
let completedList = document.querySelector(".completedList");
let totalList = document.querySelector(".totalList");
//let checkB = document.querySelectorAll("input[checkbox]")
let downBtn = document.querySelector(".downBtn");
// resultList = [];
// main list **
var resultList = JSON.parse(localStorage.getItem('result')) || [];

function downButton(resultList, event) {
    let newResult = resultList.filter(task => !(task.isDone));
    if(newResult.length > 0) {
        newResult.forEach(newTask => {
            newTask.isDone = true;
            localStorage.setItem('result', JSON.stringify(resultList));
        })
    }
     else {
        resultList.forEach(newTask => {
        newTask.isDone = false;
        localStorage.setItem('result', JSON.stringify(resultList));
    })
    }
        

   // newResult.forEach(newTask => {

        // if(newResult.length == 0) {
        //     newTask.isDone = !newTask.isDone;
        //     localStorage.setItem('result', JSON.stringify(resultList));
        // }
        // else {
        //     newTask.isDone = false;
        //     localStorage.setItem('result', JSON.stringify(resultList));
        // }
    // })
    console.log(resultList,'result')
    //localStorage.setItem('result', JSON.stringify(resultList));
    generateLi(resultList);
    window.location.reload();
    //generateLi(s);
}



function checkboxTick(resultList, event) {
    let uid = event.target.dataset.id;
    for (let i= 0; i<resultList.length; i++) {
        if(resultList[i].id == uid) {
            resultList[i].isDone = !(resultList[i].isDone);
         //   console.log(resultList[i]);
            if(resultList[i].isDone) {
            event.target.parentNode.children[1].classList.add("strike");
            remainingLi(resultList);
            }
            else {
                event.target.parentNode.children[1].classList.remove("strike");
                remainingLi(resultList);
            }
            localStorage.setItem('result', JSON.stringify(resultList))
        }
    }
    //event.isDone.target = !(event.isDone.target);
   // console.log(event.isDone.target);
}

// ** double click event ** //
// function edit (resultList, event) {
//     if(event.target.tagName = 'p');
//     let newEdit = "";
//     let editItem = event.target;
//     if
    

// }





// delete List Item
function deleteLi(resultList, event) {
    let deleteItem = event.target.dataset.id;
   // console.log(uid);
    for (let i= 0; i<resultList.length; i++) {
       // console.log(i);
        if(resultList[i].id == deleteItem) {
            resultList.splice(i,1);
            remainingLi(resultList);
           // console.log(resultList);
            break;
        }
}
ul.innerHTML = "";
localStorage.setItem('result', JSON.stringify(resultList))
resultList.forEach(elem => generateLi(elem));
}
// remaining list
function remainingLi(resultList) {
    let remain = resultList.filter( e => e.isDone == false).length;
    remaining.innerHTML = `${remain} items left`
    // remain;
    
    // let remain = 0;
    // for(let i= 0; i<resultList.length; i++){
    // //console.log(remain);
    // if(resultList[i].isDone === true){
    //     remain += 1;
    //     console.log(remain);
    // }

    // remaining.innerText = remain;
}
// footer

function active(resultList, event) {
    //let checkB = document.querySelector("input[type=checkbox]")
    ul.innerHTML = "";
    let activeLi = [];
    completedList.classList.remove("active");
    totalList.classList.remove("active")
    activeList.classList.add("active");
    activeLi = resultList.filter( e => e.isDone == false);
    activeLi.forEach(y => generateLi(y));
    // checkB.addEventListener("click", function arrLi(y) {
    //     activeLi = resultList.filter( e => e.isDone == false);
    //     activeLi.forEach(y => generateLi(y));
    // })
    

    // active(resultList, event);
}

function completed(resultList, event) {
    ul.innerHTML = "";
    completedList.classList.add("active");
    totalList.classList.remove("active")
    activeList.classList.remove("active");
    let completeLi = [];
    completeLi = resultList.filter(ele => ele.isDone == true);
    completeLi.forEach(z => generateLi(z));
}


function total(resultList, event) {
    ul.innerHTML="";
    completedList.classList.remove("active");
    totalList.classList.add("active")
    activeList.classList.remove("active");
    resultList.map(elem => generateLi(elem));
}


function clear(resultList, event) {
    ul.innerHTML = "";
    // let clearLi = [];
    
    resultList = resultList.filter(ele => !(ele.isDone == true));
    // console.dir(resultList);
    localStorage.clear();
    //console.log(localStorage);
    localStorage.setItem('result', JSON.stringify(resultList));
   // console.log(resultList);
    window.location.reload();
    // clearLi.forEach((s) => {
    //     clearLi.splice(s,clearLi.length);
    //     generateLi(resultList);
    //     remainingLi(clearLi);
    //     console.log(clearLi);
    // });
    resultList.forEach(e => generateLi(e));
    //generateLi(resultList);
}


// ** ** Start of the program  **  **


function listItem(keyCode) {
    if (event.keyCode === 13 && event.target.value.trim()) {
        resultList.push({
            task : event.target.value,
            isDone : false,
            id : Date.now()
        })
    event.target.value = "";
   // console.log(resultList);
    ul.innerHTML = "";
    localStorage.clear();
    localStorage.setItem('result', JSON.stringify(resultList));
    resultList.forEach(elem => generateLi(elem));

    }
}

// generateLi();

function generateLi(todo) {
    let li = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isDone;
    checkbox.setAttribute("data-id" , todo.id);
    let p = document.createElement("p");
    p.innerText = todo.task;
    let del = document.createElement("span");
    del.setAttribute("data-id", todo.id);
    del.innerText = "X";
    remainingLi(resultList, event);
    if(checkbox.checked) {
        p.classList.add("strike");
    }
    li.append(checkbox, p, del);
    ul.append(li);
    activeList.addEventListener("click", () => active(resultList,event));
    checkbox.addEventListener("click", () => checkboxTick(resultList, event))
    del.addEventListener("click", () => deleteLi(resultList, event))
    completedList.addEventListener("click", () => completed(resultList, event));
    totalList.addEventListener("click", () => total(resultList, event));
    clearBtn.addEventListener("click", () => clear(resultList, event));
    downBtn.addEventListener("click", () => downButton(resultList, event));
    li.addEventListener("dblclick", () => edit(resultList, event));
    //remaining.addEventListener("click", () => remainingLi(resultList, event))
}

inputLi.addEventListener("keyup", listItem);
document.body.append(ul);
document.body.append(footer);
//resultList.forEach(elem => generateLi(elem));