import { useState,useEffect } from 'react';
import './App.css';

function App() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [discount, setDiscount] = useState('');
  const [totalHours, setTotalHours] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const storage = window.localStorage;
  const calculateHours = () => {
    const start = new Date(`01/01/2000 ${startTime}`);
    const end = new Date(`01/01/2000 ${endTime}`);
    
    
    // If end time is before start time, assume it is for the next day
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }

    const hours = (end - start) / (1000 * 60 * 60);
    const newTotalHours = totalHours + hours;
    storage.setItem("datos", JSON.stringify({
      totalHours: newTotalHours
    }))
    setTotalHours(newTotalHours);
  };

  const calculateEarnings = () => {
    const earnings = totalHours * hourlyRate - discount;
    setTotalEarnings(earnings);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEarnings();
  };

  const resetHoursAndEarnings = () => {
    storage.setItem("datos", JSON.stringify({
      totalHours: 0,
    }))
    setTotalHours(0);
    setTotalEarnings(0);
  };
  useEffect(() => {
    let datos = JSON.parse(storage.getItem("datos"));
    if (!datos?.totalHours) {
      storage.setItem("datos", JSON.stringify({
        totalHours: 0,
      }))
    }
    setTotalHours(datos.totalHours > 0 ? datos.totalHours : 0)
    calculateEarnings()
  },[totalHours,hourlyRate])
  const subtractTotalHours = (e) => {
    e.preventDefault()

    const start = new Date(`01/01/2000 ${startTime}`);
    const end = new Date(`01/01/2000 ${endTime}`);
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }
    const hours = (end - start) / (1000 * 60 * 60);
    const newTotalHours = totalHours - hours;
    storage.setItem("datos", JSON.stringify({
      totalHours: newTotalHours < 0 ? 0 : newTotalHours,
    }))
    setTotalHours(newTotalHours < 0 ? 0: newTotalHours);
  };
 
  return (
    <div className="App">
      <form onSubmit={handleSubmit} style={{display:"flex",flexDirection: "column"}}>
        <label style={{backgroundColor: "lightgreen",border:"1px solid darkgreen"}}>
          Hora entrada:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label style={{backgroundColor: "lightBlue",border:"1px solid blue"}}>
          Hora salida:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <label>
          Valor por hora: $
          <input
            type="number"
            step="0.01"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
          />
        </label>
        <label>
          Descuento(vale/cons):
          <input
            type="number"
            step="10.00"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </label>
        <button type="submit" style={{backgroundColor: "greenyellow",}} onClick={(e) => {  
          e.preventDefault()    
    calculateHours();
        }}>Añadir</button>
        <button onClick={subtractTotalHours} style={{backgroundColor: "darkred",color: "white"}}>Remover</button>
      </form>
      <div>
        <p>Total Horas trabajadas: {totalHours.toFixed(2)}hs</p>
        <p>Total sueldo: ${totalEarnings.toFixed(2)}</p>
        <button onClick={resetHoursAndEarnings}>Reiniciar</button>
      </div>
    </div>
  );
}

export default App;