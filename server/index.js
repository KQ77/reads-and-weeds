const app = require('./server');
const PORT = process.env.PORT || 1337;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
