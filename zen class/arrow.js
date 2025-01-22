// const a = 10;

// a = 11;

// var a = "Hello"
// var b = "Welcome!"

// var message = "Initially only available in English, Wikipedia now exists in more than languages. The English Wikipedia," + a + b;

// Template Litrals

var a = "Hello";
var b = "Welcome!";
var count = 400;

var message = `Initially only available in English,
Wikipedia now exists in more than ${count} languages.
The English Wikipedia`;

console.log(message);

// Spread Operator

var a1 = [0];

var a2 = [1, 2, ...a1, 6, 7, 8, 9, 10];

console.log(a2);

// Array Destructuring

var [d, c, b] = [34, 56, 78];

console.log(d);

// Object Destructuring

var { email, name, age } = {
  name: "Vasanth",
  age: 20,
  email: "vasan@gmail.com",
};
console.log(email);
// var name = myObj.name;
// var age = myObj.age;
// var email = myObj.email;

var phone = 988343232;
var address = "123"

var contact = { phone,address }

console.log(contact)


// Rest Operator
function foo(a,b,...c){
 console.log(a)
 console.log(b);
 console.log(c)
}

foo(4,5,6,7);

// Named Function
// function bar(){

// }

// bar()

// Anonums Function
// var fun = function(){

// }
// fun()

// Immediatly Invoked Function Expression -> IIFE
(function(){
    console.log("Hello")
})();


// Arrow Function
// Fat Arrow
let arrowFun = (a,b) => {
    console.log(this)
    console.log("Arrow Function")
}

arrowFun(2,3)


let btn = document.getElementById("btn")

btn.addEventListener("click",function(){
    console.log(this)
})

btn.addEventListener("click",() => {
    console.log(this)
})