import { useRouter } from "next/router";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { Avatar } from "@material-ui/core";
import getRecipientEmail from "../utils/getRecipientEmail";

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipeintSnapShot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );

  const enterChat = () => {
    // this will route our url to the resource specific page
    router.push(`/chat/${id}`);
  };

  // the reason for the ? is b/c these functions are async, so there's a good
  // chance we could get undefined
  const recipient = recipeintSnapShot?.docs?.[0]?.data();

  //   console.log(recipeintSnapShot);
  const recipeintEmail = getRecipientEmail(users, user);
  //   console.log(recipeintEmail);

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipeintEmail[0]}</UserAvatar>
      )}
      <p>{recipeintEmail}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
