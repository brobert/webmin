import React from 'react';
import { Card, Button, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './Profile.scss';


class BasicTab extends React.Component {

    render() {
        console.info('BasicTab::render', this.props);
        if (!this.props.user) {
            return <i className="fa fa-spin fa-spinner" />
        }
        return (
            <Card className="card-statistics mb-30">
                <CardBody>
                    <CardTitle>Form row</CardTitle>
                    <form>
                        <div className="form-row">
                            <Col>
                                <input type="text" className="form-control" placeholder="First name" />
                            </Col>
                            <Col>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </Col>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Password</label>
                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Address</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress2">Address 2</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity">City</label>
                                <input type="text" className="form-control" id="inputCity" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState">State</label>
                                <select id="inputState" className="form-control" >
                                    <option>Choose</option>
                                    <option>Arunachal Pradesh</option>
                                    <option>Assam</option>
                                    <option>Bihar</option>
                                    <option>Goa</option>
                                    <option>Gujarat</option>
                                    <option>Himachal Pradesh</option>
                                    <option>Madhya Pradesh</option>
                                    <option>Maharashtra</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputZip">Zip</label>
                                <input type="text" className="form-control" id="inputZip" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                <label className="form-check-label" htmlFor="gridCheck"> Check me out </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </form>
                </CardBody>
            </Card>

        );
    }
}
export default BasicTab;
