import { USER_COMPANY_DATA_ENDPOINT } from "../../../lib/constants/apiURL"
import CompanyDataFetch from "../../../services/company/CompanyDataFetch";

let companyData: any = []

const fetchCompanyData = async () => {
  const result = await CompanyDataFetch(USER_COMPANY_DATA_ENDPOINT);
  companyData = result.data; 

};

fetchCompanyData();


const columns = [
  {name: "ID", uid: "id"},
  {name: "NAME", uid: "companyName"},
  {name: "Service", uid: "serviceName"},
  {name: "Service description", uid: "serviceDescription"},
  {name: "ACTIONS", uid: "actions"},
];


/*const users = [
  {
    id: 1,
    companyName: "Tony Reichert",
    email: "tony.reichert@example.com",
    description: "",
    createdAt: "",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    service: "Test",
    sdescription: "Test description",
  },
];*/

export {columns, companyData};