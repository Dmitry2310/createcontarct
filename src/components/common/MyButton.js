import React from "react";
import Button from '@mui/material/Button';

const MyButton = ({ children, color, variant, sx, startIcon, onClick, ariacontrols, sizes }) => {
    return (
        <Button color={color}
            variant={variant}
            sx={sx}
            startIcon={startIcon}
            onClick={onClick}
            size={sizes}
            aria-controls={ariacontrols}> {children} </Button>
    )
}

export default MyButton;