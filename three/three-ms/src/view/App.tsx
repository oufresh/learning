import React from 'react';
import style from'./App.module.css';
import { Header} from "./Header"
import "../style/theme.css";
import { MainContent } from './MainContent';
import { Footer} from "./Footer";
import cx from 'classnames';

function App() {
  return (
    <div className={cx("App",style.ThreeMs)}>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
