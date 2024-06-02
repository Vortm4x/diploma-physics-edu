import express from 'express'
import SharedScenarioController from '../controllers/SharedScenarioController'

module.exports = (app: express.Express) => {
    app.post('/share_scenario',
        SharedScenarioController.shareScenario)
    app.post('/get_scenarios',
        SharedScenarioController.updateMark)
}