import Api from "./Api";

export const userRole = {
  id: "qNSdAsHodjc",
  name: "Hesabu Admin",
  displayName: "Hesabu Admin",
  description: "Hesabu Admin",
  authorities: [],
};

export const createAdminRole = async () => {
  try {
    const dhis2Api = await Api.instance();
    const response = await dhis2Api
      .post("userRoles", userRole)
      .catch(resp => resp);
    debugger;
    alert(JSON.stringify(response));
  } catch (error) {
    debugger;
    alert("Something went wrong. Are you admin ? ", error);
  }
};
