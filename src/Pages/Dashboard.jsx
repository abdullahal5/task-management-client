import * as React from "react";
import { Container } from "@mui/material";
import Nav from "../Components/Nav";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { AuthContext } from "../authprovider/Authprovider";
import { VscSignOut } from "react-icons/vsc";
import Swal from "sweetalert2";


const Dashboard = () => {
const { user, logout } = React.useContext(AuthContext);
const navigate = useNavigate()
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const handleLogOut = () => {
  logout().then(() => {
    navigate("/");
    Swal.fire({
      title: "Good Job!",
      text: "you successfully logged out",
      icon: "success",
    });
  });
};
const pages = [
  {
    path: "to-do",
    pathname: "TO-DO",
    icon: <FaTasks color="#304D30" fontSize={"1.5rem"} />,
  },
//   {
//     path: "signOut",
//     pathname: user ? <span onClick={handleLogOut}>Sign Out</span> : "sign up",
//     icon: <VscSignOut color="#304D30" fontSize={"1.5rem"} />,
//   },
];

  return (
    <div className="pt-20 bg-gray-100">
      <Nav />
      <Container>
        <Box className="lg:block md:block hidden" sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={3}>
              <Item className="min-h-screen ">
                <div>
                  {user ? (
                    <div className="flex justify-start items-center gap-3">
                      <img
                        className="w-[60px] h-[60px] rounded-[50%] object-cover"
                        src={user?.photoURL}
                        alt=""
                      />
                      <div>
                        <p className="text-xl font-semibold text-[#304D30]">
                          {user?.displayName}
                        </p>
                        <p className="text-[#757575]">USER</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <hr className="border-[#304D30] mt-5" />
                <div className="">
                  {pages.map((item) => (
                    <div key={item.path}>
                      <ul>
                        <li className="items-center">
                          <Link to={item.path}>
                            <div className="flex gap-2 text-center mx-auto justify-center hover:bg-slate-200 py-3 rounded-lg">
                              {item.icon}
                              <h1
                                className={`text-xl font-semibold text-[#304D30]`}
                              >
                                {item.pathname}
                              </h1>
                            </div>
                          </Link>
                        </li>
                      </ul>
                      <hr className="border-[#757575]" />
                    </div>
                  ))}
                </div>
              </Item>
            </Grid>
            <Grid item xs={9}>
              <Item>
                <Outlet />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
