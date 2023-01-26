import React from 'react';
import './home.css'
import styled from "styled-components";
import { Card } from '@mui/material';
import { Box } from '@mui/system';

export default function HeroImage() {
  return (
    <header style={{ padding: 20 }}>
      <div
        className=' text-center bg-image'
        style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: 400 }}
      >
        <div className='mask h-100 w-100' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>TRAVEL TO EXPLORE</h1>
              <h4 className='mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            natus, enim ipsam magnam odit deserunt itaque? Minima earum velit
            tenetur!</h4>
              <Card sx={{ display: 'flex',backgroundColor: "#ffffffce",padding:" 0.5rem",borderRadius: "0.5rem" }}>
          <Box sx={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 1.5rem'}}>
            <label style={{fontSize:' 1.1rem',
          color: '#03045e'}} htmlFor="">Where you want to go</label>
            <input style={{ backgroundColor: 'transparent',
          border: 'none',
          textAlign: 'center',
          color: 'black' }} type="text" placeholder="Search Your location" />
          </Box>
          <div className="container">
            <label style={{fontSize:' 1.1rem',
          color: '#03045e'}} htmlFor="">Check-in</label>
            <input style={{ backgroundColor: 'transparent',
          border: 'none',
          textAlign: 'center',
          color: 'black', paddingLeft:"3rem" }}type="date" />
          </div>
          <div className="container">
            <label style={{fontSize:' 1.1rem',
          color: '#03045e'}} htmlFor="">Check-out</label>
            <input style={{ backgroundColor: 'transparent',
          border: 'none',
          textAlign: 'center',
          color: 'black', paddingLeft:"3rem" }} type="date" />
          </div>
          <button style={{padding: "1rem",
        cursor: 'pointer',
        borderRadius: '0.3rem',
        border: 'none',
        color: 'white',
        backgroundColor: '#4361ee',
        fontSize: '1.1rem',
        textTransform: 'uppercase',
        transition: "0.3s ease-in-out"}}>Explore Now</button>
        </Card>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
const Section = styled.section`
  position: relative;
  margin-top: 2rem;
  width: 100%;
  height: 100%;

  .background {
    height: 100%;
    img {
      width: 100%;
      filter: brightness(60%);
    }
  }
  .content {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 3;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .title {
      color: white;
      h1 {
        font-size: 3rem;
        letter-spacing: 0.2rem;
      }
      p {
        text-align: center;
        padding: 0 30vw;
        margin-top: 0.5rem;
        font-size: 1.2rem;
      }
    }
    .search {
      display: flex;
      background-color: #ffffffce;
      padding: 0.5rem;
      border-radius: 0.5rem;
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 1.5rem;
        label {
          font-size: 1.1rem;
          color: #03045e;
        }
        input {
          background-color: transparent;
          border: none;
          text-align: center;
          color: black;
          &[type="date"] {
            padding-left: 3rem;
          }

          &::placeholder {
            color: black;
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        padding: 1rem;
        cursor: pointer;
        border-radius: 0.3rem;
        border: none;
        color: white;
        background-color: #4361ee;
        font-size: 1.1rem;
        text-transform: uppercase;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #023e8a;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 980px) {
    height: 25rem;
    .background {
      background-color: palegreen;
      img {
        height: 100%;
      }
    }
    .content {
      .title {
        h1 {
          font-size: 1rem;
        }
        p {
          font-size: 0.8rem;
          padding: 1vw;
        }
      }
      .search {
        flex-direction: column;
        padding: 0.8rem;
        gap: 0.8rem;
        /* padding: 0; */
        .container {
          padding: 0 0.8rem;
          input[type="date"] {
            padding-left: 1rem;
          }
        }
        button {
          padding: 1rem;
          font-size: 1rem;
        }
        /* display: none; */
      }
    }
  }
`;