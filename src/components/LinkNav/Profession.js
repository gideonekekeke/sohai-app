import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'

import { app } from "../Base";


const db = app.firestore();

function Profession() {

    const [Prof, setProf] = useState([])


    const getData = async () => {
        await db
          .collection("sohai")
        //   .limit()
        //   .orderBy("date", "desc")
          .onSnapshot((snapshot) => {
            const item = [];
            snapshot.forEach((doc) => {
              item.push({ ...doc.data(), id: doc.id });
            });
    
            setProf(item);
          });
      };




    useEffect(() => {
        getData();
    }, []);

    return (
        <div style={{
            flexWrap:"wrap",
            flexDirection:"column",
            display:"flex",
            alignItems:"flex-end",
            
        }}>
            <h2 style={{textAlign:"left", marginRight:"30px", color:"blueviolet"}}>Talk to a Professional</h2>

            {/* Mapping Part to the Card */}
            
            {Prof.map(({id, avatar, name, firm, desc, date}) => (

                <div style={{
                    display:"flex",
                    flexWrap:"wrap",
                    flexDirection:"column",
                    width:"270px",
                    margin:"10px",
                    border:"1px solid purple",
                    boxShadow:"1px 0px 2px 0px",
                    backgroundColor:"white"
                }}>
    
                    <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        backgroundColor:"whitesmoke"
                    }}>

                {/* The consuming of Professional Images */}
                        <div style={{
                            display:"flex",
                            justifyContent:"center",
                            objectFit:"cover",
                            alignItems:"center",
                            height:"40px",
                            width:"40px",
                            borderRadius:"20px",
                            margin:"5px",
                            border:"1px solid pink", 
                           
                        }}>
                            <img src={avatar} style={{height:"40px", width:"40px", borderRadius:"20px"}}  alt="image"/>
                        </div>

                {/* Consuming the Professional Names and Firms */}

                        <div style={{marginRight:"5px", height:"40px"}}>
                            <div style={{fontWeight:"bold"}}>
                                {name}
                            </div>
    
                            <div style={{color:"purple"}}>
                                {firm}
                            </div>
                        </div>
    
                    </div>
    
                    <hr style={{width:"250px", }}/>

                {/* Part Where the Bio is Mapped */}

                    <div style={{marginLeft:"7px", marginRight:"7px", marginBottom:"5px", textAlign:"left"}}>
                    <b>Biography</b><br/> {desc}
                    </div>
    
                </div>
            ))}

        </div>
    );
  }
  
  export default Profession;