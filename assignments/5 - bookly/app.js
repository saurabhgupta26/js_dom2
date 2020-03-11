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
    // event.preventDefault();
    ul.innerHTML= "";
    //console.log("newBook", entry);
    library.forEach(book => {
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
    deleteButton.addEventListener("click", (event) => deleteBook(library, event));
    li.appendChild(deleteButton);
    ul.append(li);
    });
}
// ** Book search ** //
function searchingBook(library, event) {
    //event.preventDefault();
    console.log(library.target);
    // console.log(library.book);
    var filteredBook = library.filter(word => {
        return word.book.name.toLowerCase().includes(event.target.value.toLowerCase());
        //console.log("newWord", word.book);
    });

    console.log(filteredBook);
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
function deleteBook(library, event) {
    if(event.target.tagName == 'BUTTON') {
        let del = event.target.dataset.id;
       // console.dir("character", del);
  //  console.dir(del)
  
        library = library.filter(x => x.id != del)
        console.log(library);
        //localStorage.clear();
        // for(let i =0; i < library.length; i++) {
        //     if(library[i].id == del) {
        //         library.splice(i,1);
        //         break;
        //     }
        //ul.innerHTML = "";
        // console.log(library1);
        localStorage.setItem('books', JSON.stringify(library))
        // debugger;
        // library.forEach(b => newBook(b));
        
        newBook(library);
        // debugger;
        console.log(newBook(library));
    }
}


btn.addEventListener("click", addBook);
search.addEventListener("keyup", (library, event) => searchingBook(library, event));
hideButton.addEventListener("click", (event) => hideAll(event));