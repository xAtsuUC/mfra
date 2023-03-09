import React from 'react';
import './App.css';
import users from './users.json'


function App() {
  function notifications() {
    if(Notification.permission === 'granted') return;
    Notification.requestPermission().then(permission => {
      if(permission === 'denied') {
       alert('You have denied notifications, please enable them to use this app');
       return window.location.reload();
      }
    });
  }

  return (
    notifications(),
    <div className="App">
      <header className="App-header">
        <h1>React App</h1>
        <button>Log Out</button> <button>Time!</button>
      </header>

      <div className='container'>
        <p>Hello {getUser(localStorage.getItem('userID') as String).name}</p>
        <button className='spin-spin' onClick={() => { localStorage.removeItem('userID'); return window.location.reload(); }}>Click me</button>
      </div>
    </div>
  );
}

window.onload = async() => {
  if(localStorage.getItem('userID') === null) {
    let id = prompt('Please enter your ID');

    if(id === null || !id) {
      alert("You didn't enter an ID, click accept to reload the page and try again");
      return window.location.reload();
    } else if(!users.find(user => user.id === Number(id))) {
      alert("You entered an invalid ID, click accept to reload the page and try again");
      return window.location.reload();
    }

    localStorage.setItem('userID', id);
    window.location.reload();
  }
}

function getUser(id:String):User {
  return users.find(user => user.id === Number(id)) ?? {id: 0, name: 'Unknown'};
}
export default App;

interface User {
  id: number;
  name: string;
}