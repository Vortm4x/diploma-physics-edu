import Api from "@/services/Api";

export default {
  async getGroups(token: any) {
    try {
      console.log("Here");
      return (await Api().post("/get_groups", { token: token })).data.groups;
    } catch (error) {
      console.error("get_groups call returned an error ", error);
    }
  },
};
