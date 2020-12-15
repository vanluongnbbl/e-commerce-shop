import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
function FormIput({ name, label }) {
    const { control } = useFormContext()
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                defaultValue=""
                as={TextField}
                control={control}
                fullWidth
                name={name}
                label={label}
                required
            />
        </Grid>
    )
}

export default FormIput
