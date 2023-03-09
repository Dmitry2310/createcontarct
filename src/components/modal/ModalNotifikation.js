import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { contractNotify } from "./../../actions/notificationActions";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0,0,0,0.6)',
    boxShadow: '10px 29px 32px rgba(0, 0, 0, 0.5)',
    borderRadius: '30px',
    zIndex: 999999,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 2500ms ease-in'
};

const ModalNotifikation = ({ notificationText }) => {

    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
            dispatch(contractNotify(""));
        }, 2500);
    }, [notificationText]);

    return (visible
        ?
        < div style={style}>
            <div style={{
                minHeight: '100px', display: 'flex',
                justifyContent: 'center', alignItems: 'center', background: '#63BCE5', width: '50%', borderRadius: 10, transition: 'opacity 400ms ease-in'
            }}>
                <div style={{ color: 'white' }}>
                    {notificationText}
                </div>
            </div>
        </div>
        : <div></div>
    )
}

export default ModalNotifikation;



