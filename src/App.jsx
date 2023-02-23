import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [entra, setEntra] = useState(0);
  const [sale, setSale] = useState(0);
  const [horas, setHoras] = useState({ entra: [], sale: [] });
  const [totalHoras, setTotalHoras] = useState(0);
  const [valorHora, setValorHora] =useState(0)
  useEffect(() => {
    setTotalHoras(calcularHoras(horas.entra, horas.sale));
  }, [horas]);
  const HandleChangeValorHora = (e) => {
    e.preventDefault()
    setValorHora(parseInt(e.target.value))
  }
  const HandleClick = (e) => {
    e.preventDefault();
    if (entra != 0 || sale != 0) {
      setHoras({
        entra: [...horas.entra, parseInt(entra)],
        sale: [...horas.sale, parseInt(sale)],
      });
      setEntra(0);
      setSale(0);
      console.log(entra, sale, horas);
    }
  };
  const HandleClean = () => {
    setHoras({ entra: [], sale: [] });
    setTotalHoras(0);
  };
  const calcularHoras = (hsIn, hsOut) => {
    if (hsIn.length === hsOut.length) {
      const reduccion = hsOut.reduce((acc, act, index) => {
        if (act < 10) {
          return acc + (24 - parseInt(hsIn[index])) + act;
        } else {
          return acc + (act - parseInt(hsIn[index]));
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
      <div style={{display:"flex",flexDirection:"column",alignItems:"self-start"}}>
        <label>DIAS DE TRABAJO: {horas.entra.length}</label>
        <label>HORAS TRABAJADAS: {totalHoras}</label>
        <label>SALDO A COBRAR: {totalHoras * valorHora}</label>
      </div>
        <label>Valor hora: $ </label> <input type="number" value={valorHora} onChange={HandleChangeValorHora}/>
      <div style={{display:"flex",flexDirection:"row",alignItems:"self-start",margin:"10px 0px"}}>
        <label>Entra:</label>
        <input
          type="number"
          value={entra}
          onChange={(e) => {
            e.preventDefault();
            setEntra(e.target.value);
          }}
        />
      </div>
      <div style={{display:"flex",flexDirection:"row",alignItems:"self-start",margin:"10px 0px"}}>
        <label>Sale:</label>
        <input
          type="number"
          value={sale}
          onChange={(e) => {
            e.preventDefault();
            setSale(e.target.value);
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
