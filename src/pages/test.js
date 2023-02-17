import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";

export default function Test() {
  return (
    <MDBContainer className="py-5 text-center">
      <MDBTable
        responsive
        striped
        className="text-successtable-border border-light"
      >
        <MDBTableHead className="border-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">
              <strong>Demi pension</strong>
            </th>
            <th scope="col">
              <strong>Pension Complete</strong>
            </th>
            <th scope="col">
              <strong>All inclusive soft</strong>
            </th>
            <th scope="col">
              <strong>All inclusive</strong>
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <th scope="row">Chambre double</th>
            <td>700 MB</td>
            <td>1,5 GB</td>
            <td>50 GB</td>
            <td>up to 5T</td>
          </tr>
          <tr>
            <th scope="row">Chambre single</th>
            <td>
              <MDBIcon fas icon="check" />
            </td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
          </tr>
          <tr>
            <th scope="row">Chambre triple</th>
            <td>-</td>
            <td>Optional</td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
          </tr>
         
          <tr>
            <th  scope="row">Chambre quadruple</th>
            <td>-</td>
            <td>-</td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
          </tr>

        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}