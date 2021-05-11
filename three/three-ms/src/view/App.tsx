import React from 'react';
import style from'./App.module.css';
import { Header} from "./Header"
import "../style/theme.css";
import { MainContent } from './MainContent';
import cx from 'classnames';

function App() {
  return (
    <div className={cx("App",style.ThreeMs)}>
      <Header />
      <MainContent />
    </div>
  );
}

export default App;
