import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Auxiliary from '../../../containers/hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  attachedClasses = props.open ? [classes.SideDrawer, classes.Open] : attachedClasses;
  return (
    <Auxiliary>
      <Backdrop clicked={props.closed} show={props.open}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}><Logo /></div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default SideDrawer;
