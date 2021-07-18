import React, {ChangeEvent, FunctionComponent} from 'react';
import {EnumInput, IInput} from "./FormFlex";
import {Button, FormControlLabel, InputBase, MenuItem, Switch, TextField} from "@material-ui/core";
import FormAccessCards from "./FormAccessCards";
import {useTranslation} from "react-i18next";
import MultipleInput from "./MultipleInput";
import {FieldInputProps, FormikErrors, FormikValues} from "formik";
import DropInput from "./DropInput";

interface OwnProps extends IInput {
    isMulti: boolean
    errors?: any
    value: any
    touched?: any;
    handleChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    disabled: boolean;
    getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<FormikValues>> | Promise<void>;
}

type Props = OwnProps;

const FormInput: FunctionComponent<Props> = ({
                                                 isMulti,
                                                 setFieldValue,
                                                 getFieldProps,
                                                 value,
                                                 type,
                                                 label,
                                                 name,
                                                 configInput,
                                                 touched,
                                                 errors,
                                                 handleChange,
                                                 options
                                             }) => {
    const {t} = useTranslation()
    // console.log(formik.values, name, formik.values[name])


    let config = {
        onChange: handleChange,
        name: name,
        ...(typeof configInput == 'function' ? configInput(getFieldProps, setFieldValue) : configInput),
    }
    if (!isMulti) {
        config = {
            ...config,
            error: touched && errors !== undefined,
            value: value
        }

    }
    switch (type) {
        case EnumInput.TextField:
            return (<TextField variant="outlined" margin="dense" fullWidth label={t(label)} helperText={errors} autoComplete={name} {...config}/>)
        case EnumInput.Button:
            return (<Button fullWidth variant="contained" {...configInput}>{t(label)}</Button>)
        case EnumInput.DropInput:
            return (<DropInput src={config.src} setFieldValue={setFieldValue} name={name} label={label}/>)
        case EnumInput.Switch:
            return (<FormControlLabel control={<Switch checked={config.value} onChange={config.onChange} name={name} {...configInput} />} label={t(label)}/>)
        case EnumInput.Select:
            return (
                <TextField variant="outlined" margin="dense" fullWidth label={t(label)} helperText={errors} {...config} select>
                    <MenuItem value={0}><em>None</em></MenuItem>
                    {options && options.map((o, i) => (<MenuItem key={`${name}-key-${i}`} value={o.id}>{o.name}</MenuItem>))}
                </TextField>
            )
        case EnumInput.Multiple:
            return (
                <MultipleInput label={label} setFieldValue={setFieldValue} getFieldProps={getFieldProps} handleChange={config.onChange} {...config} options={options} name={name}/>
            );
        case EnumInput.Accesses:
            return (<FormAccessCards label={t(label)} setFieldValue={setFieldValue} getFieldProps={getFieldProps} name={name} handleChange={handleChange}
                                     value={value}/>)
        default:
            return (
                <InputBase {...configInput}/>
            )
    }
};


export default FormInput;

