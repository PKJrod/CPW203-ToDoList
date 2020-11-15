// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#date-acquired");
picker.setMin(new Date()); // set to today's date

class ToDoItem{
    purchases:string;
    price:Number;
    dateAcquired:Date;
    itemPaid:boolean;

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
    loadSavedItems();
}

function loadSavedItems() {
    let itemArray = getToDoItems(); // read from storage

    for( let i = 0; i < itemArray.length; i++) {
        let currItem = itemArray[i]
        displayToDoItem(currItem);
    }
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

    let purchases = getInputById("purchases").value;
    if(purchases == "") {
        isValid = false;
        alert("must enter a product")
    }

    let price = getInputById("dollaramount").value;
    let priceAmount = parseFloat(price);
    if(price == "" || isNaN(priceAmount)){
        isValid = false;
        alert("price must be present if it was free please add a 0!");
    }

    return isValid;
}

/**
 * Get all input off form and wrap in a 
 * ToDoItem object
 */
function getToDoItem():ToDoItem {

    let myList = new ToDoItem();
    
    let purchaseInput = getInputById("purchases");
    myList.purchases = purchaseInput.value;

    let priceInput = getInputById("dollaramount");
    myList.price = parseFloat(priceInput.value);

    let dateAcquiredInput = getInputById("date-acquired");
    myList.dateAcquired = new Date(dateAcquiredInput.value);

    let itemPaid = getInputById("paid");
    myList.itemPaid = itemPaid.checked;

    return myList;
}

/**
 * Display given ToDoItem on the web page
 */
function displayToDoItem(item:ToDoItem):void {
    let purchaseText = document.createElement("h3");
    purchaseText.innerText = item.purchases;

    let priceText = document.createElement("p");
    priceText.innerText = "$" + item.price.toString();

    let itemDate = document.createElement("p");
    // itemDate.innerText = item.dateAcquired.toDateString();
    let dueDate = new Date(item.dateAcquired.toString());
    itemDate.innerText = dueDate.toDateString();

    // ex. <div class="todo completed"></div> or <div class="todo"></div>
    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add(todokey);
        if(item.itemPaid || item.price == 0) {
            itemDiv.classList.add("completed");
        }

    itemDiv.appendChild(purchaseText);
    itemDiv.appendChild(priceText);
    itemDiv.appendChild(itemDate);

    if(item.itemPaid || item.price == 0) {
        let completeCapture = document.getElementById("productPaid");
        completeCapture.appendChild(itemDiv);
    }
    else {
        let incompleteCapture = document.getElementById("productNotPaid");
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

    let completedItems = document.getElementById("productPaid");
    completedItems.appendChild(itemDiv);
}
// Task: Allow user to mark a ToDoItem as completed
// Task: Store ToDoItems in webStorage


/*
function saveToDo(item:ToDoItem):void {
    // Convert ToDoItem into JSON String
    let itemString = JSON.stringify(item);

    // storing single item to todo storage
    localStorage.setItem(todokey, itemString)
}
*/

function saveToDo(item:ToDoItem):void{
    let currItems = getToDoItems();
    if(currItems == null){
        currItems = new Array();
    }
    currItems.push(item); // Add the new item to the curr item list

    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}

const todokey = "todo";

/**
 * Get stored ToDo item or return null if 
 * none is found
 */
function getToDoItems():ToDoItem[]{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem[] = JSON.parse(itemString);

    return item;
}