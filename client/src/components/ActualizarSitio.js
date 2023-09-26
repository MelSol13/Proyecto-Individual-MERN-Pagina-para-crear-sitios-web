import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { ChromePicker } from 'react-color';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";


const ActualizarSitio = () => {

    const imagen = "https://plus.unsplash.com/premium_photo-1683147638125-fd31a506a429?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGRpc2UlQzMlQjFvJTIwd2VifGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60";

    const { id } = useParams();
    const[sitio, setSitio]= useState({});
    const [nombre, setNombre] = useState('');
    const [url, setUrl] = useState('');
    const [categoria, setCategoria] = useState('');
    const [logo, setLogo] = useState('');
    const [eslogan, setEslogan] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [colorBarra, setColorBarra] = useState('#000000');
    const [colorFondo, setColorFondo] = useState('#FFFFFF');
    const [colorInformacion, setColorInformacion] = useState('#000000');
    const [fuenteSeleccionada, setFuenteSeleccionada] = useState('');
    const [servicio1, setServicio1] = useState('');
    const [servicio2, setServicio2] = useState('');
    const [servicio3, setServicio3] = useState('');
    const [imagen1, setImagen1] = useState('');
    const [imagen2, setImagen2] = useState('');
    const [imagen3, setImagen3] = useState('');
    const [errors, setErrors]=useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/sitios/${id}`, {withCredentials: true})
            .then(res => {
                const sitio = res.data;
                setNombre(sitio.nombre);
                setUrl(sitio.url);
                setCategoria(sitio.categoria);
                setLogo(sitio.logo);
                setEslogan(sitio.eslogan);
                setDescripcion(sitio.descripcion);
                setServicio1(sitio.servicio1);
                setServicio2(sitio.servicio2);
                setServicio3(sitio.servicio3);
                setImagen1(sitio.imagen1);
                setImagen2(sitio.imagen2);
                setImagen3(sitio.imagen3);
                setColorBarra(sitio.colorBarra);
                setColorFondo(sitio.colorFondo);
                setColorInformacion(sitio.colorInformacion);
                setFuenteSeleccionada(sitio.fuenteSeleccionada);
            })
            .catch(err => {
                if(err.response.status === 401){
                    navigate("/iniciar-sesion");
                }
            });
    }, [id]);


    const actualizarSitio = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/sitios/${id}`,{
            nombre,
            url,
            categoria,
            logo,
            eslogan,
            descripcion,
            servicio1,
            servicio2,
            servicio3,
            imagen1,
            imagen2,
            imagen3,
            colorBarra,
            colorFondo,
            colorInformacion,
            fuenteSeleccionada
        }, {withCredentials:true})
        .then(res => navigate(`/vistaprevia/${res.data._id}`))
        .catch(err => setErrors(err.response.data.errors))
    };


    const opcionesCategorias = [
        { value: 'pasteleria', label: 'Pastelería' },
        { value: 'unas', label: 'Uñas' },
        { value: 'tienda', label: 'Tienda' },
    ];


    return (
        <div>
            <form onSubmit={actualizarSitio}>
                <img src={imagen} alt="Imagen predeterminada" />
                <div>
                <h1>Realizar Cambios</h1>
                </div>
                <div>
                    <label>Nombre del sitio:</label>
                    <input type="text" name="nombre " value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div>
                    <label>Categoría:</label>
                    <Select
                        options={opcionesCategorias}
                        value={categoria}
                        onChange={(opcionSeleccionada) => setCategoria(opcionSeleccionada)}
                    />
                </div>
                <div>
                    <label>URL:</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div>
                    <label>Logo:</label>
                    <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} />
                </div>
                <div>
                    <label>Imagen 1:</label>
                    <input type="text" value={imagen1} onChange={(e) => setImagen1(e.target.value)} />
                </div>
                <div>
                    <label>Imagen 2:</label>
                    <input type="text" value={imagen2} onChange={(e) => setImagen2(e.target.value)} />
                </div>
                <div>
                    <label>Imagen 3:</label>
                    <input type="text" value={imagen3} onChange={(e) => setImagen3(e.target.value)} />
                </div>
                <div>
                    <label>Eslogan:</label>
                    <input type="text" value={eslogan} onChange={(e) => setEslogan(e.target.value)} />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>
                <div>
                    <label>Servicio 1:</label>
                    <input type="text" value={servicio1} onChange={(e) => setServicio1(e.target.value)} />
                </div>
                <div>
                    <label>Servicio 2:</label>
                    <input type="text" value={servicio2} onChange={(e) => setServicio2(e.target.value)} />
                </div>
                <div>
                    <label>Servicio 3:</label>
                    <input type="text" value={servicio3} onChange={(e) => setServicio3(e.target.value)} />
                </div>
                <div>
                    <label>Fuente:</label>
                    <select
                        value={fuenteSeleccionada}
                        onChange={(e) => setFuenteSeleccionada(e.target.value)}
                    >
                        <option value="">Seleccionar una fuente</option>
                        <option value="lovelo">Lovelo</option>
                        <option value="opera-sans">Opera Sans</option>
                        <option value="bugaki">Bugaki</option>
                    </select>
                </div>
                <div>
                    <h2>Elegir Colores:</h2>
                    <div>
                        <label>Barra Superior:</label>
                        <ChromePicker color={colorBarra} onChange={(color) => setColorBarra(color.hex)} />
                    </div>
                    <div>
                        <label>Fondo:</label>
                        <ChromePicker color={colorFondo} onChange={(color) => setColorFondo(color.hex)} />
                    </div>
                    <div>
                        <label>Información:</label>
                        <ChromePicker color={colorInformacion} onChange={(color) => setColorInformacion(color.hex)} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={actualizarSitio}>
                    Vista Previa
                </button>
            </form>
        </div>
    );
};
export default ActualizarSitio;