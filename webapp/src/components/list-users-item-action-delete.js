import React from 'react';
import APICalls from "../api/userApi";

import {eventBus} from "../utils/EventBus";


export default class ListUsersItemActionDelete extends React.Component {
    state = {
    }

    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove(ev) {
        ev.preventDefault();

        const {row} = this.props;
        const rowId = row.id;
        const shouldDelete = window.confirm('This will remove the user, are you sure?');

        if (!shouldDelete) {
            return;
        }

        new APICalls().deleteUser(rowId)
            .then((res) => {
                const data = res.data;
                const result= data.success;

                if (result) {
                    eventBus.dispatch("deleteUser", { row: row });
                }

                if (!result) {
                    
                }
            });
    }

    render() {
        return (
            <>
                {/* eslint-disable-next-line */}
                <a href={null} className="btn btn-sm btn-danger" onClick={this.handleRemove}>Delete</a>
            </>
        )
    }
}
