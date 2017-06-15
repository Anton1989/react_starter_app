import React from 'react';
import bindActionCreators from 'redux/lib/bindActionCreators';
import connect from 'react-redux/lib/connect/connect';
//Actions
import { getEmployees, save, dismissError } from '../actions/emactions';
import { getDepartments } from '../../department/actions/depactions';
//Components
import Alert from 'react-bootstrap/lib/Alert';
import Loading from '../../../common/components/Loading.jsx';
import Row from '../components/Row.jsx';
//Global config
import config from '../../../config';

class Employees extends React.Component {
    constructor(...props) {
        super(...props);

        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    }
    componentDidMount() {
        if(this.props.departments.data.length == 0) this.props.getDepartments();
        if(this.props.employees.data.length == 0) this.props.getEmployees();
    }
    handleAlertDismiss() {
        this.props.dismissError();
    }
    render() {
        const { employees, departments, save } = this.props;
        console.log('RENDER <Employees>');

        return <div className='table-responsive'>
            {
                employees.errors && <div className='col-xs-12'>
                    <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                        <strong>ERROR:</strong> {employees.errors}
                    </Alert>
                </div>
            }
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {employees.fetching && employees.data.length == 0 && <tr><td colSpan='5'><Loading /></td></tr>}
                    {departments.data.length > 0 && employees.data.length > 0 && employees.data.map(employee => {
                        return <Row key={employee.id} employee={employee} departments={departments} save={save} />;
                    })}
                </tbody>
            </table>
        </div>
    }
}
function mapStateToProps (state) {
    return {
        employees: state.employee,
        departments: state.department
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getEmployees: bindActionCreators(getEmployees, dispatch),
        getDepartments: bindActionCreators(getDepartments, dispatch),
        save: bindActionCreators(save, dispatch),
        dismissError: bindActionCreators(dismissError, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Employees);