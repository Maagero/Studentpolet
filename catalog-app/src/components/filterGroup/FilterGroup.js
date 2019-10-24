import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nouislider from 'react-nouislider';
import 'nouislider';
import 'nouislider/distribute/nouislider.css';
import wNumb from 'wnumb';
import './FilterGroup.css'
import { inject, observer } from 'mobx-react';

var filterData = require("./FilterData")

let buttonsStyle = {
    margin: "5px",
};

let selectedButtonStyle = {
    background: "#6c757d",
    margin: "5px",
    color: "white",
};

class FilterGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distinctCountries: filterData.distinctCountries,
            distinctPackaging: filterData.distinctPackaging,
            distinctProductSelection: filterData.distinctProductSelection,
            selectedCountryFilter: "",
            selectedPackagingFilter: "",
            selectedProductSelectionFilter: "",
        };
        this.selectButton = this.selectButton.bind(this);
    }
    selectButton(filterGroup, name, i) {
        if (filterGroup === 0) {
            this.setState({ selectedCountryFilter: i });
            this.props.filterStore.addCountryFilter(name);
        } else if (filterGroup === 1) {
            this.setState({ selectedPackagingFilter: i });
            this.props.filterStore.addPackagingFilter(name);
        } else if (filterGroup === 2) {
            this.setState({ selectedProductSelectionFilter: i });
            this.props.filterStore.addProductSelectionFilter(name);
        }
        // Reset Pagination
        this.props.paginationStore.firstPage()
    }

    renderFilters(filterGroup, buttonNames, selectedFilter) {
        const buttons = buttonNames.map((name, i) => {
            const buttonStyle = i === selectedFilter ? selectedButtonStyle : buttonsStyle;
            return (
                <Button onClick={() => { this.selectButton(filterGroup, name, i) }} key={i} id={i} style={buttonStyle} variant="outline-secondary">{name}</Button>
            )
        });
        return buttons
    };

    handleYearSliderUpdate = (render, handle, value, un, percent) => {
        this.props.filterStore.addYearMinFilter(parseInt(value[0].toFixed(0)));
        this.props.filterStore.addYearMaxFilter(parseInt(value[1].toFixed(0)));
        // Reset Pagination
        this.props.paginationStore.firstPage()
    }

    handlePriceSliderUpdate = (render, handle, value, un, percent) => {
        this.props.filterStore.addPriceMinFilter(parseInt(value[0].toFixed(0)));
        this.props.filterStore.addPriceMaxFilter(parseInt(value[1].toFixed(0)));
        // Reset Pagination
        this.props.paginationStore.firstPage()
    }

    resetFilters = () => {
        this.setState({
            selectedCountryFilter: "",
            selectedPackagingFilter: "",
            selectedProductSelectionFilter: "",
            yearMinFilter: 1930,
            yearMaxFilter: 2019,
            priceMinFilter: 1,
            priceMaxFilter: 50000,
        })
        // Reset filters
        this.props.filterStore.addCountryFilter("");
        this.props.filterStore.addPackagingFilter("");
        this.props.filterStore.addProductSelectionFilter("");
        this.props.filterStore.addYearMinFilter("");
        this.props.filterStore.addYearMaxFilter("");
        this.props.filterStore.addPriceMinFilter(1);
        this.props.filterStore.addPriceMaxFilter(50000);

        // Reset Pagination
        this.props.paginationStore.firstPage()
    }

    render() {

        return (
            <div className="filterContainer">
                <Accordion>
                    <Card>
                        <Card.Header className="filterHeader">
                            <h5 style={{ display: "inline-block" }}>Filtrering</h5>
                            <div onClick={this.resetFilters} className="reset_button" variant="outline-secondary">
                                <img src="/cancel_icon.svg" alt="x" className="cancel_icon"></img>
                                <p className="reset_text" style={{ display: "inline-block" }}>Nullstill filtrering</p>
                            </div>

                        </Card.Header>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0" className="cardHeader">
                            Land
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {this.renderFilters(0, this.state.distinctCountries, this.state.selectedCountryFilter)}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1" className="cardHeader">
                            Årgang
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <div className="slider">
                                    <Nouislider
                                        range={{ min: 1930, max: 2019 }}
                                        step={1}
                                        connect={true}
                                        start={[parseInt(this.props.filterStore.yearMinFilter), parseInt(this.props.filterStore.yearMaxFilter)]}
                                        tooltips
                                        format={wNumb({ decimals: 0 })}
                                        onChange={this.handleYearSliderUpdate}
                                    />
                                    <p className="sliderValues">{this.props.filterStore.yearMinFilter} - {this.props.filterStore.yearMaxFilter}</p>
                                </div>

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2" className="cardHeader">
                            Pris
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <div className="slider">
                                    <Nouislider
                                        range={{
                                            'min': [1],
                                            '10%': [100, 10],
                                            '50%': [500, 100],
                                            '70%': [2000, 1000],
                                            'max': [50000, 10000]
                                        }}
                                        step={1}
                                        connect={true}
                                        start={[this.props.filterStore.priceMinFilter, this.props.filterStore.priceMaxFilter]}
                                        tooltips={true}
                                        format={wNumb({ decimals: 0 })}
                                        onChange={this.handlePriceSliderUpdate}
                                    />
                                    <p className="sliderValues">{this.props.filterStore.priceMinFilter} - {this.props.filterStore.priceMaxFilter}</p>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="3" className="cardHeader">
                            Emballasjetype
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                {this.renderFilters(1, this.state.distinctPackaging, this.state.selectedPackagingFilter)}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="4" className="cardHeader">
                            Produktutvalg
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                {this.renderFilters(2, this.state.distinctProductSelection, this.state.selectedProductSelectionFilter)}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        );
    }
}

export default inject("filterStore", "paginationStore")(observer(FilterGroup));