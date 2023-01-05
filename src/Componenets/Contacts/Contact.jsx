import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import "./Contact.css";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";

export default function Contact({ contacts, currentUser, chahgeChat }) {
  // To manage Account the drop-down menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.name);
    }
  }, [currentUser]);
  // To Change the chat based on selected user from contact
  const changeCurrentChat = (index, contacts) => {
    setCurrentSelected(index);
    chahgeChat(contacts);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: "35px",
        width: "35px",
        fontSize: "18px",
        textAlign: "center",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  console.log(contacts);

  return (
    <>
      <div>
        <Tooltip title="People List" placement="top" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <PeopleAltIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {contacts.map((contact, index) => {
            return (
              <div key={index}>
                <StyledMenu>
                  <MenuItem
                    className={`${index === currentSelected ? "selected" : ""}`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <Avatar {...stringAvatar(contact.name)} alt="User" />
                    <Typography
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      {contact.name}
                    </Typography>
                  </MenuItem>
                </StyledMenu>
              </div>
            );
          })}
        </Menu>
      </div>
    </>
  );
}

const StyledMenu = styled.div`
  .selected {
    background-color: #9a86f3;
  }
`;
