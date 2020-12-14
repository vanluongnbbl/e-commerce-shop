import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import useStyles from './styles'
function Product({ product }) {
    const classes = useStyles()
    // console.log("product", product)
    // return <div>test</div>
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={product.media.source}
                title={product.name}
            />

            <CardContent >
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom >
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price.formatted_width_symbol}
                    </Typography>
                </div>
                <Typography variant="body2" color="textSecondary" dangerouslySetInnerHTML={{ __html: product.description }} />
            </CardContent>

            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
