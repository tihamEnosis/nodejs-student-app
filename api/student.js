const Student = require('../db/models/student')
const { Op } = require("sequelize")

const createStudent = async (req, res) => {
    try {
        const student = await Student.create({
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            age: parseInt(req.body.age.trim()),
            gender: req.body.gender.trim(),
            path: req.file.destination + req.file.filename,
            initialFileName: req.file.originalname,
            modifiedFileName: req.file.filename
        })

        return res.status(200).json({ file: req.file, student: student })
    } catch (e) {
        return next({ status: 500, message: "Server Error" })
    }
}

const retrieveStudents = async (req, res, next) => {
    try {
        var whereCondition = {}
        if (req.query.src !== undefined && req.query.src !== '') {
            whereCondition = {
                [Op.or]: [
                    { firstName: { [Op.iLike]: '%' + req.query.src + '%' } },
                    { lastName: { [Op.iLike]: '%' + req.query.src + '%' } }
                ]
            }
        }

        var orderBy = [['id', 'ASC']]
        if (req.query.srtBy !== undefined && req.query.srt !== undefined && (req.query.srt === 'ASC' || req.query.srt === 'DESC')) {
            if (req.query.srtBy !== 'firstName' || req.query.srtBy === 'lastName' || req.query.srtBy === 'age')
                orderBy = [[req.query.srtBy, req.query.srt]]
        }

        const st = await Student.findAll({
            where: whereCondition,
            order: orderBy,
            raw: true,
            nest: true,
        })

        return res.status(200).json(st)
    } catch (e) {
        return next({ status: 500, message: "Server Error" })
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const id = parseInt(req.params.studentId, 10)
        const st = await Student.findByPk(id);

        if (st === null) {
            return next({ status: 404, message: 'User does not exist' })
        }

        const updatedStudent = await Student.update({
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            age: parseInt(req.body.age.trim()),
            gender: req.body.gender.trim(),
            path: req.file.destination + req.file.filename,
            initialFileName: req.file.originalname,
            modifiedFileName: req.file.filename
        }, {
            where: {
                id: id,
            },
        });

        return res.status(200).json({ file: req.file, up: updatedStudent })
    } catch (e) {
        return next({ status: 500, message: "Server Error" })
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = parseInt(req.params.studentId, 10)
        const st = await Student.findByPk(id);

        if (st === null) {
            return next({ status: 404, message: 'User does not exist' })
        }

        const deletedStudent = await Student.destroy({
            where: {
                id: id
            }
        })

        return res.status(200).json({ msg: 'deleted', del: deletedStudent })
    } catch (e) {
        return next({ status: 500, message: "Server Error" })
    }
}

module.exports = { createStudent, retrieveStudents, updateStudent, deleteStudent }