import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Flex, Box } from "rebass";
import { Modal, Select, MenuItem, Input, FormLabel } from "@mui/material";
import axios from "axios";

function AlertsModal({ sensorId, isOpen, closeAlertsModal }) {
  const [alerts, setAlerts] = useState([]);
  const [email, setEmail] = useState("");
  const [value, setCompareValue] = useState(0);
  const [relation, setComparisonOperator] = useState("equal");

  async function getAlerts() {
    try {
      const result = await axios.get("http://localhost:8080/alert/all");

      setAlerts(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function removeAlert(alertId) {
    try {
      // api.delete

      setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
    } catch (e) {
      console.log(e);
    }
  }

  async function addAlert() {
    try {
       const result = await axios.post("http://localhost:8080/alert/create", {
        sensorId: sensorId,
        email: email,
        value: value,
        relation: relation
      });
      // sensorId, email, compareValue, comparisonOperator
       setAlerts((prev) => prev.push(result.data));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (isOpen) {
      getAlerts();
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        open={isOpen}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Flex
          flexDirection={"column"}
          height="500px"
          width="700px"
          backgroundColor={"white"}
          padding="16px"
        >
          <Flex
            fontSize={24}
            paddingBottom="16px"
            justifyContent={"space-between"}
          >
            Alerts for {sensorId}
            <Box onClick={closeAlertsModal} style={{ userSelect: "none" }}>
              X
            </Box>
          </Flex>

          {!!alerts?.length && (
            <Box
              overflow={"auto"}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 50px 100px auto 100px",
                columnGap: "12px",
                rowGap: "8px",
                width: "100%",
              }}
            >
              <Flex>ID</Flex>
              <Flex>Value</Flex>
              <Flex>Operator</Flex>
              <Flex> Email</Flex>
              <Flex> </Flex>

              {alerts?.map((alert) => (
                <React.Fragment key={alert.id}>
                  <Flex>{alert.id}</Flex>
                  <Flex>{alert.value}</Flex>
                  <Flex>{alert.relation}</Flex>
                  <Flex>{alert.email}</Flex>
                  <Flex>
                    <Button
                      backgroundColor={"red"}
                      onClick={() => removeAlert(alert.id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </React.Fragment>
              ))}
            </Box>
          )}

          <Flex
            marginTop="auto"
            justifyContent={"flex-end"}
            paddingTop="16px"
            alignItems="center"
          >
            <Flex width="200px" px="16px" flexDirection={"column"}>
              <FormLabel> Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </Flex>

            <Flex px="16px">Value</Flex>

            <Select
              value={relation}
              onChange={({ target }) => setComparisonOperator(target.value)}
            >
              <MenuItem value={"less"}>{"less than"}</MenuItem>
              <MenuItem value={"equal"}>{"equal"}</MenuItem>
              <MenuItem value={"greater"}>{"greater than"}</MenuItem>
            </Select>

            <Flex width="100px" px="16px">
              <Input
                type="number"
                value={value}
                onChange={({ target }) => setCompareValue(target.value)}
              />
            </Flex>

            <Button
              backgroundColor="#00ff00"
              color="#000000"
              onClick={addAlert}
            >
              Add Alert
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}

AlertsModal.propTypes = {
  sensorId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeAlertsModal: PropTypes.func.isRequired,
};

AlertsModal.defaultProps = {};

export default AlertsModal;
