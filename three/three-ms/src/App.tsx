import React from 'react';
import style from'./App.module.css';
import { Header} from "./view/Header"
import { MainContent } from './view/MainContent';

function App() {
  return (
    <div className={style.App}>
      <Header />
      <MainContent />
    </div>
  );
}

export default App;
