import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
class PageTitle extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        
        let crumbs = null;
        
        if (Array.isArray(this.props.crumbs) && this.props.crumbs.length) {
            crumbs = [];
            this.props.crumbs.forEach(
                (crumb, idx) => {
                    const isLast = idx + 1 === this.props.crumbs.length;
                    crumbs.push(
                        <BreadcrumbItem
                            active={!isLast}
                            key={idx}
                        >
                        {
                            isLast ?
                            crumb.title :
                            <Link to="{crumb.to}">{crumb.title}</Link>
                        }
                        </BreadcrumbItem>
                    );
                }
            );
        }
        return(
            <div className="page-title">
                <Row>
                    <Col sm={6}>
                        <h4 className="mb-0"> {this.props.pageTitle}</h4>
                    </Col>
                    <Col sm={6}>
                        <Breadcrumb className="float-left float-sm-right">
                            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                            {crumbs}
                        </Breadcrumb>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PageTitle;

