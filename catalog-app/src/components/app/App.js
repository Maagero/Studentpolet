import React from 'react';
import './App.css';
import { decorate, observable, action, computed } from 'mobx';
import Table from '../table/Table';
import CatalogStore from '../../stores/CatalogStore';
import FilterGroup from '../filter/FilterGroup'
import Header from '../header/Header'
import ModalContainer from '../modalContainer/ModalContainer'
import SearchBar from '../searchBar/SearchBar';

decorate(CatalogStore, {
  searchBarValue: observable,
  countryFilter: observable,
  packagingFilter: observable,
  productSelectionFilter: observable,
  yearMinFilter: observable,
  yearMaxFilter: observable,
  priceMinFilter: observable,
  priceMaxFilter: observable,
  addSearchBarValue: action,
  addCountryFilter: action,
  addPackagingFilter: action,
  addProductSelectionFilter: action,
  addYearMinFilter: action,
  addYearMaxFilter: action,
  addPriceMinFilter: action,
  addPriceMaxFilter: action,
  getSearchBarValue: computed
})

const catalogStore = new CatalogStore();

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Header />
        <div className="col-md-4">
        <SearchBar store={catalogStore}/>
        <FilterGroup store={catalogStore}/>
        <ModalContainer />
        </div>
        <div className="col-md-8">
        <Table store={catalogStore}/>
        </div>
      </div>
    </div>
  );
}

export default App;
