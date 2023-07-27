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
} from "@chakra-ui/react";

import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(logoutSuccess());
    navigate("/");
  };

  return (
    <Box as="nav" py={4} px={8} bg="blue.500" color="white">
      <Flex alignItems="center">
        <Text fontSize="xl" fontWeight="bold">
          HappyBuyers
        </Text>

        <Spacer />

        <InputGroup w="300px" mr={4}>
          <Input placeholder="Search products" />
          <InputRightElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputRightElement>
        </InputGroup>

        <Flex>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/cart">Cart</NavItem>

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

                <ChakraLink as={Link} to="/addproduct">
                  <MenuItem>Add Product</MenuItem>
                </ChakraLink>

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
