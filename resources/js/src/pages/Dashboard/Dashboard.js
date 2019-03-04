import React, { Component } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import color from 'rcolor';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Card,CardBody,CardTitle,TabContent, TabPane, Nav, NavItem, NavLink, Row, Col ,Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,Breadcrumb ,BreadcrumbItem } from 'reactstrap';
import InfoPanelRow from './partials/InfoPanelRow';
import ChartSection from './partials/ChartSection';
import DoughnutCard from './partials/DoughnutCard';
import BestSellersCard from './partials/BestSellersCard';
import CalendarCard from './partials/CalendarCard';

import DateRange from 'widgets/date_range/date_range.jsx';
import classnames from 'classnames';
import PageTitle from './../../components/Layout/PageTitle';

import './Dashboard.css';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.tabsclick = this.tabsclick.bind(this);
        this.onEventResize = this.onEventResize.bind(this);
        this.onEventDrop = this.onEventDrop.bind(this);
        this.state = {
            events: [
                {
                    start: new Date(),
                    end: new Date(moment().add(1, "days")),
                    title: "BirthDay Party "
                },
                {
                    start: new Date('2018-07-10'),
                    end: new Date('2018-07-10'),
                    title: "Marriage Anniversary"
                },
                {
                    start: new Date('2018-07-25'),
                    end: new Date('2018-07-25'),
                    title: "Conference"
                }
            ],
            dropdownbarOpen: false,
            dropdownlineOpen: false,
            activeTab: '1',
            widths:150,
        };
        this.onEventResize = this.onEventResize.bind(this);
        this.onEventDrop = this.onEventDrop.bind(this);

        this.loadTvSpots();
    }

    loadTvSpots() {

        axios.get(`/res/tv/spot`)
        .then(
            (res) => {
                console.info('>>>>>>>>>>>>>>>>>>>>>>>>', res);
            }
        ).catch(
            (error) => {
                console.info('UUUUUUUUUUUUUUUU', error);
            }
        );
    }

    tabsclick(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    onEventResize(type, { event, start, end, allDay }) {
        this.setState(state => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: start };
        });
    };

    /**
     * onEventDrop
     */
    onEventDrop({ event, start, end, allDay }) {
        console.log(start);
    };

    render() {
        const DnDCalendar = withDragAndDrop(Calendar);
        return (
            <div>
                <PageTitle pageTitle="Dashboard" crumbs={[]} />
                {/* <!-- widgets --> */}

                <Row>
                    <Col xl={4} className="mb-30">
                        <DateRange 
                        />
                    </Col>
                </Row>
                <InfoPanelRow />

                <ChartSection />
                <Row>
                    <DoughnutCard />
                    <BestSellersCard />

                </Row>
                <Row>
                    <CalendarCard />

                </Row>
            </div>



        );
    }
}
export default Dashboard;
