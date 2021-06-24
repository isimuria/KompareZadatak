import React, { useEffect, useState } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/postPerson";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    ime: '',
    prezime: '',
    email: ''
}

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    postBtn: {
        width: "50%"
    }
})

const PostPersonForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.postPersonList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.ime = values.ime ? "" : "This field is required."
        temp.prezime = values.prezime ? "" : "This field is required."
        temp.email = values.email ? "" : "This field is required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues,props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Kompare Zadatak"
                    content="Uspješno spremljeno"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
        if (validate()) {
            if (props.currentId == 0)
                props.createPostPerson(values, onSuccess)
            else
                props.updatePostPerson(props.currentId, values, onSuccess)
        }
    }

    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <TextField
                name="ime"
                variant="outlined"
                label="Ime"
                fullWidth
                value={values.ime}
                onChange={handleInputChange}
                {...(errors.ime && { error: true, helperText: errors.ime })}
            />
            <TextField
                name="prezime"
                variant="outlined"
                label="Prezime"
                fullWidth 
                value={values.prezime}
                onChange={handleInputChange}
                {...(errors.prezime && { error: true, helperText: errors.prezime })}
            />
            <TextField
                name="email"
                variant="outlined"
                label="Email"
                fullWidth 
                value={values.email}
                onChange={handleInputChange}
                {...(errors.email && { error: true, helperText: errors.email })}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className={classes.postBtn}
            >Spremi</Button>
        </form>
    );
}


const mapStateToProps = state => ({
    postPersonList: state.postPerson.list
})

const mapActionToProps = {
    createPostPerson: actions.create,
    updatePostPerson: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostPersonForm));