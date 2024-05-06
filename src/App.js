import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('');
  const [submittedValues, setSubmittedValues] = useState([]);
  const [error, setError] = useState(null);

  // Fetch submitted values from the server on component mount
  useEffect(() => {
    const fetchSubmittedValues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/values');
        // Extracting the 'value' property from each object in the response data array
        const values = response.data.map(item => item.value);
        setSubmittedValues(values);
        setError(null);
      } catch (error) {
        setError('Error fetching values: ' + error.message);
      }
    };
  
    fetchSubmittedValues();
  }, []);
  

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

