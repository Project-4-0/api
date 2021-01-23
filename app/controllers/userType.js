const UserType = require("../models").UserType;
// const Classroom = require('../models').Classroom;
// const Course = require('../models').Course;

module.exports = {
  list(req, res) {
    return UserType.findAll()
      .then((userTypes) => res.status(200).send(userTypes))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  //   getById(req, res) {
  //     return UserType
  //       .findByPk(req.params.id, {
  //         include: [{
  //           model: Classroom,
  //           as: 'classroom'
  //         },{
  //           model: Course,
  //           as: 'courses'
  //         }],
  //       })
  //       .then((student) => {
  //         if (!student) {
  //           return res.status(404).send({
  //             message: 'UserType Not Found',
  //           });
  //         }
  //         return res.status(200).send(student);
  //       })
  //       .catch((error) => res.status(400).send(error));
  //   },

  add(req, res) {
    return UserType.create({
      UserTypeName: req.body.UserTypeName,
    })
      .then((userType) => res.status(201).send(userType))
      .catch((error) => res.status(400).send(error));
  },

  //   addCourse(req, res) {
  //     return UserType
  //       .findByPk(req.body.student_id, {
  //         include: [{
  //           model: Classroom,
  //           as: 'classroom'
  //         },{
  //           model: Course,
  //           as: 'courses'
  //         }],
  //       })
  //       .then((student) => {
  //         if (!student) {
  //           return res.status(404).send({
  //             message: 'UserType Not Found',
  //           });
  //         }
  //         Course.findByPk(req.body.course_id).then((course) => {
  //           if (!course) {
  //             return res.status(404).send({
  //               message: 'Course Not Found',
  //             });
  //           }
  //           student.addCourse(course);
  //           return res.status(200).send(student);
  //         })
  //       })
  //       .catch((error) => res.status(400).send(error));
  //   },

  //   update(req, res) {
  //     return UserType
  //       .findByPk(req.params.id, {
  //         include: [{
  //           model: Classroom,
  //           as: 'classroom'
  //         },{
  //           model: Course,
  //           as: 'courses'
  //         }],
  //       })
  //       .then(student => {
  //         if (!student) {
  //           return res.status(404).send({
  //             message: 'UserType Not Found',
  //           });
  //         }
  //         return student
  //           .update({
  //             student_name: req.body.student_name || student.student_name,
  //           })
  //           .then(() => res.status(200).send(student))
  //           .catch((error) => res.status(400).send(error));
  //       })
  //       .catch((error) => res.status(400).send(error));
  //   },

  //   delete(req, res) {
  //     return UserType
  //       .findByPk(req.params.id)
  //       .then(student => {
  //         if (!student) {
  //           return res.status(400).send({
  //             message: 'UserType Not Found',
  //           });
  //         }
  //         return student
  //           .destroy()
  //           .then(() => res.status(204).send())
  //           .catch((error) => res.status(400).send(error));
  //       })
  //       .catch((error) => res.status(400).send(error));
  //   },
};
