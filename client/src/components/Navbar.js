import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Spacer,
  Link as ChakraLink,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/actions/authActions";
import NotificationBadge, { Effect } from "react-notification-badge";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  let cartCount = 0;
  if (isLoggedIn) {
    for (let i = 0; i < user.cart.length; i++) {
      cartCount += user.cart[i].quantity;
    }
  }

  const logoutHandler = () => {
    dispatch(logoutSuccess());
    localStorage.removeItem("token");
    toast({
      title: "Logged out successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    navigate("/");
  };

  return (
    <Box as="nav" py={4} px={8} bg="blue.500" color="white">
      <Flex alignItems="center">
        <NavItem to="/">
          <Text fontSize="xl" fontWeight="bold">
            HappyBuyers
          </Text>
        </NavItem>

        <Spacer />

        <InputGroup w="300px" mr={4}>
          <Input placeholder="Search products" />
          <InputRightElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputRightElement>
        </InputGroup>

        <Flex>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              size="2xl"
              style={{ color: "#f9e771" }}
            />
            <NotificationBadge
              count={cartCount}
              effect={Effect.SCALE}
              style={{
                backgroundColor: "green",
                color: "#000000",
                top: "-45px",
                right: "0px",
                padding: "2px",
                border: "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "25px",
                width: "25px",
                borderRadius: "100%",
              }}
              key={cartCount}
            />
          </NavItem>

          {isLoggedIn ? (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme="blue"
                variant="outline"
                mx={2}
              >
                <Avatar size="sm" name={user.name} src={user.pic} />
              </MenuButton>
              <MenuList textColor="black">
                <MenuItem>My Profile</MenuItem>
                <MenuItem>My Orders</MenuItem>

                {user?.isAdmin && (
                  <ChakraLink as={Link} to="/addproduct">
                    <MenuItem>Add Product</MenuItem>
                  </ChakraLink>
                )}

                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <NavItem to="/login">Login</NavItem>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

const NavItem = ({ to, children }) => {
  return (
    <ChakraLink as={Link} to={to} px={4} py={2}>
      {children}
    </ChakraLink>
  );
};

export default Navbar;
