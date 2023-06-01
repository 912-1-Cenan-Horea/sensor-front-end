import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Flex, Box } from "rebass";
import { Modal } from "@mui/material";
import { Input } from "@mui/material";
import axios from "axios";

function NameModal({ sensorId, isNameModalOpen, name, closeNameModal }) {
  const [newName, setNewName] = useState(name);

  async function onSave() {
    try {
      await axios.put(`http://localhost:8080/sensor/rename`, {
        sensorId: sensorId,
        name: newName,
      });
      closeNameModal();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Modal
      open={isNameModalOpen}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Flex
        flexDirection={"column"}
        height="250px"
        width="350px"
        backgroundColor={"white"}
        padding="16px"
      >
        <Box fontSize={24} paddingBottom="16px">
          Change Name for Sensor {sensorId}
        </Box>
        <Input
          onChange={(event) => {
            setNewName(event.target.value);
          }}
          value={newName}
          style={{ border: "1px solid black" }}
        ></Input>
        <Flex marginTop="auto" justifyContent={"flex-end"}>
          <Button
            backgroundColor="light-grey"
            color="#000000"
            marginRight="16px"
            onClick={closeNameModal}
          >
            Cancel
          </Button>
          <Button backgroundColor="#00ff00" color="#000000" onClick={onSave}>
            Save
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
}

NameModal.propTypes = {
  sensorId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isNameModalOpen: PropTypes.bool.isRequired,
  closeNameModal: PropTypes.func.isRequired,
};

NameModal.defaultProps = {};

export default NameModal;
