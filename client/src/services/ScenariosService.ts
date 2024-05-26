import Api from "@/services/Api";

export default {
  async getScenarios(token: string) {
    try {
      return (await Api().post("/get_scenarios", { token: token })).data
        .scenarios;
    } catch (error) {
      console.error("get_scenarios call returned an error ", error);
    }
  },

  async addScenario(token: string, name: string) {
    try {
      return (await Api().post("/add_scenario", { token: token, name: name }))
        .data.scenario;
    } catch (error) {
      console.error("add_scenario call returned an error ", error);
    }
  },
};
