import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";

const DatePickerComp = ({ label, selected, handleStartDate }) => {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <DatePicker
          selected={selected}
          onChange={(date) => handleStartDate(date)}
        />
      </Form.Group>
    </div>
  );
};

export default DatePickerComp;
