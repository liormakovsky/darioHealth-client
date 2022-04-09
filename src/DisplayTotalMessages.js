import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalMessages, getInputsValues } from "./redux";
import { Table, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AsyncSelect from "react-select/async";
import Select from "react-select";

const DisplayTotalMessages = () => {
  const dispatch = useDispatch();
  const { totals, inputs, isLoading } = useSelector(
    (state) => state.messagesReducer
  );

  const [startDate, setStartDate] = useState(new Date("2022/04/01"));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    if (Object.keys(selectedOptions).length > 0) {
      getTotals();
    }
    getInputValues();
    setSelectedOptions({
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
    });
  }, [inputs]);

  //fetch the totals for the table
  const getTotals = () => {
    if (Object.keys(totals).length === 0) {
      dispatch(getTotalMessages(selectedOptions));
    }
  };

  //fetch the countries and the users data for the select inputs
  const getInputValues = () => {
    if (Object.keys(inputs).length === 0) {
      dispatch(getInputsValues());
    }
  };

  //return countries data for the select input
  const getCountriesForSelect = async () => {
    return inputs.countries;
  };

  //return users data for the select input
  const getUsersForSelect = async () => {
    return inputs.users;
  };

  //styling for the select inputs
  const style = {
    control: (base) => ({
      ...base,
      border: "1px solid #4F4F4F",
    }),
  };

  //add selected country to selectedOption obj
  const handleCountry = (option) => {
    setSelectedOptions((selectedOptions) => ({
      ...selectedOptions,
      countryId: option.cnt_id,
    }));
  };

  //add selected user to selectedOption obj
  const handleUser = (option) => {
    setSelectedOptions((selectedOptions) => ({
      ...selectedOptions,
      userId: option.id,
    }));
  };

  //add selected start date to selectedOption obj
  const handleStartDate = (date) => {
    setStartDate(date);
    setSelectedOptions((selectedOptions) => ({
      ...selectedOptions,
      startDate: date.toLocaleDateString(),
    }));
  };

  //add selected end date to selectedOption obj
  const handleEndDate = (date) => {
    setEndDate(date);
    setSelectedOptions((selectedOptions) => ({
      ...selectedOptions,
      endDate: date.toLocaleDateString(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getTotalMessages(selectedOptions));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={1}></Col>
          <Col lg={10} className="d-flex align-items-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>From</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleStartDate(date)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>To</Form.Label>
              <DatePicker
                selected={endDate}
                onChange={(date) => handleEndDate(date)}
              />
            </Form.Group>

            <Form.Group className="mb-3 ms-3" style={{ width: "200px" }}>
              <Form.Label>Country</Form.Label>
              {Object.keys(inputs).length > 0 ? (
                <>
                  <AsyncSelect
                    styles={style}
                    cacheOptions
                    defaultOptions
                    getOptionLabel={(e) => e.cnt_title}
                    getOptionValue={(e) => e.cnt_id}
                    loadOptions={(e) => getCountriesForSelect(e)}
                    placeholder={"Select Country"}
                    onChange={handleCountry}
                  />
                </>
              ) : (
                <>
                  <Select styles={style} placeholder={"Please wait.."} />
                </>
              )}
            </Form.Group>

            <Form.Group className="mb-3 ms-4" style={{ width: "200px" }}>
              <Form.Label>User</Form.Label>
              {Object.keys(inputs).length > 0 ? (
                <>
                  <AsyncSelect
                    styles={style}
                    cacheOptions
                    defaultOptions
                    getOptionLabel={(e) => e.usr_name}
                    getOptionValue={(e) => e.id}
                    loadOptions={(e) => getUsersForSelect(e)}
                    placeholder={"Select User"}
                    onChange={handleUser}
                  />
                </>
              ) : (
                <>
                  <Select styles={style} placeholder={"Please wait.."} />
                </>
              )}
            </Form.Group>

            <Button
              variant="outline-primary"
              className="mt-2 ms-5"
              type="submit"
              disabled={isLoading}
            >
              Search
            </Button>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Form>

      <Row>
        <Col lg={1}></Col>
        <Col lg={10}>
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>Date</th>
                <th>Successfully sent</th>
                <th>Failed</th>
              </tr>
            </thead>
            <tbody>
              {totals.length ? (
                <>
                  {totals.map((total) => {
                    return (
                      <tr className="text-center" key={total.date}>
                        <td>{total.date}</td>
                        <td>{total.total_success}</td>
                        <td>{total.total_failed}</td>
                      </tr>
                    );
                  })}
                </>
              ) : isLoading ? (
                <>
                  <tr className="text-center">
                    <td></td>
                    <td>Please wait...</td>
                    <td></td>
                  </tr>
                </>
              ) : (
                <>
                  <tr className="text-center">
                    <td></td>
                    <td>No Data To Display</td>
                    <td></td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
        </Col>
        <Col lg={1}></Col>
      </Row>
    </>
  );
};

export default DisplayTotalMessages;
