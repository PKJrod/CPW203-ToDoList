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
};
function productProcess() {
    if (isValid()) {
        var list = getToDoItem();
        displayToDoItem(list);
    }
}
function isValid() {
    return true;
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
    itemDate.innerText = item.dateAcquired.toDateString();
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
