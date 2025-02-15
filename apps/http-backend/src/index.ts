import dotenv from 'dotenv';

// Configure environment variables
dotenv.config({
    path: './.env',
});

import app from './app';

app.listen(process.env.PORT || 8000, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});
