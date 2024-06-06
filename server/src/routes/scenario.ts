import express from 'express'
import ScenarioController from '../controllers/ScenarioController'

module.exports = (app: express.Express) => {
    app.post('/add_scenario',
        ScenarioController.addScenario)
    app.post('/get_scenario',
        ScenarioController.getScenario)
    app.post('/get_scenarios',
        ScenarioController.getScenarios)
}