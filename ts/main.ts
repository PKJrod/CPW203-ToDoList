// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#date-acquired");
picker.setMin(new Date()); // set to today's date

class ToDoItem{
    grocery:string;
    quantity:Number;
    dateAcquired:Date;
    itemGrabbed:boolean;

    /*
    constructor(desiredGrocery:string) {
        this.grocery = desiredGrocery;
    }
    */
}
/*
let item = new ToDoItem();
item.grocery = "Testing";
item.quantity = 1;
item.dateAcquired = new Date(2020, 11, 4);
item.isCompleted = false;
*/

window.onload = function() {
    let addItem = document.getElementById("add");
    addItem.onclick = productProcess;

    // Load saved items
    loadSavedItem();
}

function loadSavedItem() {
    let item = getToDo(); // read from storage
    displayToDoItem(item);
}

function productProcess() {
    if(isValid()) {
        let list = getToDoItem();
        saveToDo(list);
        displayToDoItem(list);
    }    
}
/**
 * Check form data is valid
 */
function isValid():boolean {
    let isValid = true;

    let grocery = getInputById("grocery").value;
    if(grocery == "") {
        isValid = false;
        alert("must enter a product")
    }

    let quantity = getInputById("quantity").value;
    let quantityAmount = parseFloat(quantity);
    if(quantity == "" || isNaN(quantityAmount)){
        isValid = false;
        alert("quantity must be present and is a number!");
    }

    return isValid;
}

/**
 * Get all input off form and wrap in a 
 * ToDoItem object
 */
function getToDoItem():ToDoItem {

    let myList = new ToDoItem();
    
    let groceryInput = getInputById("grocery");
    myList.grocery = groceryInput.value;

    let quantityInput = getInputById("quantity");
    myList.quantity = parseInt(quantityInput.value);

    let dateAcquiredInput = getInputById("date-acquired");
    myList.dateAcquired = new Date(dateAcquiredInput.value);

    let itemGrabbed = getInputById("grabbed-item");
    myList.itemGrabbed = itemGrabbed.checked;

    return myList;
}

/**
 * Display given ToDoItem on the web page
 */
function displayToDoItem(item:ToDoItem):void {
    let groceryText = document.createElement("h3");
    groceryText.innerText = item.grocery;

    let quantityText = document.createElement("p");
    quantityText.innerText = item.quantity.toString();

    let itemDate = document.createElement("p");
    // itemDate.innerText = item.dateAcquired.toDateString();
    let dueDate = new Date(item.dateAcquired.toString());
    itemDate.innerText = dueDate.toDateString();

    // ex. <div class="todo completed"></div> or <div class="todo"></div>
    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add("todo");
        if(item.itemGrabbed) {
            itemDiv.classList.add("completed");
        }

    itemDiv.appendChild(groceryText);
    itemDiv.appendChild(quantityText);
    itemDiv.appendChild(itemDate);

    if(item.itemGrabbed) {
        let completeCapture = document.getElementById("itemBagged");
        completeCapture.appendChild(itemDiv);
    }
    else {
        let incompleteCapture = document.getElementById("itemWasNotBagged");
        incompleteCapture.appendChild(itemDiv);
    }

}

/**
 * 
 * @param id getInputById is a shortcut for casting HTMLInputElement
 */
function getInputById(id:string):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

/**
 * when clicking on a incomplete task it will turn to completed.
 */
function markAsComplete() {
    // console.log(this) Can show what is triggering the element with the method

    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("completed");

    let completedItems = document.getElementById("itemBagged");
    completedItems.appendChild(itemDiv);
}
// Task: Allow user to mark a ToDoItem as completed
// Task: Store ToDoItems in webStorage

function saveToDo(item:ToDoItem):void {
    // Convert ToDoItem into JSON String
    let itemString = JSON.stringify(item);

    // storing single item to todo storage
    localStorage.setItem(todokey, itemString)
}

const todokey = "todo";

/**
 * Get stored ToDo item or return null if 
 * none is found
 */
function getToDo():ToDoItem{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem = JSON.parse(itemString);

    return item;
}