import React from 'react';
import { useState } from "react";
import {useQuery} from 'react-query';

import { Wrapper } from './App.styles';
import Item from './Item/Item';
import { LinearProgress ,Button, Grid } from '@mui/material';
import SearchBar from './SearchBar/SearchBar';
import Results from './Results/Results';


const App = () => {
  const [dataFromChildComponent1, setDataFromChildComponent1] = useState<string>("");

  const handleDataFromChildComponent1 = (data: string) => {
    setDataFromChildComponent1(data);
  };
  
  return (
    <div className="App">
      <Wrapper>
        <SearchBar onSubmit={handleDataFromChildComponent1}></SearchBar>
        <Results term={dataFromChildComponent1}></Results>
      </Wrapper>
    </div>
  );
}



export default App;
