const form = document.querySelector("#fruit-form")
const fruitList = document.querySelector(".collection")
const clrbtn = document.querySelector(".clear-tasks")
const filter = document.querySelector("#filter")
const fruitinput = document.querySelector("#fruit")
const inputfield = document.querySelector(".input-field")
const clrodd = document.querySelector(".clear-odd")
const clreven = document.querySelector(".clear-even")

loadEventListener();

function loadEventListener() {
  form.addEventListener('submit',addFruit);
  //remove list
  fruitList.addEventListener('click', removeFruit);

  clrbtn.addEventListener('click', clearFruit);

  filter.addEventListener('keyup',filterList);
 
  clrodd.addEventListener('click',clearOdd);
 
  clreven.addEventListener('click',clearEven);
  
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

  });
}

function addFruit(e){
 
  if(fruitinput.value ===''){
   var text = "**Input Required";
  var input = document.getElementById('para')
  input.innerHTML=text; 

}

//Specialchar


 else if (/^[a-zA-Z0-9- ,_]*$/.test(fruitinput.value) == false){
  var st = "**Input is not valid No Special Character allowed(/*-+!@#$%^&*) ";
  var input = document.getElementById('para')
  input.innerHTML=st;
  // fruitinput.value=''

}


// create list items
else
{

const li =document.createElement('li');
li.className = 'collection-item';
li.id ='f-it';
li.appendChild(document.createTextNode(fruitinput.value)) ;

let link = document.createElement('a');
link.className = 'delete-item secondary-content' ;
link.innerHTML = '<i class="fa fa-remove"></i>';
li.appendChild(link);
 
//console.log(li);

fruitList.appendChild(li);
//store to local storage
storeTaskInLocalStorage(fruitinput.value)
 
fruitinput.value = '';
var input = document.getElementById('para')
input.innerHTML='';
}
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
function clearOdd(){
  var selected = document.querySelectorAll("li:nth-child(odd)");
  selected.forEach(function(item) {
    console.log(item.innerText);
   while(item.parentElement){
     item.remove(item.parentElement);
     }
     removeOddFromLocalStorage(item)
   }) 
  }
function removeOddFromLocalStorage(item){
  fruits = JSON.parse(localStorage.getItem('fruits'));
  fruits.forEach(function(fruit){
    if(item.innerText == fruit)
    {                
   var ind = fruits.indexOf(fruit)
   //fruits.splice(item)
   //var del_fruit = delete fruits[ind]
    //console.log( del_fruit)
   // console.log(fruits)
    console.log(ind)
    console.log(fruits.splice(ind,1))

   // arrayRemove(fruits,fruit)
//console.log(arrayRemove(fruits,fruit))
      // console.log(localStorage.removeItem('fruit'));
      // localStorage.removeItem('fruits[ind]')
    
    }
  
  })
  localStorage.setItem('fruits',JSON.stringify(fruits));

  }

//   function arrayRemove(arr, value) { 
    
//     return arr.filter(function(ele){ 
//         return ele != value; 
//     });
// }


  //localStorage.setItem('fruits'.JSON.stringify(fruits))
   
//}
  // var nSelect = document.querySelectorAll("li");
  // nSelect.forEach(function(item) {
  //   console.log(item.innerText);
  //   it=item.innerText
  //   localStorage.setItem('fruits',JSON.stringify(it))
//})  }

    // function removeOddFromLocalStorage(fruitItem){
   
    //  let fruits;
    //    fruits = JSON.parse(localStorage.getItem('fruits'));
   
    //   localStorage.clear();
    // }

  
  


function clearEven(){
  var selected = document.querySelectorAll("li:nth-child(even)");
  selected.forEach(function(item) {
    console.log(item.innerText);
    while(item.parentElement){
      item.remove(item.parentElement);
  
  }
  removeEvenFromLocalStorage(item)
  });
}
function removeEvenFromLocalStorage(item){
  fruits = JSON.parse(localStorage.getItem('fruits'));
  fruits.forEach(function(fruit){
    if(item.innerText == fruit)
    {                
   var ind = fruits.indexOf(fruit)

    console.log(ind)
    console.log(fruits.splice(ind,1))    
    }
  
  })
  localStorage.setItem('fruits',JSON.stringify(fruits));

  }



//ODD OR EVEN REMOVE_FRUIT
   
// const lis = document.getElementById('ls').children;
// //const listChildren = lis.children
// console.log(lis)
// for( i = 0; i <= lis.length; i++) 
// {
//   if(i%2==0){
//     console.log(i)
//   }
// }

//console.log(lis);     

 // var str= arr.value 
  
  //var secondChild = document.querySelectorAll('.collection li:nth-child(2)');
  //console.log(secondChild)
 
  // var myList = document.getElementsByClassName('collection'); 
  //  var myListItems = document.querySelector('li');
  //  for(var i=0; i<myListItems.length(); ++i){
  //   console.log(myListItems[i]);
  //  } 
  