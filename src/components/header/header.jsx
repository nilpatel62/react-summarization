"use client";

import { Box, Flex, Container, Text } from "@chakra-ui/react";
import "./header.css";

export default function Header() {
  return (
    <>
      <Box bg={"transparent"} px={4}>
        <Container maxW="88vw">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box fontWeight={700} className={"brand"}>
              <Text as="p">Summarization</Text> <Text as="span">🤗</Text>
            </Box>

            <Flex alignItems={"center"}>
              {/* <Stack direction={"row"} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>

                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack> */}
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
