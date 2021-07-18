import Head from "next/head";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

// although the file name is [id] which is a (param
// we can name it something specific just for us to
// be able to use it.
// the CHAT & MESSAGES props are coming from the sever side
function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

// What this function will do for us is: it will get all the requested details from the server
// and will have it ready for our client side to use before anything is rendered
export async function getServerSideProps(context) {
  // we're retreiving the id from dynamic routings. params: {id:...}
  // the id === chat.id
  const ref = db.collection("chats").doc(context.query.id);

  // prep messages on the server
  // this says: once we have the correct chat document ^^ "ref";
  // go to the "messages" collection and order the documents by timestamps
  // and ascending. and Get them;
  const messagesRef = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  // Here: we're adding an id to each message document.
  // We get an array of messages that have id's and the correct timestamps
  const messages = messagesRef.docs
    .map((doc) => ({
      id: doc.id,
      // we need data() to get the values from a db document.
      ...doc.data(),
    }))
    // Here: we're adjusting the timestamp because we lose the data type in transition.
    .map((messages) => ({
      ...messages,
      //   when we receive a time stamp from the server to the client, we lose the data type.
      // when we have to stringify the timestamp
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // this gets us the messages documents as refreced above.
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    // we've seperated the chat and the messages although the chat also has the messages
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
