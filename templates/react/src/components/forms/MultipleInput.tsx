import React, {ChangeEvent, FunctionComponent} from 'react';
import {Box, Divider, Grid, IconButton, Typography} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";
import FormInput from "./FormInput";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import {FieldInputProps, FormikErrors, FormikValues} from "formik";


interface OwnProps {
    options?: any[]
    name: string
    label: string,
    value: any
    errors: any
    touched: any;
    handleChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<FormikValues>> | Promise<void>;
}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    btnDelete: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const MultipleInput: FunctionComponent<Props> = ({value, setFieldValue, touched, handleChange, errors, getFieldProps, name, label, options}) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const handleAdd = () => {
        setFieldValue(name, [...value, {
            ...options?.reduce((b, a) => ({...b, [a.name]: 0}), {})
        }])

    }
    const disabled = value.length >= 10
    const getProps = (props: any, i: number) => {
        return {
            ...props,
            name: `${name}[${i}].${props.name}`,
            handleChange,
            configInput: {
                ...props.configInput,
                // @ts-ignore
                value: value[i][props.name],
                errors: errors && errors[i] && errors[i][props.name],
                touched: touched && touched[i] && touched[i][props.name],
                setFieldValue,
                getFieldProps,

            }
        }
    }

    const handleDelete = (i: number) => {
        let val = value.filter((value: any, j: number) => j !== i)
        setFieldValue(name, val)

    }
    return (
        <Box>
            <Divider/>
            <Box display="flex" justifyContent="space-between">
                <Typography component="h2" variant="h5">
                    {t(label)}
                </Typography>
                <IconButton color="primary" disabled={disabled} onClick={handleAdd}> <Add/> </IconButton>
            </Box>

            {
                value.map((_: any, i: number) =>
                    (
                        <Grid container key={`main-${i}`}>
                            <Grid item container xs={10} md={11}>
                                {
                                    options && options.map((props, j) => (
                                        <Grid item key={`${i}-${j}`} component={Box}  {...props.configField}>
                                            <FormInput isMulti={true} {...getProps(props, i)} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                            <Grid item className={classes.btnDelete} xs={2} md={1}>
                                <div>
                                    <IconButton color="secondary" onClick={() => handleDelete(i)}> <Remove/> </IconButton>
                                </div>
                            </Grid>

                        </Grid>
                    )
                )
            }

        </Box>
    );
};

export default MultipleInput;
