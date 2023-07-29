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
  Image,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
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
    <Box as="nav" py={2} px={4} bg="blue.500" color="white">
      <Flex alignItems="center" flexDirection={{ base: "column", md: "row" }}>
        <NavItem to="/">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={{ base: 2, md: 0 }}
          >
            <Image boxSize="50px" src="./logo192.png" alt="HappyBuyers" />
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              ml={2}
              display="inline"
            >
              HappyBuyers
            </Text>
          </Box>
        </NavItem>

        <Spacer />

        <InputGroup
          w={{ base: "full", md: "300px" }}
          mr={4}
          mb={{ base: 2, md: 0 }}
        >
          <Input
            placeholder="Search products"
            aria-label="Search products"
            // Add any search functionality here
          />
          <InputRightElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputRightElement>
        </InputGroup>

        <Flex alignItems="center">
          <NavItem to="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              size="2xl"
              style={{ color: "#f9e771" }}
              aria-label="Cart"
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
                aria-label="User Profile Menu"
              >
                <Avatar size="sm" name={user.name} src={user.pic} />
              </MenuButton>
              <MenuList textColor="black">
                <MenuItem as={Link} to="/profile">
                  My Profile
                </MenuItem>
                <MenuItem as={Link} to="/orders">
                  My Orders
                </MenuItem>

                {user?.isAdmin && (
                  <MenuItem as={Link} to="/addproduct">
                    Sell product
                  </MenuItem>
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
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ChakraLink
      as={Link}
      to={to}
      px={4}
      py={2}
      borderBottom={isActive ? "2px solid white" : "none"}
      _hover={{
        borderBottom: "2px solid white",
      }}
    >
      {children}
    </ChakraLink>
  );
};

export default Navbar;
