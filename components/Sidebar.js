import { Avatar, IconButton, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Chat from "../components/Chat";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";


// We create components just like in react.
function Sidebar() {
  // provides us with the current user that's signed in.
  const [user] = useAuthState(auth);

  // this code goes through our chats collection and finds where
  // the user email is mentioned in the users array (which is in every chats).
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  // chatsSnapshot is a real time listener that updates for the emails 
  // based on our userChatRef query in our chats db collection users array
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you want to chat with."
    );

    if (!input) return null;

    // Validate Email
    // in this conditional, we don't want the input to match our users input and the chat doesn't already exist
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // if email is valid, push this chat into the DB
      // we're creating a collection of chats between the user and input.
      // add lets us create a new document in the chats collection.
      db.collection("chats").add({
        // we're saving the users email and the email from the input.
        users: [user.email, input],
      });
    }
  };

  // recipeintEmail is our input email
  const chatAlreadyExists = (recipeintEmail) =>
    // we need a real time connection with our chats collection to see (chatsSnapshot)
    // check if a chat w/ the recipeintEmail already exists
    // ?. is optional chaining b/c it may be undefined
    // ***!! is b/c we need to convert this return statement into a boolean value
    !!chatsSnapshot?.docs.find(
      (chat) =>
      //go through each chat doc's users array and check the emails inside
        chat.data().users.find((user) => user === recipeintEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
          <UserAvatar onClick={() => auth.signOut()} src={user?.photoURL} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search for Members" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* List of Chats */}
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

//The name we provide our styled component will
// allow us to use that in our component.
//i.e. <Container></Container> will get the styles
// we put in the bottom here
const Container = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  ${"" /* &&& will incrase the priority of whatever is inside of it.
    B/C we're using a materialUI Button, it has more specificity over
    our general styling. So in order to beat that, we can use &&& 
    from styled-component
   */}
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;
const IconsContainer = styled.div``;
const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
