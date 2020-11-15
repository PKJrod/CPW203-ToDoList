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
    var purchases = getInputById("purchases").value;
    if (purchases == "") {
        isValid = false;
        alert("must enter a product");
    }
    var price = getInputById("dollaramount").value;
    var priceAmount = parseFloat(price);
    if (price == "" || isNaN(priceAmount)) {
        isValid = false;
        alert("price must be present if it was free please add a 0!");
    }
    return isValid;
}
function getToDoItem() {
    var myList = new ToDoItem();
    var purchaseInput = getInputById("purchases");
    myList.purchases = purchaseInput.value;
    var priceInput = getInputById("dollaramount");
    myList.price = parseFloat(priceInput.value);
    var dateAcquiredInput = getInputById("date-acquired");
    myList.dateAcquired = new Date(dateAcquiredInput.value);
    var itemPaid = getInputById("paid");
    myList.itemPaid = itemPaid.checked;
    return myList;
}
function displayToDoItem(item) {
    var purchaseText = document.createElement("h3");
    purchaseText.innerText = item.purchases;
    var priceText = document.createElement("p");
    priceText.innerText = "$" + item.price.toString();
    var itemDate = document.createElement("p");
    var dueDate = new Date(item.dateAcquired.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add(todokey);
    if (item.itemPaid || item.price == 0) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(purchaseText);
    itemDiv.appendChild(priceText);
    itemDiv.appendChild(itemDate);
    if (item.itemPaid || item.price == 0) {
        var completeCapture = document.getElementById("productPaid");
        completeCapture.appendChild(itemDiv);
    }
    else {
        var incompleteCapture = document.getElementById("productNotPaid");
        incompleteCapture.appendChild(itemDiv);
    }
}
function getInputById(id) {
    return document.getElementById(id);
}
function markAsComplete() {
    var itemDiv = this;
    itemDiv.classList.add("completed");
    var completedItems = document.getElementById("productPaid");
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
