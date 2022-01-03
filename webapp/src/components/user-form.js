import React from 'react';
import {Form, Button, Row, Col, Stack} from 'react-bootstrap'
import * as yup from "yup";
import {Formik} from "formik";
// noinspection ES6UnusedImports
// eslint-disable-next-line
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as constants from "../utils/constants";
import APICalls from "../api/userApi";

import {Link, withRouter} from "react-router-dom";
import FormTextField from "./form/form-field";

// noinspection SpellCheckingInspection
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// noinspection SpellCheckingInspection
const MySwal = withReactContent(Swal);

const schema = yup.object({
    name: yup.string().min(10, 'Too Short!').max(255, 'Too Long!').required(),
    email: yup.string().email().required(),
    phone: yup.string().min(6, 'Too Short!').max(255, 'Too Long!').required(),
    password: yup.string().required(),
    passwordConfirm: yup.string().when('password', {
        is: val => (val && val.length > 0),
        then: yup.string().oneOf(
            [yup.ref("password")],
            "Both password need to be the same"
        )
    }).required(),
});

const schemaUpdate = yup.object({
    name: yup.string().min(10, 'Too Short!').max(255, 'Too Long!').required(),
    phone: yup.string().min(6, 'Too Short!').max(255, 'Too Long!').required(),
});

const schemaRead = yup.object();


class UserForm extends React.Component {

