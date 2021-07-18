import React, {FunctionComponent, useCallback, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import {useDropzone} from "react-dropzone";
import {Card, CardActionArea, CardMedia, Typography} from "@material-ui/core";
import {Publish} from "@material-ui/icons";
import {readImage} from "../../utils";
import {FormikErrors, FormikValues} from "formik";

export const useStyles = makeStyles(theme => ({
    dropInput: {
        width: '100%',
        height: '100%',
        minHeight: theme.spacing(15),
        minWidth: theme.spacing(10),
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: theme.spacing(4)
    },
    containerText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2)
    },
    media: {
        minWidth: theme.spacing(15),
        minHeight: theme.spacing(15)
    },
    rootPhoto: {
        display: "flex",
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    contentCard: {
        flex: '1 0 auto',
        padding: 0,
        paddingBottom: '0 !important',
        margin: 0
    }
}))

interface OwnProps {
    src?: string
    name: string
    label: string
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<FormikValues>> | Promise<void>;

}

type Props = OwnProps;

const DropInput: FunctionComponent<Props> = ({src, name, label, setFieldValue}) => {
    const [file, setFile] = useState(null)
    const {t} = useTranslation()
    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles[0])
        setFieldValue(name, acceptedFiles[0])
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: ['image/png', 'image/jpeg', 'image/gif'], maxFiles: 1, multiple: false})
    const classes = useStyles()
    const noContent = (
        <Card className={classes.rootPhoto}>
            <CardActionArea>
                <CardMedia className={classes.media} image={file ? readImage(file) : src}/>
            </CardActionArea>
        </Card>
    );

    return <div className={classes.dropInput} {...getRootProps()}>
        <input {...getInputProps()} />
        {
            src || file ? noContent : <div className={classes.containerText}>
                <Publish className={classes.icon}/>
                <Typography align="center" variant="h6">
                    {t(isDragActive ? 'forms.let_it_go' : `forms.drop_file`)}
                </Typography>

            </div>
        }
    </div>;
};

export default DropInput;
