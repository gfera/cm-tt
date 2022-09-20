import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import IconBars from '../icons/IconBars';
import IconChartUp from '../icons/IconChartUp';
import IconMap from '../icons/IconMap';
import ColonizeMars from './ColonizeMars';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [showBar, setShowBar] = useState(false)
  useEffect(() => {
    setTimeout(() => setShowBar(true), 500)
  }, []);
  return (
    <CSSTransition in={showBar}
      mountOnEnter
      timeout={500}
      classNames={{
        enterActive: styles.navBarInActive,
        enter: styles.navBarIn,
      }}>
      <div className={styles.base}>
        <ColonizeMars />
        <div></div>
        <ul className={styles.menu}>
          <li><IconMap />Map</li>
          <li><IconBars />Leaderboards</li>
          <li><IconChartUp />Earn</li>
        </ul>
        <div className={styles.userItem}></div>
      </div>
    </CSSTransition>)
}


export default NavBar;