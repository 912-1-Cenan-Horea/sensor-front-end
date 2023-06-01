import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Flex, Box } from "rebass";
import pencil from "./pencil.png";
import bell from "./bell.png";
import { Switch } from "@mui/material";
import NameModal from "../NameModal";
import AlertsModal from "../AlertsModal";

const ELEMENT_HEIGHT = 40;
const TOLERANCE = 50;

function Sensor({ id, name }) {
  const dataRef = useRef(null);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [data, setData] = useState([{ timestamp: 1, value: 1, unit: "as" }]);

  // setInterval(() => {
  //   if (isSubscribed) {
  //     const newData = [
  //       ...data,
  //       { timestamp: data.length, value: data.length, unit: "as" },
  //     ];

  //     setData(newData);
  //   }
  // }, 2000);

  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);

  function openNameModal() {
    setIsNameModalOpen(true);
  }

  function closeNameModal() {
    setIsNameModalOpen(false);
  }

  function subUnsub() {
    setIsSubscribed(!isSubscribed);
  }

  function closeAlertsModal() {
    setIsAlertsModalOpen(false);
  }

  function openAlertsModal() {
    setIsAlertsModalOpen(true);
  }

  return (
    <>
      <NameModal
        sensorId={id}
        isNameModalOpen={isNameModalOpen}
        name={name}
        closeNameModal={closeNameModal}
      />
      <AlertsModal
        sensorId={id}
        isOpen={isAlertsModalOpen}
        closeAlertsModal={closeAlertsModal}
      />

      <Flex
        width="400px"
        height="300px"
        padding="12px"
        margin="16px"
        backgroundColor="#e1e6e2"
        flexDirection="column"
      >
        <Flex width="100%" fontSize={24} justifyContent={"space-between"}>
          <Box>SensorId: {id}</Box>
          {name && (
            <Flex justifyContent={"center"}>
              {name}
              <img
                src={pencil}
                alt="edit"
                height="24px"
                style={{ marginLeft: "8px" }}
                onClick={openNameModal}
              />
            </Flex>
          )}
        </Flex>

        {!!data?.length && (
          <>
            <Box
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                columnGap: "12px",
                rowGap: "8px",
                width: "100%",
              }}
            >
              <Flex>Timestamp</Flex>
              <Flex>Value</Flex>
            </Box>
            <Box
              ref={dataRef}
              overflow="auto"
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                columnGap: "12px",
                width: "100%",
              }}
            >
              {data?.map((alert) => (
                <React.Fragment key={alert.id}>
                  <Flex height={ELEMENT_HEIGHT}>{alert.timestamp}</Flex>
                  <Flex height={ELEMENT_HEIGHT}>
                    {alert.value}
                    {alert.unit}
                  </Flex>
                </React.Fragment>
              ))}
            </Box>
          </>
        )}

        <Flex
          justifyContent="space-between"
          marginTop={"auto"}
          alignItems="center"
        >
          <Flex alignItems="center">
            <img
              src={bell}
              height="24px"
              alt="bell"
              onClick={openAlertsModal}
            ></img>
          </Flex>
          <Flex alignItems="center">
            {isSubscribed ? "Subscribed" : "Not Subscribed"}
            <Switch checked={isSubscribed} onChange={subUnsub}></Switch>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

Sensor.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
};

Sensor.defaultProps = {
  name: "",
};

export default Sensor;
