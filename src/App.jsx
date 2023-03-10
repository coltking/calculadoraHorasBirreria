import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [horaEntradaActual, setHoraEntradaActual] = useState(0);
  const [horaSalidaActual, setHoraSalidaActual] = useState(0);
  const [datosHoras, setDatosHoras] = useState({ entra: [], sale: [] });
  const [totalHoras, setTotalHoras] = useState(0);
  const [valorHora, setValorHora] = useState(0)
  useEffect(() => {
    setTotalHoras(calcularHoras(datosHoras.entra, datosHoras.sale));
    console.log(datosHoras);
  }, [datosHoras]);
  const HandleChangeValorHora = (e) => {
    e.preventDefault()
    setValorHora(parseInt(e.target.value))
  }
  const HandleClick = (e) => {
    e.preventDefault();
    if (horaEntradaActual != 0 || horaSalidaActual != 0) {
      setDatosHoras({
        entra: [...datosHoras.entra, parseInt(horaEntradaActual)],
        sale: [...datosHoras.sale, parseInt(horaSalidaActual)],
      });
      setHoraEntradaActual(0);
      setHoraSalidaActual(0);
    }
  };
  const HandleClean = () => {
    setDatosHoras({ entra: [], sale: [] });
    setTotalHoras(0);
  };
  function convertirHora(numero) {
    var horas = Math.floor(numero);
    var minutos = Math.round((numero - horas) * 60);
    if (minutos === 60) {
      horas++;
      minutos = 0;
    }
    var horasString = (horas < 10) ? "0" + horas : "" + horas;
    var minutosString = (minutos < 10) ? "0" + minutos : "" + minutos;
    return horasString + ":" + minutosString;
  }
  function convertirHoraRevez(hora) {
    var partes = hora.split(":");
    var horas = parseInt(partes[0]);
    var minutos = parseInt(partes[1]);
    var numero = horas + minutos / 60;
    return parseFloat(numero.toFixed(2));
  }
  const calcularHoras = (horariosEntrada, horariosSalida) => {
    if (horariosEntrada.length === horariosSalida.length) {
      const reduccion = horariosSalida.reduce((acc, act, index) => {
        if (act < 10) {
          return acc + (24 - parseInt(horariosEntrada[index])) + act;
        } else {
          return acc + (act - parseInt(horariosEntrada[index]));
        }
      }, 0);
      console.log(reduccion);
      return reduccion;
    } else {
      console.error('entrada y salida tienen diferentes valores');
    }
  };

  //calcularHoras([18, 18, 18, 18], [19,19,19,1.25])
  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "self-start" }}>
        <label>DIAS DE TRABAJO: {datosHoras.entra.length}</label>
        <label>HORAS TRABAJADAS: {totalHoras}</label>
        <label>SALDO A COBRAR: {totalHoras * valorHora}</label>
      </div>
      <label>Valor hora: $ </label> <input type="number" value={valorHora} onChange={HandleChangeValorHora} />
      <div style={{ display: "flex", flexDirection: "row", alignItems: "self-start", margin: "10px 0px" }}>
        <label>Entra:</label>
        <input
          type="time"
          value={convertirHora(horaEntradaActual)}
          onChange={(e) => {
            e.preventDefault();
            setHoraEntradaActual(convertirHoraRevez(e.target.value));
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "self-start", margin: "10px 0px" }}>
        <label>Sale:</label>
        <input
          type="time"
          value={convertirHora(horaSalidaActual)}
          onChange={(e) => {
            e.preventDefault();
            console.log(convertirHoraRevez(e.target.value));
            setHoraSalidaActual(convertirHoraRevez(e.target.value));
          }}
        />
      </div>
      <button onClick={HandleClick}>sumar</button>
      <div>
        <button onClick={HandleClean}>Limpiar Horas</button>
      </div>
    </div>
  );
}

export default App;
