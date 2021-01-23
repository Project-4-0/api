const User = require("../models").User;
// const Classroom = require('../models').Classroom;
// const Course = require('../models').Course;

module.exports = {
  list(req, res) {
    return User.findAll()
      .then((users) => res.status(200).send(users))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  //   getById(req, res) {
  //     return User
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
  //             message: 'User Not Found',
  //           });
  //         }
  //         return res.status(200).send(student);
  //       })
  //       .catch((error) => res.status(400).send(error));
  //   },

  add(req, res) {
    return User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Password: req.body.Password,
      Email: req.body.Email,
      Address: req.body.Address,
      PostalCode: req.body.PostalCode,
      City: req.body.City,
      UserTypeID: req.body.UserTypeID,
    })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

  //   addCourse(req, res) {
  //     return User
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
  //             message: 'User Not Found',
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
  //     return User
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
  //             message: 'User Not Found',
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
  //     return User
  //       .findByPk(req.params.id)
  //       .then(student => {
  //         if (!student) {
  //           return res.status(400).send({
  //             message: 'User Not Found',
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
