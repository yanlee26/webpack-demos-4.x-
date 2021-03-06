import './test.css';
import './module';
import('./async-module').then(data => console.log(data));
import('./async-module1').then(data => console.log(data));
import('./async-module2').then(data => console.log(data));

async function getComponent() {
  // return import ( /* webpackChunkName: "lodash" */ 'lodash').then(({
  //   default: _
  // }) => {
  //   var element = document.createElement('div');

  //   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  //   return element;

  // }).catch(error => 'An error occurred while loading the component');

  var element = document.createElement('div');
  console.log('123');
  const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
getComponent().then(component => {
  document.body.appendChild(component);
})