import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import ButtonLogout from './ButtonLogout';
import "./VistaSitio.css"

const VistaSitio = () => {
    const [sitio, setSitio] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8000/api/sitios/" + id, { withCredentials: true })
            .then(res => setSitio(res.data))
            .catch(err => {
                if (err.response.status === 401) {
                    navigate("/iniciar-sesion");
                }
            });
    }, [id])


    const borrarSitio = (id) => {
        axios.delete("http://localhost:8000/api/sitios/" + id, { withCredentials: true })
            .then(res => navigate("/crearsitio"))
            .catch(err => console.log(err));
    }


    return (
        <div style={{fontFamily: `${sitio.fuenteSeleccionada}`}}>
            <ButtonLogout />
            <div className='fondo' style={{background: `${sitio.colorFondo}`}}>
                <div className='barraSuperior' style={{background: `${sitio.colorBarra}`}}>
                    <p className='sitioNombre'>{sitio.nombre}</p>
                    <img src={sitio.logo} className='logo' alt="logo"></img>
                </div>
                <div className='body'>
                    <div className='columna-izquierda' style={{background: `${sitio.colorInformacion}`}}>
                        <div>
                            <p className='eslogan'>{sitio.eslogan}</p>
                        </div>
                        <p className='descripcion'>{sitio.descripcion}</p>
                        <ul>
                            <li><p className='servicio1'>{sitio.servicio1}</p></li>
                            <li><p className='servicio2'>{sitio.servicio2}</p></li>
                            <li><p className='servicio3'>{sitio.servicio3}</p></li>
                        </ul>
                    </div>
                    <div className='columna-derecha'>
                        <div>
                            <img src={sitio.imagen1} className='imagen1' alt="imagen1"></img>
                        </div>
                        <div>
                            <img src={sitio.imagen2} className='imagen2' alt="imagen2"></img>
                        </div>
                        <div>
                            <img src={sitio.imagen3} className='imagen3' alt="qimagen3"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Link className="btn-cambios" to={"/editarsitio/" + sitio._id}>Realizar cambios</Link>
                <button className="btn-sitio">Crear Sitio</button>
                <button className="btn-borrar" onClick={() => borrarSitio(sitio._id)}>Borrar</button>
            </div>
        </div>
    );
};

export default VistaSitio;