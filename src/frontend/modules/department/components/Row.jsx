import React from 'react';
import PropTypes from 'prop-types';

export default class Row extends React.Component {
    constructor(...props) {
        super(...props);

        this.state = {
            editable: false,
            department: { ...this.props.department }
        }

        this.switchMode = this.switchMode.bind(this);
        this.changeField = this.changeField.bind(this);
    }
    switchMode() {
        this.setState({editable: !this.state.editable});
    }
    changeField (event) {
        let setting = {};
        setting[event.target.getAttribute('id')] = event.target.value;
        this.setState({ department: Object.assign(this.state.department, setting) });
    }
    render() {
        const { department } = this.props;
        console.log('RENDER <DepartmentRow>');

        let name = department.name;
        if(this.state.editable) {
            name = <input id='name' type='text' className='form-control' placeholder='name' value={this.state.department.name} onChange={this.changeField} />;
        }
        let button = <td><span className='glyphicon glyphicon-pencil' onClick={this.switchMode}></span></td>;
        if(this.state.editable) {
            button = <td>
                <span className='glyphicon glyphicon-ok' onClick={ () => { this.switchMode(); this.props.save(this.state.department); } }></span>{' '}
                <span className='glyphicon glyphicon-ban-circle' onClick={ () => { this.switchMode(); this.setState({ department: {...department} }); } }></span>
            </td>;
        }

        return <tr>
            <th>{department.id}</th>
            <td>{name}</td>
            {button}
        </tr>;
    }
}
Row.propTypes = {
    department: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired
}