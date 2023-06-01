import { useEffect, useState } from "react";
import Sensor from "./components/Sensor";
import axios from "axios";
import { Flex } from "rebass";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  font-family: sans-serif;
  font-size: 16;

  * {
   box-sizing: border-box;
  }
`;

function App() {
  const [sensors, setSensors] = useState([]);

  async function getAllSensors() {
    try{
      const sensorsList = (await axios.get("http://localhost:8080/sensor/all",{
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }));
      setSensors(sensorsList.data);
    }
    catch(e){
      console.log(e);
    }
    
  }

  useEffect(() => {
    getAllSensors();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Flex flexWrap="wrap">
        {sensors.map((sensor) => (
          <Sensor {...sensor} key={sensor.id} />
        ))}
      </Flex>
    </>
  );
}

export default App;
