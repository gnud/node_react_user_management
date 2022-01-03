import React from 'react';

import ListUsersItem from "../list-users-item";

import APICalls from '../../api/userApi';

import * as helpers from '../../utils/helpers';
import * as constants from "../../utils/constants";

import './ListUsers.css';

import {eventBus} from "../../utils/EventBus";


export default class ListUsers extends React.Component {
    state = {
        items: [],
    }

    componentDidMount() {
        this.loadUserList();

        eventBus.on("deleteUser", (data) => {
            this.loadUserList();
        });
    }

    componentWillUnmount() {
        eventBus.remove('deleteUser');
    }

    loadUserList() {
        new APICalls().geUsers()
            .then((res) => {
                const data = res.data;
                const items = data.result;

                this.setState({items});
            });
    }


    renderThRow(item) {
        return (
            <th key={helpers.randomString()} className={constants.headerSize[item[0]]}>{item[0]}</th>
        )
    }

    renderAllThs(first) {
        return (
            Object.entries(first)
                .filter((item) => helpers.skipId(item))
                .filter((item) => helpers.filterByCols(item, constants.allowedCols))
                .map((item, index) => this.renderThRow(item)
                )
        )

    }

    renderBodyRow(item) {
        return (
            <ListUsersItem key={helpers.randomString()} row={item}/>
        )
    }

    renderAllBodyRows(items) {
        return (
            items.map((item, index) => this.renderBodyRow(item))
        )

    }

    render() {
        const {items} = this.state;

        const [first] = items;

        if (!first) {
            return (<></>);
        }

        return (
            <div className="table-responsive">
                <table className="table table-striped table-fixed table-hover table-sm ">
                    <thead>
                    <tr key={helpers.randomString()} className="d-flex">
                        <th key={helpers.randomString()} className="col-1">#</th>
                        {
                            this.renderAllThs(first)
                        }
                        <th key={helpers.randomString()} className={constants.headerSize['action']}>action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.renderAllBodyRows(items)
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
