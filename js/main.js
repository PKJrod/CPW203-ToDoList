var picker = datepicker("#date-acquired");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("add");
    addItem.onclick = productProcess;
    loadSavedItems();
};
function loadSavedItems() {
    var itemArray = getToDoItems();
    for (var i = 0; i < itemArray.length; i++) {
        var currItem = itemArray[i];
        displayToDoItem(currItem);
    }
}
function productProcess() {
    if (isValid()) {
        var list = getToDoItem();
        saveToDo(list);
        displayToDoItem(list);
    }
}
function isValid() {
    var isValid = true;
    var grocery = getInputById("grocery").value;
    if (grocery == "") {
        isValid = false;
        alert("must enter a product");
    }
    var quantity = getInputById("quantity").value;
    var quantityAmount = parseFloat(quantity);
    if (quantity == "" || isNaN(quantityAmount)) {
        isValid = false;
        alert("quantity must be present and is a number!");
    }
    return isValid;
}
function getToDoItem() {
    var myList = new ToDoItem();
    var groceryInput = getInputById("grocery");
    myList.grocery = groceryInput.value;
    var quantityInput = getInputById("quantity");
    myList.quantity = parseInt(quantityInput.value);
    var dateAcquiredInput = getInputById("date-acquired");
    myList.dateAcquired = new Date(dateAcquiredInput.value);
    var itemGrabbed = getInputById("grabbed-item");
    myList.itemGrabbed = itemGrabbed.checked;
    return myList;
}
function displayToDoItem(item) {
    var groceryText = document.createElement("h3");
    groceryText.innerText = item.grocery;
    var quantityText = document.createElement("p");
    quantityText.innerText = item.quantity.toString();
    var itemDate = document.createElement("p");
    var dueDate = new Date(item.dateAcquired.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if (item.itemGrabbed) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(groceryText);
    itemDiv.appendChild(quantityText);
    itemDiv.appendChild(itemDate);
    if (item.itemGrabbed) {
        var completeCapture = document.getElementById("itemBagged");
        completeCapture.appendChild(itemDiv);
    }
    else {
        var incompleteCapture = document.getElementById("itemWasNotBagged");
        incompleteCapture.appendChild(itemDiv);
    }
}
function getInputById(id) {
    return document.getElementById(id);
}
function markAsComplete() {
    var itemDiv = this;
    itemDiv.classList.add("completed");
    var completedItems = document.getElementById("itemBagged");
    completedItems.appendChild(itemDiv);
}
function saveToDo(item) {
    var currItems = getToDoItems();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    var currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}
var todokey = "todo";
function getToDoItems() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
