import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as helpers from "../utils/helpers";
import * as constants from "../utils/constants";
import ListUsersItemActionDelete from "./list-users-item-action-delete";
import ListUsersItemActionEdit from "./list-users-item-action-edit";
import {Link} from "react-router-dom";
import {Stack} from "react-bootstrap";


export default class ListUsersItem extends React.Component {
    state = {}

    //region Column Render types
    colEnumType(item) {
        return (
            <td key={helpers.randomString()} title={[item[1]]} className={`${constants.headerSize[item[0]]}`}>
                <FontAwesomeIcon icon={constants.statusMap[item[1]]} size="2x"/>
            </td>
        )
    }

    colEmailType(item) {
        return (
            <td key={helpers.randomString()} title={[item[1]]} className={`${constants.headerSize[item[0]]}`}>
                <a href={`mailto:${item[1]}`}>{item[1]}</a>
            </td>
        )
    }

    colTelType(item) {
        return (
            <td key={helpers.randomString()} title={[item[1]]} className={`${constants.headerSize[item[0]]}`}>
                <a className="overflow-hidden" href={`tel:${item[1]}`}>{item[1]}</a>
            </td>
        )
    }

    colHyperLinkType(item) {
        return (
            <td key={helpers.randomString()} title="Visit User" className={`${constants.headerSize[item[0]]}`}>
                <Link className="overflow-hidden" to={`/users/read/${this.props.row.id}`}>
                    {item[1]}
                </Link>
            </td>
        )
    }

    //endregion

    render() {
        return (
            <tr key={helpers.randomString()} className="d-flex">
                {
                    Object.entries(this.props.row)
                        .filter((item) => helpers.filterByCols(item, constants.allowedCols))
                        .map((item) => {
                            switch (constants.colType[item[0]]) {
                                case 'enum':
                                    return this.colEnumType(item);
                                case 'email':
                                    return this.colEmailType(item);
                                case 'tel':
                                    return this.colTelType(item);
                                case 'hyperlink':
                                    return this.colHyperLinkType(item);
                                default:
                                    return (
                                        <td key={helpers.randomString()} className={constants.headerSize[item[0]]}>{item[1]}</td>
                                    )
                            }
                        })
                }
                <td key={helpers.randomString()} className={constants.headerSize['action']}>
                    <Stack gap={1} direction='vertical' className="mx-auto">
                        <ListUsersItemActionDelete row={this.props.row}/>
                        <ListUsersItemActionEdit row={this.props.row}/>
                    </Stack>
                </td>
            </tr>
        )
    }
}
