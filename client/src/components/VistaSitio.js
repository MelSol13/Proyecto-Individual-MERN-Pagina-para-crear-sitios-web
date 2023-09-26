import React, {useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import ButtonLogout from './ButtonLogout';

const VistaSitio = () => {
    const[sitio, setSitio]= useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    

    useEffect( () =>{
        axios.get("http://localhost:8000/api/sitios/" + id, {withCredentials:true})
        .then(res => setSitio(res.data))  
        .catch(err => {
            if(err.response.status === 401){
                navigate("/iniciar-sesion");
            }
        });
    }, [id])


    const borrarSitio = (id) => {
        axios.delete("http://localhost:8000/api/sitios/" + id, {withCredentials:true})
        .then( res => navigate("/crearsitio"))
        .catch(err => console.log(err));
    }
    
    
    return (
        <div>
            <ButtonLogout/>
            <h1>{sitio.nombre}</h1>
            <img src={sitio.logo} alt="logo"></img>
            <img src={sitio.imagen1} alt="cupcakes"></img>
            <img src={sitio.imagen2} alt="queque numero"></img>
            <img src={sitio.imagen3} alt="queque"></img>
            <p>{sitio.eslogan}</p>
            <p>{sitio.descripcion}</p>
            <ul>
                <li><p>{sitio.servicio1}</p></li>
                <li><p>{sitio.servicio2}</p></li>
                <li><p>{sitio.servicio3}</p></li>
            </ul>
            <Link className="btn btn-info" to={"/editarsitio/"+sitio._id}> Realizar Cambios</Link>
            <button className="btn btn-info">Crear Sitio</button>
            <button className="btn btn-danger " onClick={() => borrarSitio(sitio._id)}>Borrar</button>
        </div>
    );
};

export default VistaSitio;