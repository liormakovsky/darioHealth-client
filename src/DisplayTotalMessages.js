import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getTotalMessages } from "./redux";
import { Table, Row, Col } from "react-bootstrap";

const DisplayTotalMessages = () => {
  const dispatch = useDispatch();
  const { isLoading, totals } = useSelector((state) => state.messagesReducer);

  useEffect(() => {
    dispatch(getTotalMessages());
  }, []);

  if (isLoading) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <FaSpinner icon="spinner" className="spinner" />
      </div>
    );
  }

  if (totals.length === 0) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <h1>Please upload a file</h1>
      </div>
    );
  }

  return (
    <>
      <Row>
        <Col lg={1}></Col>
        <Col lg={10}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Successfully sent</th>
                <th>Failed</th>
              </tr>
            </thead>
            <tbody>
              {totals.map((total) => {
                return (
                  <tr key={total.date}>
                    <td>{total.date}</td>
                    <td>{total.total_success}</td>
                    <td>{total.total_failed}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col lg={1}></Col>
      </Row>
    </>
  );
};

export default DisplayTotalMessages;
