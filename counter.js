const alert = document.querySelector('.alert');
const form =   document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');

const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');

const list = document.querySelector('.grocery-list');

const clearBtn = document.querySelector('.clear-btn');


//edit option
let editElement;
let editFlag = false;
let editId = "";




// event listeners
form.addEventListener('submit',addItem )

// clear items
clearBtn.addEventListener('click',clearItems)





// functions 
function addItem(e){
 e.preventDefault();
 const value = grocery.value;
 const id = new Date().getTime().toString()
//  console.log(id);
if(value  && !editFlag){
  // console.log('add item to list');
  const element = document.createElement('article');
  // add class
  element.classList.add('grocery-item');
  element.classList.add('myd-flex');
  // add id
  const attr = document.createAttribute('data-id');
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `  <p class="title">${value}</p>
  <div class="btn-container">
  <button type="button" class="edit-btn">
    <i class="fas fa-edit"></i>
  </button>
  <button type="button" class="delete-btn">
    <i class="fas fa-trash"></i>
  </button>
</div>`;

// edit and delete button
const deleteBtn = element.querySelector('.delete-btn');
const editBtn = element.querySelector('.edit-btn');

// calling edit and delete functions
deleteBtn.addEventListener('click',deleteItem);
editBtn.addEventListener('click',editItem);




// append child
list.appendChild(element);

// display alert
displayAlert('item added to the list','success');
// show container
container.classList.add('show-container');

 setBackToDefault();

// add to local storage



}
else if (value  && editFlag ){
  editElement.innerHTML = value;
  displayAlert('value edited','success');
  setBackToDefault();
}
else {
 displayAlert('Please enter a value','danger')
}


}


function setBackToDefault(){
  grocery.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = "submit"
}




function displayAlert(text,action){
alert.textContent = text;
alert.classList.add(`alert-${action}`);

// rewmove alert
setTimeout(function(){
  alert.textContent = '';
alert.classList.remove(`alert-${action}`);
},1000);

}



// clear all items
function clearItems() {
  const items = document.querySelectorAll('.grocery-item');
  
  if (items.length > 0){
    items.forEach(function(item){
      list.removeChild(item);
    })
  }
  container.classList.remove('show-container');
  displayAlert('All items were removed from the list','danger');
  
  setBackToDefault();


  // remove list from local storage

}





// delete items 


function deleteItem (e) {
//  console.log("delete item");
const element = e.currentTarget.parentElement.parentElement;
list.removeChild(element);

if(list.children.length == 0){
  container.classList.remove('show-container');
}
displayAlert('Item removed','danger');
setBackToDefault();

// remove currentItem from local storage


}

// edit item
function editItem (e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;

  grocery.value = editElement.textContent;
  editFlag = true;
  submitBtn.textContent = 'Edit';

  // console.log("edit item");
 }
 





