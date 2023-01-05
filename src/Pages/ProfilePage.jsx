import React from "react";
import styled from "styled-components";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export default function ProfilePage() {
  return (
    <Div>
      <div class="profile_card">
        <div class="profile-card-header">
          <AccountCircleRoundedIcon
            sx={{
              width: "130px",
              height: "130px",
              borderRadius: "1000px",
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "2px solid #8147fc",
              boxShadow: "0 0 20px #00000033",
              backgroundColor: 'beige'
            }}
          />
        </div>
        <div class="profile-card-body">
          <p class="name">Your Name</p>
          <a href="/" class="mail">
            yourname@amail.com
          </a>
        </div>

        {/* <div class="social-links">
            <a href="/" class="fab fa-github social-icon"></a>
            <a href="/" class="fab fa-twitter social-icon"></a>
            <a href="/" class="fab fa-youtube social-icon"></a>
            <a href="/" class="fab fa-linkedin social-icon"></a>
        </div> */}

        <div class="card-footer">
          {/* <p class="count">
            <span>120k</span> Followers | <span>10k</span> Following
          </p> */}
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  .profile_card {
    max-width: 250px;
    margin: 150px auto 0;
    background-color: #42515a;
    box-shadow: 0 10px 90px #00000024;
    text-align: center;
    font-size: 20px;
    border-radius: 15px;
  }

  .profile-card-header {
    position: realative;
    height: 48px;
  }
  .profile-card-body {
    padding: 10px 40px;

    .name {
      margin-top: 30px;
      font-size: 22px;
      font-weight: bold;
      color: #c74385;
    }
    &:hover {
        color: #d885af;
    }
  }
`;
