import {
    createOrganizationLogin,
    updateOrganization,
} from './../dao/OrganizationDao';
const organizationController = async (detail) => {
    // organizationName: 'adfgadgad', adminId: '2'
    const result = await createOrganizationLogin(detail);
    return result;
};

const udpateOrganization = async (data) => {
    const { org_Id, isActive, organizationName } = data;
    console.log({ org_Id, organizationName });
    const result = await updateOrganization(org_Id, isActive, organizationName);
    console.log({ result });
    return result;
};
export = {
    organizationController,
    udpateOrganization,
};
