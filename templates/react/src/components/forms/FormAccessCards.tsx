import React, {ChangeEvent, FunctionComponent} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    Grid,
    makeStyles,
    Switch,
    Typography
} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";
import {FieldInputProps, FormikErrors, FormikValues} from "formik";
import {useTranslation} from "react-i18next";

interface OwnProps {
    name: string,
    label: string,
    value: []
    handleChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<FormikValues>> | Promise<void>;
}

type Props = OwnProps;
const useStyles = makeStyles((theme) => ({
    access: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    details: {padding: theme.spacing(1)},
    card: {padding: theme.spacing(0.5)}

}))
const FormAccessCards: FunctionComponent<Props> = ({
                                                       name,
                                                       label,
                                                       value,
                                                       handleChange,
                                                       getFieldProps,
                                                       setFieldValue
                                                   }) => {
    const {t} = useTranslation()
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item xs={12} className={classes.card}>
                <Typography>{label} </Typography>
            </Grid>

            {
                value && value.map((module: any, key: number) => (
                    module.type === getFieldProps('type').value &&
                    <Grid item key={`module-${key}`} xs={12} md={6} className={classes.card}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMore/>} arial-controls={`module-${key}`}>
                                <Typography>{t(module.name)}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.details}>
                                <Grid container>
                                    {
                                        module.accesses.map((access: any, key2: number) => (
                                            <Grid item key={`access-${key}-${key2}`} xs={12} className={classes.access}>
                                                <div className={classes.access}>
                                                    <Checkbox checked={access.isDone}
                                                              name={`${name}[${key}].accesses[${key2}].isDone`}
                                                              onChange={(event) => {
                                                                  setFieldValue(`${name}[${key}].accesses[${key2}].permission`, !access.isDone)
                                                                  handleChange(event, true)
                                                              }}/>

                                                    <Typography>{t(access.name)}  </Typography>
                                                </div>
                                                <div className={classes.access}>
                                                    <Switch checked={access.permission} disabled={!access.isDone}
                                                            name={`${name}[${key}].accesses[${key2}].permission`}
                                                            onChange={handleChange}/>
                                                    <Typography>{t('forms.roles.write')} </Typography>
                                                </div>
                                            </Grid>

                                        ))
                                    }
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                    </Grid>
                ))
            }
        </Grid>
    );
};

export default FormAccessCards;
