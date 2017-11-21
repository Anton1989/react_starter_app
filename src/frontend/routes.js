import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
//Layouts
import Layout from './common/containers/Layout.jsx';
//containers
import DepartmentList from './modules/department/containers/List.jsx';
import EmployeeList from './modules/employee/containers/List.jsx';

export default (/* data */) => {
    return (
        <Route path='/' component={Layout}>
            <IndexRoute component={DepartmentList} />
            <Route path='employee' component={EmployeeList} />
        </Route>
    )
}
