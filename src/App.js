import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('');
  const [submittedValues, setSubmittedValues] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/values', { value });

      setSubmittedValues([...submittedValues, response.data.value]);
      setValue('');
      setError(null);
    } catch (error) {
      setError('Error storing value: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Submit a Value</h1>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      
      {error && <p>{error}</p>}
      
      <h2>Submitted Values</h2>
      <ul>
        {submittedValues.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

