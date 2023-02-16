import { Input, InputGroup, InputRightElement, Button, TagLabel, HStack, Tag, Link } from '@chakra-ui/react';
import {useState} from "react";
import { v4 as uuid } from "uuid";
import { db, storage } from "../utils/config/firebase";
import {updateDoc, doc, arrayUnion, Timestamp, serverTimestamp} from "firebase/firestore";
import { useChatContext } from "../context/ChatProvider";
import {useAuthContext} from "../context/AuthProvider";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const InputMessage = () =>
{
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const {currentUser} = useAuthContext();
  const {data} = useChatContext();


  const handleSend = async () =>{
                                if (img)
                                {
                                  const storageRef = ref(storage, uuid());
                                  const uploadTask = uploadBytesResumable(storageRef, img);

                                  uploadTask.on(
                                          (error) => {

                                                     },
                                          () =>{
                                            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>
                                            {
                                              await updateDoc(doc(db, "chats", data.chatId), {
                                                messages: arrayUnion({
                                                  id: uuid(),
                                                  text,
                                                  senderId: currentUser.uid,
                                                  date: Timestamp.now(),
                                                  img: downloadURL,
                                                }),
                                              });
                                            });
                                          }
                                        );

                                }else
                                  {
                                    await updateDoc(doc(db, "chats", data.chatId), {
                                                             messages: arrayUnion({
                                                             id: uuid(),
                                                             text,
                                                             senderId: currentUser.uid,
                                                             date: Timestamp.now(),
                                                              }),
                                          });
                                  }

                                  //latest message
                                  await updateDoc(doc(db, "userChats", currentUser.uid), {
                                        [data.chatId + ".lastMessage"]: {
                                          text,
                                        },
                                        [data.chatId + ".date"]: serverTimestamp(),
                                      });

                                      await updateDoc(doc(db, "userChats", data.user.uid), {
                                            [data.chatId + ".lastMessage"]: {
                                              text,
                                            },
                                            [data.chatId + ".date"]: serverTimestamp(),
                                          });

                                  setText("");
                                  setImg(null);
                            }
  return(<>
            <InputGroup size='md'>
              <Input type="text" placeholder='Type message...' variant='outline' focusBorderColor='green.400'
                     fontSize="lg"  bgColor="white" color="gray.900" size='md' borderColor="green.600"
                     value={text} className="font-semibold" onChange={(e) => setText(e.target.value)}
                     onKeyDown={(e) => e.code === "Enter" && handleSend()}
                />

              <InputRightElement width="3.5rem">
                  <HStack>

                  <Button as={Link} href="https://www.emojicopy.com/" target="_blank"
                          size='md' h="2rem" colorScheme='whatsapp'>
                      <i className="bi bi-emoji-smile-fill text-yellow-400 font-bold text-lg"></i>
                  </Button>
                </HStack>
              </InputRightElement>
            </InputGroup>
        </>);
}


export default InputMessage;
