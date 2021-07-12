import { Avatar, IconButton, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

function Sidebar() {
  const [user] = useAuthState(auth);
  // this code goes through our chats collection and finds where
  // the user email is mentioned in the users array (which is in the chat).
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you want to chat with."
    );

    if (!input) return null;

    // Validate Email
    if (EmailValidator.validate(input) && input !== user.email) {
      // if email is valid, push this chat into the DB
      // we're creating a collection of chats between the user and input.
      db.collection("chats").add({
        // we're saving the users email and the email from the input.
        users: [user.email, input],
      });
    }
  };

  const chatExists = (recipeintEmail) => {
    // ?. is optional chaining if it's undefined
    chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipeintEmail)?.length > 0
    );
  };

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} />
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
      <SidebarButton>Start a new chat</SidebarButton>

      {/* List of Chats */}
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
