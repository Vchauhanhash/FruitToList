const form = document.querySelector("#fruit-form")
const fruitList = document.querySelector(".collection")
const clrbtn = document.querySelector(".clear-tasks")
const filter = document.querySelector("#filter")
const fruitinput = document.querySelector("#fruit")

loadEventListener();

function loadEventListener() {
  form.addEventListener('submit',addFruit);
  //remove list
  fruitList.addEventListener('click', removeFruit);

  clrbtn.addEventListener('click', clearFruit);

  filter.addEventListener('keyup',filterList);
  
  document.addEventListener('DOMContentLoaded', getfruits)
}
 //load fruit from local storage
function getfruits(){
  let fruits;
  if(localStorage.getItem('fruits') === null)
  {
    fruits=[]
  }
  else{
    fruits = JSON.parse(localStorage.getItem('fruits'));
  }
  fruits.forEach(function(fruits){
    const li =document.createElement('li');
li.className = 'collection-item';
li.appendChild(document.createTextNode(fruits)) ;

let link = document.createElement('a');
link.className = 'delete-item secondary-content' ;
link.innerHTML = '<i class="fa fa-remove"></i>';
li.appendChild(link);

fruitList.appendChild(li);

  })
}

function addFruit(e){
  if(fruitinput.value === ''){
  alert('Add a Fruit');
}
// create list items
const li =document.createElement('li');
li.className = 'collection-item';
li.appendChild(document.createTextNode(fruitinput.value)) ;

let link = document.createElement('a');
link.className = 'delete-item secondary-content' ;
link.innerHTML = '<i class="fa fa-remove"></i>';
li.appendChild(link);
 
console.log(li);

fruitList.appendChild(li);
//store to local storage
storeTaskInLocalStorage(fruitinput.value)
 
fruitinput.value = '';
e.preventDefault();
}

function storeTaskInLocalStorage(fruit) {
  let fruits;
  if(localStorage.getItem('fruits') === null)
  {
    fruits=[]
  }
  else{
    fruits = JSON.parse(localStorage.getItem('fruits'));
  }
fruits.push(fruit);
localStorage.setItem('fruits',JSON.stringify(fruits));
}

function removeFruit(e){
  if(e.target.parentElement.classList.contains('delete-item')){
  //  console.log(e.target);
  if(confirm('Are you sure you want to delete this item')){
    e.target.parentElement.parentElement.remove();
    console.log(e.target);
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
  }

}

function removeTaskFromLocalStorage(fruitItem){
   
  let fruits;
  if(localStorage.getItem('fruits') === null)
  {
    fruits=[]
  }
  else{
    fruits = JSON.parse(localStorage.getItem('fruits'));
  }
fruits.forEach(function(fruit,index){
  if(fruitItem.textContent == fruit)
  {
    fruits.splice(index,1);
  }
});
 localStorage.setItem('fruits',JSON.stringify(fruits));

}

function clearFruit(){
  while(fruitList.firstChild){
    fruitList.removeChild(fruitList.firstChild);
  }
  clearfromLocalStorage();
}
function clearfromLocalStorage(){
  localStorage.clear()
}
function filterList(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      }
      else{
        task.style.display = 'none';
      }
    });

}