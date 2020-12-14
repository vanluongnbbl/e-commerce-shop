import { Grid } from '@material-ui/core'
import React from 'react'
import Product from './Product/Product'
import useStyles from './styles'



function Products({ products }) {
    const classes = useStyles()
    console.log('products', products)
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products