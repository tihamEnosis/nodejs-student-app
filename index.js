const express = require('express')
const multer = require('multer')
const path = require('node:path')
const { createStudent, updateStudent, deleteStudent, retrieveStudents } = require('./api/student')
const { paramShouldBeINT } = require('./middlewares/paramChecker')
const { bodyDataValidation } = require('./middlewares/requestBodyDataChecker')
const { contentTypeCheck } = require('./middlewares/contentTypeChecker')

require('dotenv').config({ path: `${process.cwd()}/.env` })

const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.use('/public/studentProfilePictures', express.static('public/studentProfilePictures'))

const storage = multer.diskStorage({
    destination: 'public/studentProfilePictures/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + file.originalname.replace(path.extname(file.originalname), "") + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })


app.post('/create', contentTypeCheck, upload.single('profilePicture'), bodyDataValidation, createStudent)

app.get('/retrieve', retrieveStudents)

app.put('/update/:studentId', contentTypeCheck, paramShouldBeINT, upload.single('profilePicture'), bodyDataValidation, updateStudent)

app.delete('/delete/:studentId', paramShouldBeINT, deleteStudent)

app.all('*', (req, res, next) => {
    return next({ status: 404, message: 'Resource not found' })
})

app.use((err, req, res, next) => {
    res.status((err.status) ? err.status : 500).json((err.message) ? err.message : err)
})
app.listen(PORT, () => console.log(`Listening at port ${PORT}`))