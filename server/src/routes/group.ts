import express from 'express'
import GroupController from '../controllers/GroupController'

module.exports = (app: express.Express) => {
    app.post('/add_group',
        GroupController.addGroup)
    app.post('/add_member',
        GroupController.addMember)
    // TODO
    // app.get('/group_members', )
    // app.get('/group_owner', )
}