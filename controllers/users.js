const db = require('../models/index');

module.exports = {

    getAllUsers: async (req, res, next) => {
        db.users.findAll(
            { where: { markAsDeleted: false } }
        ).then((result) => {
            res.status(200).json({
                status: true,
                message: 'Users fetched successfully',
                data: result
            });
        }).catch((error) => {
            res.status(500).json({
                status: false,
                message: error.message,
                data: {},
            });
        })
    },

    addUser: async (req, res, next) => {
        let { name, email, roleType, status, mobile } = req.body;

        const statusList = ['Active', 'Pending', 'Inactive'];
        const randomStatus = statusList[Math.floor(Math.random() * statusList.length)];

        db.users.create({
            name: name,
            email: email,
            mobile: mobile,
            status: randomStatus,
            roleType: roleType
        }).then((result) => {
            res.status(200).json({
                status: true,
                message: 'New user added successfully',
                data: {}
            });
        }).catch(
            (error) => {
                res.status(500).json({
                    status: false,
                    message: error.message,
                    data: {},
                });
            }
        );
    },

    updateUser: async (req, res, next) => {
        let { name, email, roleType, status, userId, mobile } = req.body;
        db.users.update(
            {
                name: name,
                email: email,
                roleType: roleType,
                mobile: mobile,
                status: status
            },
            { where: { userId: userId } })
            .then((result) => {
                res.status(200).json({
                    status: true,
                    message: 'User updated successfully',
                    data: {}
                });
            }).catch(
                (error) => {
                    res.status(500).json({
                        status: false,
                        message: error.message,
                        data: {},
                    });
                }
            );
    },

    deleteUser: async (req, res, next) => {
        let { userId } = req.body;
        db.users.update(
            { markAsDeleted: true },
            { where: { userId: userId } })
            .then((result) => {
                res.status(200).json({
                    status: true,
                    message: 'User deleted successfully',
                    data: {}
                });
            }).catch(
                (error) => {
                    res.status(500).json({
                        status: false,
                        message: error.message,
                        data: {},
                    });
                }
            );
    }
}