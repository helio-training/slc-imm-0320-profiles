import React from 'react'
import Typography from '@material-ui/core/Typography';

import Layout from '../config/Layout';



const Home = () => {
    return (
        <Layout>
            <Typography variant="h1" component="h2" gutterBottom>
                Welcome Home
            </Typography>
            <Typography variant="body1" gutterBottom>
                This here be a website home page
            </Typography>
        </Layout>
    )
}

export default Home;