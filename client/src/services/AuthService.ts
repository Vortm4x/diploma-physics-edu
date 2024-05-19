import Api from "@/services/Api";

export default {
  register(credentials: any) {
    return Api().post("/register", credentials);
  },
};
