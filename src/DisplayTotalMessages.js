import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalMessages, getInputsValues } from "./redux";
import { Table, Row, Col, Form, Button } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import DatePickerComp from "./components/DatePickerComp.js";
import TableRow from "./components/TableRow.js";

const DisplayTotalMessages = () => {
  const dispatch = useDispatch();
  const { totals, inputs, isLoading } = useSelector(
    (state) => state.messagesReducer
  );

  const [startDate, setStartDate] = useState(new Date("2022/04/01"));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    getTotals();
    getInputValues();
  }, [inputs]);

  const inputsLength = Object.keys(inputs).length;
  const totalsLength = Object.keys(totals).length;
  const selectsLength = Object.keys(selectedOptions).length;

  //fetch the totals for the table
  const getTotals = () => {
    setSelectedOptions({
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
    });
    if (totalsLength === 0 && selectsLength > 0) {
      //dates also sent to server
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
            <DatePickerComp
              label="From"
              selected={startDate}
              handleStartDate={handleStartDate}
            />
            <DatePickerComp
              label="To"
              selected={endDate}
              handleStartDate={handleEndDate}
            />
            <Form.Group className="mb-3 ms-3" style={{ width: "200px" }}>
              <Form.Label>Country</Form.Label>
              {inputsLength > 0 ? (
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
              {inputsLength > 0 ? (
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
                    return <TableRow {...total} key={total.date} />;
                  })}
                </>
              ) : isLoading ? (
                <TableRow placeHolder="Please Wait..." />
              ) : (
                <TableRow placeHolder="No Data To Display" />
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
