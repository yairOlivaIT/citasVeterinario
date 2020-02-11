import React , { Fragment , useState , useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Citas en  local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  // Arreglo de todas las citas
  const [citas,guardarCitas] = useState(citasIniciales);

  //Use Effect para realizar ciertas operaciones cuando el state cambia
  //el useEffect SIEMPRE ES UN ARROW FUNCTION
  useEffect( () => {
    //re declarar esta parte para que no tire warning asi esta por dentro de useEffect
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas',JSON.stringify(citas));
    }else{//en caso de que no haya ninguna cita
      localStorage.setItem('citas',JSON.stringify([]));
    }
  },[citas]);
  // se le pasa un arreglo vacio para que se ejecute una sola vez sino se ejectua multiple veces  
  //cada vez que se cambie el state de citas se vuelve a ejectutar



  // Funcion que tome las citas actuales y agregue las nuevas
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //Funcion que elimina una cita por su id
  const eliminarCita = id => {
    const citasCreadas = citas.filter( cita => cita.id !== id );
    guardarCitas (citasCreadas);
  }

  //Mensaje condicional

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador De Pacientes</h1>
    
      <div className="container">
        <div className="row">
          <div className = "one-half column">
            <Formulario
              crearCita = {crearCita}
            />
          </div>
          <div className = "one-half column">
            
            <h2>{titulo}</h2>            
            
            {citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita = {eliminarCita}              
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
