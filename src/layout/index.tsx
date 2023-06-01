import React, { ReactNode, useState } from "react";
import { Breakpoint } from "react-socks";
import { Close, LogoIcon, Menu } from "../assets/icons";
import { useStepsContext } from "../shared/context/StepsProvider";
import { useDetectOutsideClick, useWindowSize } from "../shared/hooks";
//@ts-ignore
import styles from "./index.module.sass";
import { Link } from "react-router-dom";
import VerticalSteps from "../components/steps/vertical";
import HorizontalSteps from "../components/steps/horizontal";

interface Props {
  children: ReactNode;
  sidebarContent: ReactNode;
  altSidebarImage?: boolean;
}
const Layout = ({ children, sidebarContent, altSidebarImage }: Props) => {
  const [opened, setOpened] = useState(false);
  const { width } = useWindowSize();
  const ref = useDetectOutsideClick(() => {
    setOpened(false);
  });
  const { state } = useStepsContext();
  return (
    <>
      <Breakpoint l down className={`${styles.page}`}>
        <nav
          style={{
            zIndex: 9999,
          }}
          className={`${styles.nav} flex`}
        >
          <button
            onClick={() => setOpened(true)}
            className={`${styles.icon_button}`}
          >
            <Menu />
          </button>
          <div className={`${styles.brand} flex`}>
            <Link to={"/"}>
              <LogoIcon />
            </Link>
            <p>PoemTing</p>
          </div>
        </nav>
        <aside
          className={`${
            altSidebarImage && state.steps[0].active
              ? styles.alt_sidebar_image
              : styles.sidebar_image
          } ${styles.sidebar} ${styles.mobile_sidebar} 
          ${opened ? styles.opened : styles.closed} flex`}
          ref={ref}
          style={{
            zIndex: 10000,
          }}
        >
          <button
            onClick={() => setOpened(false)}
            className={`${styles.close_sidebar}`}
          >
            <Close />
          </button>
          {state.steps[0].active && sidebarContent}
          {!state.steps[0].active && (
            <div
              style={{
                marginTop: "5rem",
              }}
            >
              <VerticalSteps />
            </div>
          )}
        </aside>
        <main className={`${styles.main} ${styles.main_mobile}`}>
          {/* steps */}
          <div
            style={{
              padding: width <= 500 ? "3%" : "3rem",
            }}
          >
            <HorizontalSteps />
          </div>
          {children}
        </main>
      </Breakpoint>

      <Breakpoint xl up className={`${styles.page} flex`}>
        <aside
          className={`${
            altSidebarImage && state.steps[0].active
              ? styles.alt_sidebar_image
              : styles.sidebar_image
          } ${styles.sidebar} flex`}
          style={{
            zIndex: 10000,
          }}
        >
          {state.steps[0].active && sidebarContent}
          {!state.steps[0].active && <VerticalSteps />}
        </aside>
        <main className={`${styles.main}`}>
          <div
            style={{
              padding: width <= 500 ? "3%" : "3rem",
            }}
          >
            <HorizontalSteps />
          </div>
          {children}
        </main>
      </Breakpoint>
    </>
  );
};

export default Layout;
