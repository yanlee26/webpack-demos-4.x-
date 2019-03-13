export default function printMe() {
  fetch('/api/users').then(res=>{
    console.log(111)
  })
  
  // fetch('http://localhost:3000/').then(res=>{
  //   console.log(222)
  // })
 
  // fetch('api/users').then(res=>{
  //   console.log(333)
  // })
  console.log('I get called from print.js!');
}