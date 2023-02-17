import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";

import info1 from "../../assets/CarthageLand.jpg";
import info2 from "../../assets/ali.png";
import info3 from "../../assets/ali.png";
import { useDispatch,useSelector } from 'react-redux';
import {fetchEvent} from '../../redux/eventSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import moment from 'moment'

export default function RecommendEvent() {
  const event = useSelector(state=>state.event)
  const {error} = useSelector(state=>state.event)
  const {status} = useSelector(state=>state.event)
  const {data} = useSelector(state=>state.event)
  let navigate = useNavigate();
  const handleClick = (values) => {
     navigate(`/reservationevenement/${values.id}`)
};
const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchEvent())
   
       },[dispatch])
   
       useEffect(()=>{
   
        console.log('event : ', event)
            },[event])

  const packages = [
    "The Weekend Break",
    "The Package Holiday",
    "The Group Tour",
    "Long Term Slow Travel",
  ];

  const [active, setActive] = useState(1);

  return (
    
    <Section id="recommend">
        
      <div className="title">
        <h2>Recommended Event</h2>
      </div>
      { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading"? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :event.data.length===0? <Box display='flex' justifyContent='center'> "il n'y a pas de données trouvées"</Box>:
      <div className="destinations">
        {data.map((destination) => {
          return (
            <div className="destination">
              <img src={`${process.env.REACT_APP_BASE_URL}/${destination.image_evenement}`} width="580px" height="326px" alt="image_evenement" />
              <h3>{destination.nom_evenement}</h3>
              <p>{destination.description}</p>
              <div className="info">
                <div className="services">
              <p>Place disponible : <span>{destination.nb_place-destination.nb_place_reserver}</span></p>

                </div>
                <h4>A partir de {destination.prix_evenement} DT</h4>
              </div>
              <div className="distance">
                <p>de <span> {moment(destination.date_debut).format('YYYY-MM-DD')} à <span>{moment(destination.date_fin).format('YYYY-MM-DD')}</span></span></p>
                <Button variant="contained" onClick={(e)=>handleClick(destination)}>Réserver</Button>
              </div>
            </div>
          );
        })}
      </div>}
    </Section>
  );
}

const Section = styled.section`
  padding: 2rem 0;
  .title {
    text-align: center;
  }
  .packages {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    ul {
      display: flex;
      list-style-type: none;
      width: max-content;
      li {
        padding: 1rem 2rem;
        border-bottom: 0.1rem solid black;
      }
      .active {
        border-bottom: 0.5rem solid #8338ec;
      }
    }
  }
  .destinations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 0 3rem;
    .destination {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: #8338ec14;
      border-radius: 1rem;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      img {
        width: 100%;
      }
      .info {
        display: flex;
        align-items: center;
        .services {
          display: flex;
          gap: 0.3rem;
          img {
            border-radius: 1rem;
            background-color: #4d2ddb84;
            width: 2rem;
            /* padding: 1rem; */
            padding: 0.3rem 0.4rem;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .distance {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 992px) {
    .packages {
      ul {
        li {
          padding: 0 0.5rem;
          font-size: 2vh;
          padding-bottom: 1rem;
        }
        .active {
          border-bottom-width: 0.3rem;
        }
      }
    }
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
`;
