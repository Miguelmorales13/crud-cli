import React, {FunctionComponent, useEffect} from 'react';
import {FormikHelpers, useFormik} from "formik";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid} from "@material-ui/core";
import FormInput from "./FormInput";

export enum EnumInput {
    TextField,
    Button,
    Switch,
    Select,
    Autocomplete,
    Multiple,
    Object,
    Accesses,
    DropInput
}

export interface IInput<T = any, Option = any> {
    name: string,
    label: string,
    options?: Option[],
    type: EnumInput,
    // configuration filed to contain input
    configField: any
    // configurations to input charters
    configInput: T
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    }
}))

interface OwnProps {
    schema: any
    initialValues: any
    inputs: any[]
    handleSubmit: (value: any, formikHelpers: FormikHelpers<any>) => (void | Promise<any>)
}

type Props = OwnProps;


const FormFlex: FunctionComponent<Props> = ({schema, initialValues, inputs, handleSubmit}) => {
    const classes = useStyles()
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: (value: any, formikHelpers: FormikHelpers<any>) => {
            handleSubmit(value, formikHelpers)
            formik.resetForm()
        }
    })
    useEffect(() => {
        formik.setValues(initialValues)
        // @ts-ignore
    }, [initialValues])
    let propsInput = {
        setFieldValue: formik.setFieldValue,
        getFieldProps: formik.getFieldProps,
        handleChange: formik.handleChange,
    }
    return (
        <Grid container component="form" className={classes.root} onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
            {
                inputs.map((props, i) => (
                    <Grid item key={i} component={Box} p={0.5} {...props.configField}>
                        <FormInput value={formik.values[props.name]} errors={formik.errors[props.name]} touched={formik.touched[props.name]} {...props} {...propsInput}/>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default FormFlex;
