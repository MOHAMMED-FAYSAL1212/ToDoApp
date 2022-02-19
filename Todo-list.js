// "onkeyup" is a eventlisener

// First e localStorage e data save korte hobe.
// Then, localStorage e save kora data UI/display te show korabo.

// First e localStorage teke specific data delete korbo/sob gula data aksate delete kore dibo, Then localStorage ta ke update krobo
// Then According to localStorage UI o update hoia jabe.
 
let inputBox = document.getElementById("addindex")
let addBtn = document.querySelector(".inputfild button")
const todoList = document.querySelector(".todoList")
const allDel = document.querySelector(".footer button")
const complete = document.querySelector(".complete")
const comAllDel = document.querySelector(".footer1 button")


// add button ke functionality korte hove jate blank li create na hoi.
// The onkeyup event occours when the user releases a key(on the keyboard.)
inputBox.onkeyup = ()=>{
    let userData = inputBox.value   // getting user entered value.
    if(userData.trim() != 0){  //value to r minus(-) e nambe na, 0 teke soro hobe. So, !=0 means 0 teke boro value.// user values teke 1st e trim() method dia space bad dilam. And userData not equal to zero.
        addBtn.classList.add("active") // active the add button
    }else{
        addBtn.classList.remove("active") // unactive the add button
    }
}

showtasks() // calling showtask function. so that task don't remove from UI after refreshing...

// Local storage e data save rakar jonno function
addBtn.onclick = ()=>{
   
        let userData = inputBox.value 
        let getLocalstorage = localStorage.getItem("New Todo") //getting the key from the Localstorage.
        if(getLocalstorage == null){ // if localstorage is null
            listArr = []  // create a blank array
        }
        else{
            listArr = JSON.parse(getLocalstorage)  // transforming json string into a js object.
        }
        listArr.push(userData)// pushing or adding user Data.
        localStorage.setItem("New Todo", JSON.stringify(listArr))//data push korar por set korte hobe.//transforming js object into a json string. local storage e rakte hole JSON(string) formate e rakte hove.
        showtasks() // calling showtask function // showtasks() function ta call na korle local storagte e data save hove but sai data display/UI te show korbe na.
        addBtn.classList.remove("active")
    }

   
