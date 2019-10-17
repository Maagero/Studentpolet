import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { decorate, action } from 'mobx';
import CatalogStore from '../../stores/CatalogStore';
import BootstrapTable from 'react-bootstrap-table-next';
import './CustomTable.css'

decorate(CatalogStore, {
  expandRow: action,
})

const catalogStore = new CatalogStore();

const GET_PRODUCTQUERY = gql`
  {
    productQuery(Keys:"", Year:"2019", Skipping:0) {
      Varenummer
      Varenavn
      Volum
      Pris
      Literpris
      Varetype
      Produktutvalg
      Fylde
      Friskhet
      Garvestoffer
      Bitterhet
      Sodme
      Smak
      Land
      Argang
      Rastoff
      Alkohol
      Emballasjetype
      Vareurl
    }
  }`;

const columns = [{
  dataField: 'Varenummer',
  text: 'Varenummer'
}, {
  dataField: 'Varenavn',
  text: 'Varenavn'
}, {
  dataField: 'Pris',
  text: 'Pris (i kr)'
}
];

const expandRow = {
  renderer: row => (
    <div class="container">
      <div class="row">
        <div class="col-sm text-center">
        <img
          src={"https://bilder.vinmonopolet.no/cache/250x250-0/"+ row.Varenummer + "-1.jpg"}
          alt="Item"
        />
        </div>
        <div class="col-sm">
          <p>{ `Varenummer: ${row.Varenummer}` }</p>
          <p>{ `Varenavn: ${row.Varenavn}` }</p>
          <p>{ `Varetype: ${row.Varetype}` }</p>
          <p>{ `Land: ${row.Land}` }</p>
        </div>
        <div class="col-sm">
          <p>{ `Volum: ${row.Volum} liter` }</p>
          <p>{ `Alkoholprosent: ${row.Alkohol}%` }</p>
          <p>{ `Årgang: ${row.Argang}` }</p>
          <p>{ `Smak: ${row.Smak}` }</p>
        </div>
        <div class="col-sm">
          <p>{ `Pris: ${row.Pris} kr` }</p>
          <p>{ `Literpris: ${row.Literpris} kr` }</p>
        </div>
      </div>
    </div>
  ),
  className: 'expandedRow',
  parentClassName: 'parentExpandedRow'
};

export default class CustomTable extends Component {

  render() {
    return (
      <Query query={GET_PRODUCTQUERY}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <div className="container">
              <h3>
                LIST OF PRODUCTS
              </h3>
              <h4><Link to="/create">Add Product</Link></h4>
              <div class="card">
              <BootstrapTable
                id="table"
                headerClasses="tableHeader"
                keyField='Varenummer'
                data={ data.productQuery }
                columns={ columns }
                expandRow={ expandRow }
                bootstrap4={true}
                hover={true}
                bordered={true}
              /></div>
            </div>
          );
        }}
      </Query>
    );
  }
}