const facultyDto = require("../../model/dto/faculty.dto");

exports.createFaculty = (req, res, next) => {
    let fac = {
        code: req.body.code,
        name: req.body.name,
        deanname: req.body.deanname
    };
    facultyDto.create(fac, (err, data) => {
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(201).json(
            {
                info: data
            }
        )
    });
};

exports.updateFaculty = (req, res, next) => {
    let fac = {
        code: req.body.code,
        name: req.body.name,
        deanname: req.body.deanname
    };
    facultyDto.update({_id: req.body.id}, fac, (err, data) => {
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(201).json(
            {
                info: data
            }
        )
    });
};

exports.getAll = (req, res, next) => {
    facultyDto.getAll({}, (err, data) => {
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(200).json(
            {
                info: data
            }
        )
    });
};

exports.getByCode = (req, res, next) => {
    facultyDto.getByCode({code: req.params.code}, (err, data) => {
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(200).json(
            {
                info: data
            }
        )
    });
};

exports.getByID = (req, res, next) => {
    facultyDto.getByID({_id: req.params.id}, (err, data) => {
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        return res.status(200).json(
            {
                info: data
            }
        )
    });
};

exports.deleteFaculty = (req, res, next) => {
    facultyDto.delete({_id: req.body.id}, (err, data) => {
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(204).json(
            {
                info: data
            }
        )
    });
};