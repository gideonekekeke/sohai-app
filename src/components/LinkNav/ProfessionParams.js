import React, {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import {app} from "../Base"



const db = app.firestore().collection("")

function Profession() {

    const [Prof, setprof] = useState(null)

    const {id} = useParams()
    const getData = async () => {
        const docRef = await db.doc(id);
        const docData = await docRef.get ();

        setprof(docData.data());
    };


    useEffect(() => {
        getData();
    }, []);

    return (
        <div style={{
            flexWrap:"wrap",
            display:"flex",
            justifyContent:"flex-end"
        }}>
            <div style={{
                display:"flex",
                flexDirection:"column",
                width:"270px",
                margin:"10px",
                border:"1px solid purple",
                boxShadow:"1px 0px 2px 0px"
            }}>

            </div>
        </div>
    );
  }
  
  export default Profession;