// function to add task list inside ul and shwo in UI/display.
function showtasks(){
    // listArr er modde data show korar bepar ta aikane dorker nai. aikane kaj hocce, localStorage e je data gula save kora ace ta UI e show korano.
    let getLocalstorage = localStorage.getItem("New Todo")  // getting Localstorage  

    if(getLocalstorage == null){ // if localstorage is null
        listArr = []  // create a blank array
    }
    else{
        listArr = JSON.parse(getLocalstorage)  // transforming json string into a js object.
    }

    const pendingNum = document.querySelector(".pendingNum")
    pendingNum.textContent = listArr.length // passing the length value in pendingNum

    if(listArr.length > 0){ // if array length is greater than 0
        allDel.classList.add("active") //active the clearall button
    }
    else{
        allDel.classList.remove("active") //unactive the clearall button
    }

    let newLiTag = ''
    // jeheto array teke value anbo, so array teke value anar easy way holo forEach Loop.
    listArr.forEach((element, index)=> {
        newLiTag +=`<li>${element} <button onclick = "editTask(${index})"><i class="far fa-edit"></i></button> <a onclick ="check(${index})"><i class="far fa-check-square"></i></a> <span onclick = "deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
    })

    todoList.innerHTML = newLiTag  // adding new li tag inside ul tag
    inputBox.value = "" // once task added leave the input field blank
     
}


// delete Task function.
function deleteTask(index){
    if(confirm("Are you sure want to delete?")){
        let getLocalstorage = localStorage.getItem("New Todo")
        let listArr = JSON.parse(getLocalstorage) // delete korbe localStorage er array teke.
        listArr.splice(index, 1) // delete or remove particular indexe. 1 kore delete hobe.
        
        // after removing the li again update teh local storage.
        localStorage.setItem("New Todo", JSON.stringify(listArr)) // transforming js object into a json string
        showtasks() // calling showtask function for updating the UI after deleting data from localStorage Array.
    }
}


// delete all task function...
allDel.onclick = ()=>{
    listArr = [] // empty an array.
   
    // after delete all task again update the local storage...
    localStorage.setItem("New Todo", JSON.stringify(listArr)) // transforming js object into a json string
    showtasks() // calling showtask function for updating the UI after deleting data from localStorage Array.
}


// edit task function.
// je li ta ke edit korbo se li er value ta input box e cole jave edit icon e clck korar sate sate.
function editTask(index){ // that means index number ta inputbox e pass korbe je. I mean according to index number li er value ta input box e jave.
    let saveIndex = document.getElementById("saveindex")
    let addTask = document.getElementById("addTask")
    let saveTask = document.getElementById("saveTask")
    saveIndex.value = index
    let getLocalstorage = localStorage.getItem("New Todo")  // getting Localstorage  
    let listArr = JSON.parse(getLocalstorage)
    inputBox.value = listArr[index] // input box e according to local storages index, local storage teke value ta asbe.
    addTask.style.display ="none"
    saveTask.style.display = "block"
} // ato tok porjonto holo kono akta li ke edit korar jonn input box e return nibo.

// save edited task...
let saveTask = document.getElementById("saveTask")
saveTask.addEventListener("click", function(){
    let addTask = document.getElementById("addTask") 
    const notification = document.querySelector(".notification")   
    let getLocalstorage = localStorage.getItem("New Todo")  // getting Localstorage  
    let listArr = JSON.parse(getLocalstorage)
    let saveIndex = document.getElementById("saveindex").value
    listArr[saveIndex] = inputBox.value
    saveTask.style.display = "none"
    addTask.style.display ="block"
    // notification.style.display = "block"

    localStorage.setItem("New Todo", JSON.stringify(listArr)) // local storage e save hoia jave edit korar por.But display te show korbe na.
    inputBox.value = ''
    showtasks() // akn display te show korbe.
    addBtn.classList.remove("active")
})

comtasks() 


// function check
function check(index){
    let getLocalstorage = localStorage.getItem("New Todo")
    let listArr = JSON.parse(getLocalstorage)
    let Com = listArr.splice(index, 1)// delete or remove particular indexed li // Com akta array.
    // after removing the li again update the local storage.
    localStorage.setItem("New Todo", JSON.stringify(listArr)) // transforming js object into a json string
    showtasks() // calling showtask function
    
    Com.forEach(pro =>{
        comArr.push(pro)
    }) 

    localStorage.setItem("com Task", JSON.stringify(comArr))   //transforming js object into a json string. local storage e rakte hole JSON(string) formate e rakte hove.
    // calling showtask function // call na korle local storagte e save hove but display te show korbe na.
    comtasks()
}


function comtasks(){
    let completestorage = localStorage.getItem("com Task")  // getting Localstorage  

    if(completestorage == null){ // if localstorage is null
        comArr = []  // create a blank array
    }
    else{
        comArr = JSON.parse(completestorage)  // transforming json string into a js object.
    }

    const completeNum = document.querySelector(".completedNum")
    completeNum.textContent = comArr.length // passing the length value in pendingNum

    if(comArr.length > 0){ // if array length is greater than 0
        comAllDel.classList.add("active") //active the clearall button
    }
    else{
        comAllDel.classList.remove("active") //unactive the clearall button
    }
    let comLiTag = ''
    comArr.forEach((element, index)=> {
        comLiTag += `<li>${element} <span onclick = "comDeleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
        
    })
    complete.innerHTML = comLiTag  // adding new li tag inside ul tag
    
        
}

function comDeleteTask(index){
    if(confirm("Are you sure want to delete?")){
        let completestorage = localStorage.getItem("com Task")
        let comArr = JSON.parse(completestorage)
        comArr.splice(index, 1) // delete or remove particular indexed li
        
        // after removing the li again update teh local storage.
        localStorage.setItem("com Task", JSON.stringify(comArr)) // transforming js object into a json string
        comtasks() // calling showtask function
    }
}


comAllDel.onclick = ()=>{
    comArr = [] // empty an array.
    
    // after delete all task again update the local storage...
    localStorage.setItem("com Task", JSON.stringify(comArr))//transforming js object into a json string. local storage e rakte hole JSON(string) formate e rakte hove.
    // calling showtask function // call na korle local storagte e save hove but display te show korbe na.
    comtasks()
}