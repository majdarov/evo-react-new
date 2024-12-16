import React from 'react';
import { ErrorMessage, Field, Form, Formik, isObject } from 'formik';
import * as Yup from 'yup';
import { Button } from '../common/Forms';

interface IProps {
    callback: () => void;
    formData: any;
}

export const MyForm: React.FC<IProps> = ({ callback, formData }) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted

    let _formData = { ...formData } as Record<string, any>
    let formFields = [];
    for (let key in formData) {
        let jsx;
        if (isObject(formData[key])) {
            if (Array.isArray(formData[key])) {
                jsx =
                    <>
                        <label htmlFor={key}>{key}</label>
                        <ul>
                            {formData[key].map((item: any) => {
                                return (
                                    <li key={item.id}>{item.name}</li>
                                )
                            })}
                        </ul>
                    </>
            } else {
                _formData[key] = JSON.stringify(formData[key]);
                jsx = <>
                    <label htmlFor={key}>{key}</label>
                    <Field name={key} as="textarea" />
                </>
            }
        } else {
            jsx = <>
                <label htmlFor={key}>{key}</label>
                <Field name={key} type="text" key={key} />
            </>
        }
        formFields.push(jsx)
    };

    return (
        <Formik
            initialValues={_formData}
            // validationSchema={Yup.object({
            //     firstName: Yup.string()
            //         .max(15, 'Must be 15 characters or less')
            //         .required('Required'),
            //     lastName: Yup.string()
            //         .max(20, 'Must be 20 characters or less')
            //         .required('Required'),
            //     email: Yup.string().email('Invalid email address').required('Required'),
            // })}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
                if (callback) callback();
            }}
            onReset={(values) => {
                if (callback) callback();
            }}
        >
            <Form>
                {/* <label htmlFor="firstName">First Name</label>
                <Field name="firstName" type="text" />
                <ErrorMessage name='firstName' />

                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" />
                <ErrorMessage name='lastName' />

                <label htmlFor="email">Email Address</label>
                <Field name="email" type="email" />
                <ErrorMessage name='email' /> */}
                {formFields}
                {/* <button type="submit">Submit</button> */}
                <Button
                    icon='fa fa-check'
                    label='Submit'
                    type='submit'
                />
                <Button
                    icon='fas fa-ban'
                    label='Cansel'
                    type='reset'
                />
                {/* <button type='reset'>Reset</button> */}
            </Form>
        </Formik>
    );
};
