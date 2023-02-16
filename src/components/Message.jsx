import { useChatContext } from "../context/ChatProvider";
import {useAuthContext} from "../context/AuthProvider";
import { Box, Avatar, Text } from '@chakra-ui/react';
import {formatDate} from "../utils/generalFunctions";



export default function Message({message})
{
  const {currentUser} = useAuthContext();
  const {data} = useChatContext();

  console.log(message);
  return(<>
            {
              message.senderId === currentUser.uid ?
                (<Box bg="#469B38" borderRadius='xl' py="0.5rem" width="fit-content"
                      my="1rem" mx="1rem" ml="auto" px="0.5rem"
                      style={{fontFamily: "'Karla', sans-serif"}}>
                  <span className="font-bold text-xl text-white">{message.text} </span>
                    <Text color="gray.50" fontSize="xs" mt="0.5rem">
                      {formatDate(message.date)}&nbsp;
                      <i className="bi bi-check2-all" style={{color:"#39B5E0", fontWeight:"bolder", fontSize:"1.3rem"}}>
                      </i>
                    </Text>

                </Box>) :
                (<Box bg="white" borderRadius='xl' py="0.5rem" px="0.5rem"
                      my="1rem" mx="1rem" mr="auto" width="fit-content"
                     style={{fontFamily: "'Karla', sans-serif"}}>
                  <span className="font-bold text-xl text-gray-900">{message.text} </span>
                    <Text color="gray.500" fontSize="xs" mt="0.5rem">
                      {formatDate(message.date)}&nbsp;
                      <i className="bi bi-check2-all" style={{color:"#39B5E0", fontWeight:"bolder", fontSize:"1.3rem"}}>
                      </i>
                    </Text>
                </Box>)

          }

        </>);
}
