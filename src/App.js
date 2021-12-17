import { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import api from './services/api';
import './styles.css';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert('Insira algum CEP!');
      return;
    }

    try{
      const response = await api.get(`${input}/json/`);
      setCep(response.data);
      setInput('');
    } catch {
      alert('Erro na consulta!');
      setInput('');
      setCep('');
    }
  };

  return (
    <div className="container">
        <h1 className='tittle'>Buscador CEP</h1>

        <div className='containerInput'>
          <input
          type='text'
          placeholder='Digite o CEP desejado'
          value={input}
          onChange={(e) => { setInput(e.target.value)}}
          />

          <button className='buttonSearch' onClick={handleSearch}>
            <FiSearch size={25} color='#fff'/>
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2> CEP: {cep.cep}</h2>

            {cep.logradouro != '' && (<span>{cep.logradouro}</span>)}
            {cep.complemento != '' && (<span>Complemento: {cep.complemento}</span>)}
            {cep.bairro != '' && (<span>{cep.bairro}</span>)}
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}
    </div>
  );
}

export default App;
