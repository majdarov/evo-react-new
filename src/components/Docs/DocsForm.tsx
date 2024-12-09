import React from 'react';
import { Field, Form, Formik, isObject } from 'formik';
import * as Yup from 'yup';
import { Button, TextInput } from '../common/Forms';
import { DocType, SellerType } from '../../redux/docsSlice';
import { TDocLifeCircle, TDocPaymentStatus, TDocTypes } from '../../types';
import { IFormData } from '../../redux/commoditySlice';
import s from './Docs.module.css'

interface IProps {
    callback: () => void;
    formData: IDocFormData;
}

export interface IDocFormData {
    [key: string]: any;
    _id: string;
    createStatus: TDocLifeCircle
    docDate: number;
    docNumber: string;
    docSum: number;
    docType: TDocTypes;
    paymentStatus: TDocPaymentStatus;
    products: IFormData[];
    seller: SellerType;
    summa: number;
}

export const DocForm: React.FC<IProps> = ({ callback, formData }) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted

    return (
        <Formik
            initialValues={formData}
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
                <h2>Document # {formData.docNumber}</h2>
                <div className={s.propertyes}>
                    <Field name="docType" as={TextInput} />
                    <strong>{formData.docType}</strong>
                    <strong>{formData.createStatus}</strong>
                    <strong>{formData.paymentStatus}</strong>
                </div>
                <div className={s.buttons}>
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
                </div>
                {/* <button type='reset'>Reset</button> */}
            </Form>
        </Formik>
    );
};
