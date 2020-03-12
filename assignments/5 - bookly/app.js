let ul = document.querySelector(".ul");
let btn = document.querySelector(".btn");
let inputText = document.querySelector(".input");
let search = document.querySelector(".book_search");
let hideButton = document.querySelector("#hide");

// inputText
// var library = [];
let library = JSON.parse(localStorage.getItem('books')) || []
//console.log(Array.isArray(library));
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
        library.forEach(book => {
        newBook(library);
        });
        // event.preventDefault();
}
}

function newBook(entry) {
     event.preventDefault();
    ul.innerHTML= "";
    //console.log("newBook", entry);
    entry.forEach(book => {
    let li = document.createElement("li")
    let deleteButton = document.createElement("button");
    // for(key of entry) {
    // console.log(key.id);
    // }
    deleteButton.setAttribute("data-id", book.id);
    //console.log(book.id);
    deleteButton.classList.add("delete");
    deleteButton.innerText = "Delete";
    li.innerText = book.name;
    //book.name = "";
    deleteButton.addEventListener("click",deleteBook);
    li.appendChild(deleteButton);
    ul.append(li);
    });
}
// ** Book search ** //
function searchingBook(event) {
    //event.preventDefault();
    console.log((event.target.value).toLowerCase());
    //console.dir(event.target.value);
    //console.log(library.target);
    // console.log(library.book);
    var filteredBook = library.filter(word => ((word.name).toLowerCase()).includes((event.target.value).toLowerCase()));
    console.log(filteredBook);
    newBook(filteredBook);

    //console.log(filteredBook);
    // newBook(filteredBook);
}



// ** hide all ** 
function hideAll(event) {
    if(event.target.checked){
   // console.log(library);
    for(key of ul.children) {
        //console.log(key)
        key.style.display = "none";
    }
       // singleBook => singleBook.style.display = none);
    //ul.children
    }
    else {
        for(key of ul.children) {
            key.style.display = "block";
        }
    }

}
//** delete button **
function deleteBook(event) {
    
    if(event.target.tagName == 'BUTTON') {
        let del = event.target.dataset.id;
        library = library.filter(x => x.id != del)
        // console.dir("character", del);
        //  console.dir(del)
  
        //    console.log(library);
        //localStorage.clear();
        // for(let i =0; i < library.length; i++) {
        //     if(library[i].id == del) {
        //         library.splice(i,1);
        //         break;
        //     }
        //ul.innerHTML = "";
        // console.log(library1);
        //localStorage.clear();
        localStorage.setItem('books', JSON.stringify(library));
        // debugger;
        // library.forEach(b => newBook(b));
        
         newBook(library);
        // debugger;
    //    console.log(newBook(library));
    }
}


btn.addEventListener("click", addBook);
search.addEventListener("keyup", searchingBook);
hideButton.addEventListener("click", hideAll);