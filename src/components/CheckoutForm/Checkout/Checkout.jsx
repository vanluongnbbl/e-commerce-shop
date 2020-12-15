import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { Link } from 'react-router-dom'
import { commerce } from '../../../lib/commerce'
const steps = ['Shipping address', 'Payment details']

function Checkout({ cart, order, error, onCaptureCheckout }) {
    const [checkoutToken, setCheckoutToken] = useState(null)
    const classes = useStyles()
    const [shippingData, setShippingData] = useState({})
    const [activeStep, setActiveStep] = useState(0)


    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                console.log('token: ', token)

                setCheckoutToken(token)
            } catch (error) {
                console.log(error)
            }
        }

        generateToken()
    }, [cart])

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">
                Back to home
            </Button>
        </>
    ) : (
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        )

    if (error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <Button component={Link} to="/" variant="outlined" type="button">
                Back to home
            </Button>
        </>
    }

    const Form = () => activeStep === 0 ?
        <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm
            shippingData={shippingData}
            checkoutToken={checkoutToken}
            backStep={backStep}
            nextStep={nextStep}
            onCaptureCheckout={onCaptureCheckout}
        />
    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={0} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
