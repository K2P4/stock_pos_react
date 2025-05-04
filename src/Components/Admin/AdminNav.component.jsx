import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  Badge,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useLogoutMutation } from "../../store/services/endpoints/auth.endpoint";
import { AllContext } from "../../context/AllContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useGetOrdersQuery } from "../../store/services/endpoints/order.endpoint";

const AdminNavComponent = () => {
  const location = useLocation();
  const { setLogout } = useContext(AllContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cartAnchor, setCartAnchor] = React.useState(null);
  const { data } = useGetOrdersQuery({});



  // const cartOpen = Boolean(cartAnchor);

  // const handleCart = (event) => {
  //   setCartAnchor(event.currentTarget);
  // };

  // const open = Boolean(anchorEl);

  // const handleCloseCart = () => {
  //   setCartAnchor(null);
  // };

  // const handleOrder = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleCloseOrder = () => {
  //   setAnchorEl(null);
  // };

  // const [logoutFun] = useLogoutMutation();
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogout(true);
    nav("/login");
  };

  return (
    <Drawer
      className=" "
      variant="permanent"
      sx={{
        width: 75,

        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 75,
          boxSizing: "border-box",
          backgroundColor: "#f8f8f8",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        },
      }}
    >
      <List>
        {/* Dashboard */}
        <ListItem
          button
          className={`cursor-pointer `}
          component={Link}
          to="/admin/dashboard"
          sx={{ mb: 3, mt: 5 }}
        >
          <ListItemIcon>
            <DashboardIcon
              className={`hover:text-blue-400 duration-500 ${
                location.pathname == "/admin/dashboard" ? "text-blue-400" : " "
              } `}
            />
          </ListItemIcon>
          <ListItemText />
        </ListItem>

        {/* Category */}
        <ListItem
          button
          className=" cursor-pointer hover:bg-gray-50 transition-all duration-300 ease-in-out "
          component={Link}
          to="/admin/category"
          sx={{ mb: 3 }}
        >
          <ListItemIcon>
            <CategoryIcon
              className={`hover:text-blue-400 duration-500 ${
                location.pathname == "/admin/category" ? "text-blue-400" : " "
              } `}
            />
          </ListItemIcon>
          <ListItemText />
        </ListItem>

        {/* Stock */}

        <ListItem
          button
          className=" cursor-pointer hover:bg-gray-50 transition-all duration-300 ease-in-out "
          component={Link}
          to="/admin/stock"
          sx={{ mb: 3 }}
        >
          <ListItemIcon>
            <ShoppingCartIcon
              className={`hover:text-blue-400 duration-500 ${
                location.pathname.includes("stock") ? "text-blue-400" : " "
              } `}
            />
          </ListItemIcon>
          <ListItemText />
        </ListItem>

        {/* order */}

        <ListItem
          button
          className=" cursor-pointer hover:bg-gray-50 transition-all duration-300 ease-in-out "
          component={Link}
          to="/admin/order/history"
          sx={{ mb: 3 }}
        >
          <ListItemIcon>
            <Badge
              badgeContent={data?.pendingCount}
              smalls
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#FF6900",
                  color: "white",
                },
              }}
            >
              <LocalShippingIcon
                className={`hover:text-blue-400 duration-500 ${
                  location.pathname.includes("order") ? "text-blue-400" : " "
                } `}
              />
            </Badge>
          </ListItemIcon>
          <ListItemText />
        </ListItem>

        {/* Invoices */}
        <ListItem
          button
          className=" cursor-pointer hover:bg-gray-50 transition-all duration-300 ease-in-out "
          component={Link}
          to="/admin/invoices"
          sx={{ mb: 3 }}
        >
          <ListItemIcon>
            <ReceiptIcon
              className={`hover:text-blue-400 duration-500 ${
                location.pathname.includes("invoice") ? "text-blue-400" : " "
              } `}
            />
          </ListItemIcon>
          <ListItemText />
        </ListItem>

        {/* Profile */}
        <ListItem
          button
          className=" cursor-pointer hover:bg-gray-50 transition-all duration-300 ease-in-out "
          component={Link}
          to="/admin/profile"
          sx={{ mb: 3 }}
        >
          <ListItemIcon>
            <PersonIcon
              className={`hover:text-blue-400 duration-500 ${
                location.pathname.includes("profile") ? "text-blue-400" : " "
              } `}
            />
          </ListItemIcon>
          <ListItemText />
        </ListItem>

        {/* Signout */}
        <ListItem
          onClick={handleLogout}
          button
          className=" 
           mt-[200px] cursor-pointer hover:bg-gray-50 transition-all duration-300 ease-in-out "
          sx={{ mb: 5 }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminNavComponent;
