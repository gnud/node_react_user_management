import React from 'react';
import * as constants from "../../utils/constants";

import CreateUserForm from "../user-form";


export default class CreateUserPage extends React.Component {

    state = {}

    render() {
        return (
            <>
                <CreateUserForm mode={constants.UserModes.CREATE}/>
            </>
        )
    }
}
