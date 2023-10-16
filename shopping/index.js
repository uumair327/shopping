import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-4ec34-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputEl()
})

onValue(shoppingListInDB, function(snapshot) {    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        shoppingListEl.innerHTML = ""
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            
            appendItemToShoppingListEl(currentItem)
        } 
    } else {
        shoppingListEl.innerHTML = "No items in list... yet"
    }
})

function clearInputEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}
// ... (existing code) ...

const clearButtonEl = document.getElementById("clear-button");

clearButtonEl.addEventListener("click", function () {
    clearShoppingListInDB();
});

function clearShoppingListInDB() {
    // Remove all items from the shopping list in the database
    shoppingListEl.innerHTML = "No items in list... yet";
    remove(ref(database, "shoppingList"));
}

// ... (existing code) ...
const markAsPurchasedButtonEl = document.getElementById("mark-as-purchased");
const purchasedListEl = document.getElementById("purchased-list");
const shoppingListEl = document.getElementById("shopping-list");

markAsPurchasedButtonEl.addEventListener("click", function () {
    markAllItemsAsPurchased();
});

function markAllItemsAsPurchased() {
    const listItems = shoppingListEl.getElementsByTagName("li");

    // Move all items to the purchased list
    while (listItems.length > 0) {
        const listItem = listItems[0];

        // Add the "purchased" class
        listItem.classList.add("purchased");

        // Clone and append to the purchased list
        const clonedItem = listItem.cloneNode(true);
        purchasedListEl.appendChild(clonedItem);

        // Remove the item from the original shopping list
        listItem.remove();
    }
}


// ... (existing code) ...

