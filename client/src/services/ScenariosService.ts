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

  async getScenario(token: string, id: string) {
    try {
      return (await Api().post("/get_scenario", { token: token, id: id })).data
        .scenario;
    } catch (error) {
      console.error("get_scenarios call returned an error ", error);
    }
  },

  async getSharedScenario(token: string, id: string) {
    try {
      return (
        await Api().post("/get_shared_scenario", { token: token, id: id })
      ).data;
    } catch (error) {
      console.error("get_shared_scenario call returned an error ", error);
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

  async shareScenario(
    token: string | null,
    groupName: string,
    scenarioName: string
  ) {
    try {
      return (
        await Api().post("/share_scenario", {
          token: token,
          groupName: groupName,
          name: scenarioName,
        })
      ).data.scenario;
    } catch (error) {
      console.error("add_scenario call returned an error ", error);
    }
  },
};
