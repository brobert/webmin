
import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Base from './components/Layout/Base';
import Basepages from './components/Layout/Basepages';

// import pages
import Chartjs from './pages/Chart/Chartjs';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from 'pages/Profile/Profile.js';


// import components
import Accordions from './components/Elements/Accordion/Accordions';
import Alerts from './components/Elements/Alert/Alerts';
import Blankpage from './components/Custompage/Blankpage/Blankpage';
import Buttons from './components/Elements/Button/Buttons';
import Chat from './components/Chat/Chat';
import Colors from './components/Elements/Color/Colors';
import Contacts from './components/Custompage/Contacts/Contacts';
import Datatables from './components/Tables/Datatables/Datatables';
import DatePickers from './components/Elements/Datepicker/Datepickers';
import Dropdowns from './components/Elements/Dropdown/Dropdowns';
import Errors from './components/Custompage/Error/Errors';
import Eventcalendar from './components/Calendar/Eventcalendar';
import Faq from './components/Custompage/Faq/Faq';
import Fontawesome from './components/Fontawesome/Fontawesome';
import Formgroups from './components/Forms/Inputgroup/Inputgroups';
import Forminputs from './components/Forms/Forminput/Forminputs';
import Formvalidations from './components/Forms/Formvalidation/Formvalidations';
import Invoice from './components/Custompage/Invoice/Invoice';
import Lists from './components/Elements/Lists/Lists';
import Login from './components/Authentication/Login/Login';
import Mail from './components/MailBox/Mailbox';
import Mapss from './components/Maps/Maps';
import Models from './components/Elements/Model/Models';
import Navs from './components/Elements/Navs/Navs';
import Nicescroll from './components/Elements/Nicescroll/nicescroll';
import PopoverTooltips from './components/Elements/Popover_Tooltips/Popover_Tooltips';
import Progressbar from './components/Elements/Progress/Progressbar';
import Ratings from './components/Elements/Ratings/Ratings';
import Register from './components/Authentication/Register/Register';
import Switchs from './components/Elements/Switchs/Switchs';
import Tables from './components/Tables/Tables/Tables';
import Tabss from './components/Elements/Tabs/Tabss';
import Typographys from './components/Elements/Typographys/Typographys';
import Widgets from './components/Widgets/Widgets';

const listofPages = [
    '/login',
    '/register'

];

const Routers = (globalProps) => {

    if(listofPages.indexOf(location.pathname) > -1) {
        return(
            <Basepages>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register}/>
            </Basepages>
        )
    } else {
        return(
            <Base {...globalProps}>
                <Switch>
                    <Route exact path="/" render={(props) => <Dashboard {...props} {...globalProps} />}/>
                    <Route path="/accordion" render={(props) => <Accordions {...props} authUser={this.props.authUser} />}/>
                    <Route path="/alerts" component={Alerts} />
                    <Route path="/buttons" component={Buttons} />
                    <Route path="/colors" component={Colors} />
                    <Route path="/dropdown" component={Dropdowns} />
                    <Route path="/typographys" component={Typographys} />
                    <Route path="/navs" component={Navs} />
                    <Route path="/model" component={Models} />
                    <Route path="/fontawesome" component={Fontawesome} />
                    <Route path="/switchs" component={Switchs} />
                    <Route path="/lists" component={Lists} />
                    <Route path="/ratings" component={Ratings} />
                    <Route path="/nicescroll" component={Nicescroll} />
                    <Route path="/chartjs" component={Chartjs} />
                    <Route path="/tabs" component={Tabss} />
                    <Route path="/progess" component={Progressbar} />
                    <Route path="/popover_tooltips" component={PopoverTooltips} />
                    <Route path="/datepicker" component={DatePickers} />
                    <Route path="/maps" component={Mapss} />
                    <Route path="/datatable" component={Datatables} />
                    <Route path="/tables" component={Tables} />
                    <Route path="/forminput" component={Forminputs} />
                    <Route path="/formvalidation" component={Formvalidations} />
                    <Route path="/inputgroup" component={Formgroups} />
                    <Route path="/error" component={Errors} />
                    <Route path="/eventcalendar" component={Eventcalendar} />
                    <Route path="/blankpage" component={Blankpage}/>
                    <Route path="/faq" component={Faq}/>
                    <Route path="/contacts" component={Contacts}/>
                    <Route path="/invoice" component={Invoice}/>
                    <Route path="/widget" component={Widgets} />
                    <Route path="/chat/:id" component={Chat} />
                    <Route path="/mailbox" component={Mail} />
                    <Route path="/profile" component={Profile} />
                </Switch>
            </Base>
        );
    }
}
export default Routers;