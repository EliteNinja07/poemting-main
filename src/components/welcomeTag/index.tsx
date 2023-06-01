import React from "react";
import { LogoIcon } from "./../../assets/icons";
//@ts-ignore
import styles from './index.module.sass'

const WelcomeTag = () => {
  return (
    <div className={`${styles.welcome_tag} flex`}>
      <LogoIcon />
      <div className={`${styles.text_content} flex-column`}>
        <h4>
          Welcome to <span>PoemTing</span>
        </h4>
        <p>Start creating poems and songs by providing your idea</p>
      </div>
    </div>
  );
};

export default WelcomeTag;
