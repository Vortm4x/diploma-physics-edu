import express from 'express'
import GroupController from '../controllers/GroupController'

module.exports = (app: express.Express) => {
    // app.post('/add_group',
    //     GroupController.addGroup)
    // app.post('/add_member',
    //     GroupController.addMember)
    app.post('/get_groups',
        GroupController.getGroups)
    // TODO
    // app.get('/group_members', )
    // app.get('/group_owner', )
}