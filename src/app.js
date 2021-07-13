const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} port`);
});
