import React, { useState } from "react";
import './userPage.css';
import { ModalLogout } from "../ModalLogout/ModalLogout";
import { useDatabase } from "../../hooks/database";
import { useDispatch, useSelector } from "react-redux";
import { setAllowShowVisited } from "../../redux/loginUsersSlice";

export const UserPage = ({logoutGoogle, currUser}) => {
  const dispatch = useDispatch();
  const {writeUserPermissionVisited} = useDatabase();
  const isAllowed = useSelector(state => state.currUser.isAllowShowVisited);

  const [showMod, setShowMod] = useState(false);
  const [clearData, setClearData] = useState(false);

  const openModal = (e) => {
    if (e.target.name === 'clear') {
      setClearData(true);
    } else {
      setClearData(false);
    }
    setShowMod(true);
  }

  const setAllowVisited = () => {
    writeUserPermissionVisited(!isAllowed);
    dispatch(setAllowShowVisited(!isAllowed));
  }

  return (
    <div className="userPage">
      {
        (showMod) &&
        <ModalLogout
          setShowMod={setShowMod}
          logoutGoogle={logoutGoogle}
          clearData={clearData}
        />
      }
      <h2>{currUser.displayName}</h2>
      <div className="isAllowShowVisited">
        <input type='checkbox' checked={isAllowed} onChange={setAllowVisited} />
        <span>allow other users to see the countries I have visited (in progress...)</span>
      </div>
      <button className='logoutButton' onClick={openModal}>Logout</button>
      <button className='logoutButton logoutClear' name="clear" onClick={openModal}>Logout and clear data</button>
    </div>
  )
}