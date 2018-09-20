import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Card, CardBody, Col } from 'reactstrap';
import moment from 'moment';

//require('globalize/lib/cultures/globalize.culture.pl');

//Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class CalendarDay extends Component {
    
    constructor(props) {
        super(props);
        console.info('CalendarDay::constructor::props', props, props.event.start);
    }
    
    render() {
        return (
            <div>
                Ulubiony dzień
            </div>
        );
    }
}

class CalendarCard extends Component {
    
    constructor(props) {
        super(props);


        this.state = {
            events: [
                {
                    id: 1,
                    start: new Date(),
                    end: new Date(moment().add(0, "days")),
                    title: "BirthDay Party ",
                    color: 'pink',
                    isAllDay: true,
                },
                {
                    id: 2,
                    start: new Date('2018-07-10'),
                    end: new Date('2018-07-10'),
                    title: "Marriage Anniversary"
                },
                {
                    id: 3,
                    start: new Date('2018-07-25'),
                    end: new Date('2018-07-25'),
                    title: "Conference"
                }
            ],
            widths:150,
        };
        this.onEventResize = this.onEventResize.bind(this);
        this.onEventDrop = this.onEventDrop.bind(this);

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
    onEventDrop({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
        
        console.info('>>>>>>>>>> EVENT: ', event);
        const { events } = this.state;

        const idx = events.indexOf(event);
        let allDay = event.allDay;

        if (!event.allDay && droppedOnAllDaySlot) {
          allDay = true;
        } else if (event.allDay && !droppedOnAllDaySlot) {
          allDay = false;
        }

        const updatedEvent = Object.assign({}, event, { start, end, allDay }); // { ...event, start, end, allDay }

        const nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

        this.setState({
          events: nextEvents,
        });

        // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
    }
    
    render() {
        
        const DnDCalendar = withDragAndDrop(Calendar);
        
        return (
            <Col md={12} className="mb-30">
                <Card className="card-statistics h-100">
                    <CardBody>
                        <DnDCalendar
                            components={{
                                event: CalendarDay,
                            }}
                            defaultDate={new Date()}
                            defaultView="month"
                            events={this.state.events}
                            onEventDrop={this.onEventDrop}
                            onEventResize={this.onEventResize}
                            resizable
                            style={{ height: "50vh" }}
                        />
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default CalendarCard;