    state = {
        initialData: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            handleSubmit: false,
            initialData: {
                name: '',
                email: '',
                phone: '',
                password: '',
                passwordConfirm: '',
            }
        };

        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleRead = this.handleRead.bind(this);
        this.handleSubmitSwitch = this.handleSubmitSwitch.bind(this);
    }

    componentDidMount() {
        if (this.isReadOnly() || this.isUpdate()) {
            this.handleRead();
        }
    }

    //region Submit events
    handleCreate(data, {setSubmitting}) {

        new APICalls().createUser(data)
            .then((res) => {
                const success = res.data.success;

                if (success) {
                    return this.props.history.push('/users');
                }
            })
            .catch((error) => {
                const response = JSON.parse(error.request.response);
                const msg = (response && response.message) || error.message;
                MySwal.fire({
                    title: <p>Message from server</p>,
                    text: msg,
                    icon: 'error',
                    footer: 'Sponsored by the server :).',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    toast: true,
                }).then(() => {
                        sendAsyncRequest().then();
                    }
                );

                async function sendAsyncRequest() {
                    setTimeout(() => setSubmitting(false), 300);
                }
            });

    }

    handleUpdate(data, {setSubmitting}) {
        const userId = this.getPathValue();

        new APICalls().updateUser(userId, data)
            .then((res) => {
                const success = res.data.success;

                if (success) {
                    return this.props.history.push(`/users/read/${userId}`);
                }

            })
            .catch((error) => {
                const response = JSON.parse(error.request.response);
                const msg = (response && response.message) || error.message;
                MySwal.fire({
                    title: <p>Message from server</p>,
                    text: msg,
                    icon: 'error',
                    footer: 'Sponsored by the server :).',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    toast: true,
                }).then(() => {
                        sendAsyncRequest().then();
                    }
                );

                async function sendAsyncRequest() {
                    setTimeout(() => setSubmitting(false), 300);
                }
            });
    }

    handleRead() {

        const userId = this.getPathValue();

        new APICalls().readUser(userId)
            .then((res) => {
                const success = res.data.success;

                if (success) {
                    const item = res.data.result;
                    this.setState({initialData: item});

                }
            })
            .catch((error) => {
                const response = JSON.parse(error.request.response);
                const msg = (response && response.message) || error.message;
                MySwal.fire({
                    title: <p>Message from server</p>,
                    text: msg,
                    icon: 'error',
                    footer: 'Sponsored by the server :).',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    toast: true,
                }).then();
            });
    }

    handleSubmitSwitch(data, {setSubmitting}) {

        switch (true) {
            case this.getMode() === constants.UserModes.CREATE:

                return this.handleCreate(data, {setSubmitting});

            case this.getMode() === constants.UserModes.UPDATE:

                return this.handleUpdate(data, {setSubmitting});

            case this.getMode() === constants.UserModes.READ:

                return this.handleRead(data, {setSubmitting});
            default:

                break;
        }

    }

    //endregion

    schemaSwitch() {
        let schemaMode = schema;

        switch (true) {
            case this.getMode() === constants.UserModes.CREATE:
                schemaMode = schema;
                break;

            case this.getMode() === constants.UserModes.UPDATE:
                schemaMode = schemaUpdate;
                break;

            case this.getMode() === constants.UserModes.READ:
                schemaMode = schemaRead;
                break;
            default:
                break;
        }

        return schemaMode;
    }

    renderSubmitSwitch(isValid, isSubmitting) {
        switch (true) {
            case this.props.mode === constants.UserModes.CREATE:
                return (
                    <Button
                        disabled={!isValid || isSubmitting}
                        variant="primary"
                        as="input"
                        size="lg"
                        type="submit"
                        value="Add"
                    />
                )
            case this.props.mode === constants.UserModes.READ:
                const routerPathId = this.getPathValue();
                return (
                    <Link to={`/users/edit/${routerPathId}`}>
                        <Button variant="primary" onClick={this.handleEdit}>
                            Edit
                        </Button>
                    </Link>
                )
            case this.props.mode === constants.UserModes.UPDATE:
                return (
                    <>
                        <Stack direction="horizontal" gap={3}>
                            <Button
                                variant="secondary"
                                as="input"
                                size="lg"
                                type="button"
                                value="Cancel"
                                className='btn-secondary'
                                onClick={this.goBack}
                            />
                            <Button
                                disabled={!isValid || isSubmitting}
                                variant="primary"
                                as="input"
                                size="lg"
                                type="submit"
                                value="Save"
                            />
                        </Stack>
                    </>
                )
            default:
                return (
                    <></>
                )
        }
    }

    //region Modes helpers
    isReadOnly() {
        return this.props.mode === constants.UserModes.READ;
    }

    isUpdate() {
        return this.props.mode === constants.UserModes.UPDATE;
    }

    getMode() {
        return this.props.mode;
    }

    //endregion

    //region Helpers
    getPathValue() {
        return window.location.pathname.split('/').at(-1);
    }

    goBack = () => {

        this.props.history.goBack();
    }
    //endregion

    //region Form Switch
    renderFormCreate() {
        return (
            <>
                <FormTextField
                    as={Col}
                    sm="4"
                    controlId="validationFormikName"
                    label="Full name"
                    type="text"
                    name="name"
                />

                <FormTextField
                    as={Col}
                    md="4"
                    controlId="validationFormikEmail"
                    label="Email"
                    type="text"
                    name="email"
                    autoComplete="new-password"
                />

                <FormTextField
                    as={Col}
                    md="4"
                    controlId="validationFormikPhone"
                    label="Phone"
                    type="tel"
                    name="phone"
                />

                <FormTextField
                    as={Col}
                    md="4"
                    controlId="validationFormikPassword"
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                />

                <FormTextField
                    as={Col}
                    md="4"
                    controlId="validationFormikPasswordConfirm"
                    label="Password Confirm"
                    type="password"
                    name="passwordConfirm"
                    autoComplete="new-password"
                />
            </>
        )
    }

    renderFormEdit() {
        return (
            <>
                <FormTextField
                    as={Col}
                    sm="4"
                    controlId="validationFormikName"
                    label="Full name"
                    type="text"
                    name="name"
                />

                <FormTextField
                    as={Col}
                    md="4"
                    controlId="validationFormikPhone"
                    label="Phone"
                    type="tel"
                    name="phone"
                />
            </>
        )
    }

    renderFormRead() {
        return (
            <>
                <FormTextField
                    as={Col}
                    sm="4"
                    controlId="validationFormikName"
                    label="Full name"
                    type="text"
                    name="name"
                    readOnly={true}
                />

                <FormTextField
                    as={Col}
                    md="4"
                    controlId="validationFormikEmail"
                    label="Email"
                    type="text"
                    name="email"
                    autoComplete="new-password"
                    readOnly={true}
                />

                <FormTextField
                    as={Col}
                    md="4"
                    controlId="validationFormikPhone"
                    label="Phone"
                    type="tel"
                    name="phone"
                    readOnly={true}
                />

            </>
        )
    }

    renderFormSwitch() {
        switch (true) {
            case this.getMode() === constants.UserModes.CREATE:
                return this.renderFormCreate();

            case this.getMode() === constants.UserModes.UPDATE:
                return this.renderFormEdit();

            case this.getMode() === constants.UserModes.READ:
                return this.renderFormRead();
            default:
                return this.renderFormCreate();
        }
    }

    //endregion

    render() {
        const {initialData} = this.state;

        // noinspection JSUnusedLocalSymbols
        return (
            <Row>
                <Col>
                    <Formik
                        validationSchema={this.schemaSwitch()}
                        onSubmit={this.handleSubmitSwitch}
                        enableReinitialize={true}
                        initialValues={initialData}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              values,
                              errors,
                              isValid,
                              isSubmitting,
                          }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    {this.renderFormSwitch()}
                                </Form.Group>

                                <Col>
                                    {
                                        this.renderSubmitSwitch(isValid, isSubmitting)
                                    }
                                </Col>
                                <Col>
                                    <br/>
                                    <pre style={{margin: "0 auto"}}>
                  {JSON.stringify(
                      {...values, ...errors, isValid, isSubmitting},
                      null,
                      2
                  )}
                </pre>
                                </Col>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        );
    }
}

export default withRouter(UserForm)
