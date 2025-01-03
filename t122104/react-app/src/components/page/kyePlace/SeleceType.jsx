import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SelectType = ({ setSelectedType }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/keyPlace/lab/selectType')
      .then(response => {
        if (response.data && Array.isArray(response.data.types)) {
          setTypes(response.data.types);
        } else {
          console.error('Invalid response:', response.data);
        }
      })
      .catch(error => console.error('Error fetching types:', error));
  }, []);

  const handleChange = (event) => {
    setSelectedType(event.target.value); // 親に選択された値を渡す
  };

  return (
    <div>
      <h2>種類を選択してください</h2>
      <form>
        {types.map((type, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`type-${index}`}
              name="type"
              value={type}
              onChange={handleChange}
            />
            <label htmlFor={`type-${index}`}>{type}</label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default SelectType;
