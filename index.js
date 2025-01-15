const express = require('express');
const multer = require('multer');
var cors = require('cors');
const path = require('node:path');
const { createStudent, updateStudent, deleteStudent, retrieveStudents, retrieveStudent } = require('./api/student');
const { paramShouldBePositiveINT } = require('./middlewares/paramChecker');
const { bodyDataValidation } = require('./middlewares/requestBodyDataChecker');
const { contentTypeCheck } = require('./middlewares/contentTypeChecker');

require('dotenv').config({ path: `${process.cwd()}/.env` });

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/public/studentProfilePictures', express.static('public/studentProfilePictures'));

const storage = multer.diskStorage({
    destination: 'public/studentProfilePictures/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + file.originalname.replace(path.extname(file.originalname), "") + '-' + uniqueSuffix);
    }
})

const upload = multer({ storage: storage });


app.post('/create', contentTypeCheck, upload.single('profilePicture'), bodyDataValidation, createStudent);

app.get('/retrieve', retrieveStudents);

app.get('/specificRetrieve/:studentId', paramShouldBePositiveINT, retrieveStudent)

app.put('/update/:studentId', contentTypeCheck, paramShouldBePositiveINT, upload.single('profilePicture'), bodyDataValidation, updateStudent);

app.delete('/delete/:studentId', paramShouldBePositiveINT, deleteStudent);

app.all('*', (req, res, next) => {
    return next({ status: 404, message: 'Resource not found' });
});

app.use((err, req, res, next) => {
    res.status((err.status) ? err.status : 500).json((err.message) ? err.message : err);
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));