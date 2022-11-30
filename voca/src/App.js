import './App.css';
import Hello from './component/Hello'
import Welcome from './component/Welcome';
import Handling from './component/Handling';
import Props from './component/Props';

import styles from "./App.module.css"


function App() {
  const name = "Top"
  const naver = {
    name : 'naver',
    url : 'https://naver.com'
  }
  return (
    <div className="App">
      <Hello/>
      <Welcome/>
      <h1 style={{
        color:'red',
        backgroundColor : "green"
        }}
        >
        hello, {name}
        {2+5}
        </h1>
        <a href='{naver.url}'>{naver.name}</a>
        <div className={styles.box}></div>
      <Handling/>
      <Props/>
    </div>
  );
}

export default App;
