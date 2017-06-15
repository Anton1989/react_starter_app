import React from 'react';
import bindActionCreators from 'redux/lib/bindActionCreators';
import connect from 'react-redux/lib/connect/connect';
//Actions
import { getDepartments, save, dismissError } from '../actions/depactions';
//Components
import Alert from 'react-bootstrap/lib/Alert';
import Loading from '../../../common/components/Loading.jsx';
import Row from '../components/Row.jsx';
//Global config
import config from '../../../config';

class Departments extends React.Component {
    constructor(...props) {
        super(...props);

        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    }
    componentDidMount() {
        if(this.props.departments.data.length == 0) this.props.getDepartments();
    }
    handleAlertDismiss() {
        this.props.dismissError();
    }
    render() {
        const { departments, save } = this.props;
        console.log('RENDER <Departments>');

        return <div className='table-responsive'>
            {
                departments.errors && <div className='col-xs-12'>
                    <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                        <strong>ERROR:</strong> {departments.errors}
                    </Alert>
                </div>
            }
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {departments.fetching && departments.data.length == 0 && <tr><td colSpan='3'><Loading /></td></tr>}
                    {departments.data.length > 0 && departments.data.map(department => {
                        return <Row key={department.id} department={department} save={save} />;
                    })}
                </tbody>
            </table>
        </div>
    }
}
function mapStateToProps (state) {
    return {
        departments: state.department
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getDepartments: bindActionCreators(getDepartments, dispatch),
        save: bindActionCreators(save, dispatch),
        dismissError: bindActionCreators(dismissError, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Departments);