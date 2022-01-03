import React from 'react';
import APIAuthCalls from '../../api/authApi';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);


export default class LoginPage extends React.Component {

    state = {}

    openLogin() {
        MySwal.fire({
            title: <p>Please login</p>,
            html: `
    <input type="text" id="email" name="email" class="swal2-input" placeholder="Username" value="root@example.com">
    <input type="password" id="password"  name="password" class="swal2-input" placeholder="Password" value="password">`,
            confirmButtonText: 'Sign in',
            focusConfirm: false,
            preConfirm: () => {
                const login = Swal.getPopup().querySelector('#email').value
                const password = Swal.getPopup().querySelector('#password').value
                if (!login || !password) {
                    Swal.showValidationMessage(`Please enter login and password`)
                }
                return {login: login, password: password}
            },
            footer: 'Sponsored by the server :).',
            timer: 0,
            timerProgressBar: false,
            showConfirmButton: true,
            toast: false,
            allowOutsideClick: false,
        }).then(() => {

            const data = {
                email: Swal.getPopup().querySelector('#email').value,
                password: Swal.getPopup().querySelector('#password').value,
            }

            new APIAuthCalls().loginUser(data)
                .then((res) => {
                    const data = res.data;
                    const accessToken = data.accessToken;

                    localStorage.setItem('accessToken', accessToken);

                    window.location.href = '/';

                });
        });
    }

    render() {
        return (
            <>
                {this.openLogin()}
            </>
        )
    }
}
