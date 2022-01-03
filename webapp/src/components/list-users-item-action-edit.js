import React from 'react';
import {Link} from "react-router-dom";


export default class ListUsersItemActionEdit extends React.Component {
    state = {}

    render() {
        return (
            <>
                <Link className='btn btn-sm btn-primary'  to={`/users/edit/${this.props.row.id}`}>
                    Update
                </Link>
            </>
        )
    }
}
