import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet /> {/* works as a children props for Route */}
      <footer className={styles.footer}></footer>
      <p className={styles.copyright}>© Copyright {new Date().getFullYear()}</p>
    </div>
  );
}

export default SideBar;
