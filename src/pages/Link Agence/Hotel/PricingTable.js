import React, { useEffect } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";

function PricingTable({item11,item12,item13,item14,item21,item22,item23,item24,item31,item32,item33,item34,item41,item42,item43,item44}) {

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
                <td>{item11}</td>
                <td>{item12}</td>
                <td>{item13}</td>
                <td>{item14}</td>
              </tr>
              <tr>
                <th scope="row">Chambre single</th>
                <td>{item21}</td>
                <td>{item22}</td>
                <td>{item23}</td>
                <td>{item24}</td>
              </tr>
              <tr>
                <th scope="row">Chambre triple</th>
                <td>{item31}</td>
                <td>{item32}</td>
                <td>{item33}</td>
                <td>{item34}</td>
              </tr>
             
              <tr>
                <th  scope="row">Chambre quadruple</th>
                <td>{item41}</td>
                <td>{item42}</td>
                <td>{item43}</td>
                <td>{item44}</td>
              </tr>
    
            </MDBTableBody>
          </MDBTable>
        </MDBContainer>
      );
}

export default PricingTable