import Api from "@/services/Api";

export default {
  async getGroups(token: any) {
    try {
      return (await Api().post("/get_groups", { token: token })).data.groups;
    } catch (error) {
      console.error("get_groups call returned an error ", error);
    }
  },
  async getGroup(groupName: string, token: any) {
    try {
      const result = (
        await Api().post("/get_group", { groupName: groupName, token: token })
      ).data;
      if (result.error) {
        console.error(result.error);
      }
      return result;
    } catch (error: any) {
      console.error("get_group call returned an error ", error);
      return error.response.data;
    }
  },
  async addGroup(token: any, name: string) {
    try {
      return (await Api().post("/add_group", { token: token, name: name })).data
        .group;
    } catch (error) {
      console.error("addGroup call returned an error ", error);
    }
  },
};
