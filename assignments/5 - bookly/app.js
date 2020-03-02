let ul = document.querySelector(".ul");
let btn = document.querySelector(".btn");
let inputText = document.querySelector(".input");

// inputText
// var library = [];
library = JSON.parse(localStorage.getItem('books')) || []
// ** add book**
function addBook(event) {    
    event.preventDefault();
        if (inputText.value.trim() != "") {
            var book = {
                name : inputText.value,
                id : Date.now()
            }
        library.push(book);
 //      console.log(event.target.value)
       // event.target.value = "";
        inputText.value = "";
        localStorage.setItem('books', JSON.stringify(library))
        console.log(library);
        newBook(library);
        }
        // event.preventDefault();
}
//** delete button **
function deleteBook(library, entry) {
    console.log(entry);
    let del = entry.target.dataset.id;
   // console.log(del)
    let library1 = library.filter(x => x.id != del);
    // for(let i =0; i < library.length; i++) {
    //     if(library[i].id == del) {
    //         library.splice(i,1);
    //         break;
    //     }
    ul.innerHTML = "";
   // console.log(library1);
    localStorage.setItem('books', JSON.stringify(library))
    // library.forEach(b => newBook(b));
    newBook(library1);
}


function newBook(entry) {
    // event.preventDefault();
    ul.innerHTML= "";
    library.forEach(book => {
    let li = document.createElement("li")
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("data-id", entry.id);
    deleteButton.classList.add("delete");
    deleteButton.innerText = "Delete";
    li.innerText = book.name;
    //book.name = "";
    deleteButton.addEventListener("click", () => deleteBook(library, entry));
    ul.append(li, deleteButton);
    });
}
btn.addEventListener("click", addBook);