import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import EditOrganizationPopup from "examples/popup/editOrganization";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src ={image} name={name} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        <a href="/">{title}</a>
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Organization", accessor: "organization", align: "left" },
      { Header: "Admin", accessor: "Admin", align: "left" },
      { Header: "created At", accessor: "createdAt", align: "left" },
      { Header: "status", accessor: "status", align: "left" },
      { Header: "Users", accessor: "users", align: "left" },

      { Header: "Edit Detail", accessor: "action", align: "left" },
      { Header: "View Analysis", accessor: "orgAnalysis", align: "left" },
    ],

    rows: [
      {
        Admin: <Author name="John Michael" email="john@creative-tim.com" />,
        organization: (
          <Job
            title="Manag                                                                                                                                                               er"
            description="Organization"
          />
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        createdAt: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        users: <>USeer Component to create</>,
        action: <EditOrganizationPopup />,

        orgAnalysis: <>organization detail page todo</>,
      },
      {
        Admin: <Author name="Alexa Liras" email="alexa@creative-tim.com" />,
        organization: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        createdAt: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        users: <>USeer Component to create</>,
        action: <EditOrganizationPopup />,

        orgAnalysis: <>organization detail page todo</>,
      },
      {
        Admin: <Author name="Laurent Perrier" email="laurent@creative-tim.com" />,
        organization: <Job title="Executive" description="Projects" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        createdAt: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            19/09/17
          </MDTypography>
        ),
        users: <>USeer Component to create</>,
        action: <EditOrganizationPopup />,

        orgAnalysis: <>organization detail page todo</>,
      },
      {
        Admin: <Author name="Michael Levi" email="michael@creative-tim.com" />,
        organization: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        createdAt: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/12/08
          </MDTypography>
        ),
        users: <>USeer Component to create</>,
        action: <EditOrganizationPopup />,

        orgAnalysis: <>organization detail page todo</>,
      },
      {
        Admin: <Author name="Richard Gran" email="richard@creative-tim.com" />,
        organization: <Job title="Manager" description="Executive" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        createdAt: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            04/10/21
          </MDTypography>
        ),
        users: <>USeer Component to create</>,
        action: <EditOrganizationPopup />,

        orgAnalysis: <>organization detail page todo</>,
      },
      {
        Admin: <Author name="Miriam Eric" email="miriam@creative-tim.com" />,
        organization: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        createdAt: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            14/09/20
          </MDTypography>
        ),
        users: <>USeer Component to create</>,
        action: <EditOrganizationPopup />,

        orgAnalysis: <>organization detail page todo</>,
      },
    ],
  };
}
