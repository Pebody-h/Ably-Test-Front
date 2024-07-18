import { useState } from 'react'
import './App.css'
import { useConnectionStateListener, useChannel } from 'ably/react';
import axios from 'axios';

function App() {
  const [numbers, setNumbers] = useState<any>([]);
  const [inputNumber, setInputNumber] = useState('');

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });

  const { channel } = useChannel('data-sync', 'number-created', (message) => {
    console.log("es esto bebe", message);
    setNumbers((previousMessages: any) => [...previousMessages, message]);
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://34.133.167.32:3000/insert-number', {
        value: inputNumber,
      });
      console.log(response.data);
      await channel.publish('first', 'Here is my first message!')
      alert('Datos enviados exitosamente');
    } catch (error) {
      console.error(error);
      alert('Error al enviar los datos');
    }
  };

  return (
    <>
      <div>
        <h1>Crear Número</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="dataInput">Ingrese un numero:</label>
          <input
            type="number"
            id="dataInput"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
        <h3>Tiempo de creación de números</h3>
        {
          numbers.map((message: any) => {
            const dateString = new Date(message.timestamp).toString();
            return <p key={message.id}>{dateString}</p>;
          })
        }
      </div>
    </>
  )
}

export default App
