const Student = require('../db/models/student');
const { Op } = require("sequelize");

const createStudent = async (req, res, next) => {
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
        return res.status(200).json({ status: 200, message: 'Created student successfully' });
    } catch (e) {
        return next({ status: 500, message: "Server Error" });
    }
}

const retrieveStudents = async (req, res, next) => {
    try {
        var whereCondition = {};
        if (req.query.searchTerm) {
            whereCondition = {
                [Op.or]: [
                    { firstName: { [Op.iLike]: '%' + req.query.searchTerm + '%' } },
                    { lastName: { [Op.iLike]: '%' + req.query.searchTerm + '%' } }
                ]
            }
        }

        var orderBy = [['id', 'ASC']];
        if (req.query.sortBy && req.query.sortDirection && (req.query.sortDirection === 'ASC' || req.query.sortDirection === 'DESC')) {
            if (req.query.sortBy === 'firstName' || req.query.sortBy === 'lastName' || req.query.sortBy === 'age')
                orderBy = [[req.query.sortBy, req.query.sortDirection]];
        }

        const st = await Student.findAll({
            where: whereCondition,
            order: orderBy,
            raw: true,
            nest: true,
        });

        return res.status(200).json(st);
    } catch (e) {
        return next({ status: 500, message: "Server Error" });
    }
}

const retrieveStudent = async (req, res, next) => {
    try {
        const id = parseInt(req.params.studentId, 10);
        const st = await Student.findByPk(id);

        if (!st) {
            return next({ status: 404, message: 'User does not exist' });
        }

        return res.status(200).json(st);
    } catch (e) {
        return next({ status: 500, message: "Server Error" });
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const id = parseInt(req.params.studentId, 10);
        const st = await Student.findByPk(id);

        if (!st) {
            return next({ status: 404, message: 'User does not exist' });
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

        return res.status(200).json({ status: 200, message: 'Updated student successfully' });
    } catch (e) {
        return next({ status: 500, message: "Server Error" });
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = parseInt(req.params.studentId, 10);
        const st = await Student.findByPk(id);

        if (!st) {
            return next({ status: 404, message: 'User does not exist' });
        }

        const deletedStudent = await Student.destroy({
            where: {
                id: id
            }
        });

        return res.status(200).json({ status: 200, message: 'Deleted student successfully' });
    } catch (e) {
        return next({ status: 500, message: "Server Error" });
    }
}

module.exports = { createStudent, retrieveStudents, retrieveStudent, updateStudent, deleteStudent };