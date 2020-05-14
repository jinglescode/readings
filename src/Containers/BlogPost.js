import React, { useState, useEffect, useCallback, useRef } from "react";
// import moment from "moment";
import Markdown from "markdown-to-jsx";
// import readingTime from "reading-time";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import { GithubSelector, GithubCounter } from "react-reactions";
import { userClient } from '../Utils/apollo'
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { config } from "../config";
import { getEmojiByName, getNameByEmoji } from '../Utils/emoji';
import { getAuthenticatedUser } from '../Utils/auth'
import { Loader } from "../Components/Common";
import { PostContainer, PostTitle, PostDate, PostDateLink, PostReaction, BackButton } from "../Components/Post";
// import { AuthorDetails, AuthorAvatar, AuthorName } from "../Components/Post/Author";
// import { GithubLogin } from '../Components/Header'

import { Header } from "../Components/Header";

export default function BlogHome() {
  const issueNumber = parseInt(window.location.href.split("/").pop());
  const GET_POSTS = gql`{
    repository(owner: "${config.githubUserName}", name: "${config.githubRepo}") {
      issue(number: ${issueNumber}) {
        title
        body
        bodyHTML
        url
        bodyText
        number
        bodyHTML
        author {
          url
          avatarUrl
          login
        }
        reactions(first:100){
          nodes{
            content
            user{
              id
              login
            }
          }
        }
        updatedAt
        id
      }
    }
  }
  `;
  const [post, setPost] = useState([]);
  const [postNodeId, setPostNodeId] = useState('');
  // const [reactionPopup, setReactionPopup] = useState(false);
  const [postReactions, setPostReactions] = useState([]);
  const { loading, error, data } = useQuery(GET_POSTS);
  // const reactionsContainer = useRef(null);
  const userToken = localStorage.getItem('githubToken');

  const setReactionFun = useCallback((reactions) => {
    // {
    //   emoji: "👍", // String emoji reaction
    //   by: "case" // String of persons name
    // }

    let reactions_array = [];
    reactions.forEach(element => {
      let obj = {
        by: element.user.login,
        emoji: getEmojiByName(element.content)
      };
      reactions_array.push(obj);
    });

    setPostReactions(reactions_array);
  }, []);


  const H1 = ({ children }) => (
    <h1>
      {children}
    </h1>
  );

  // IF wanna add hardcoded styles inside const H1.
  // <style jsx="true">
  //   {`
  //     h1 {
  //       font-size: 2rem !important;
  //     }
  //   `}
  // </style>

  const HyperLink = ({ children, ...props }) => (
    <a href={props.href} target="_blank" rel="noopener noreferrer" className="truncate">
      {children}
    </a>
  );

  const CodeBlock = ({ children }) => (
    <div class="language-plaintext highlighter-rouge">
      <div className="highlight">
        <pre className="highlight">
          <code>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );

  // const toggleReaction = async (emoji) => {
  //   let reactions = postReactions;
  //   const user = await getAuthenticatedUser();
  //   const existingReaction = reactions.filter(r => (r.emoji === emoji && r.by === user.login))
  //
  //   if (existingReaction.length === 0) {
  //     const reactionToAdd = {
  //       by: user.login,
  //       emoji: emoji,
  //     }
  //
  //     // Add the reaction
  //     await userClient(userToken).mutate({
  //       mutation: gql`
  //         mutation AddReaction {
  //           addReaction(input:{subjectId:"${postNodeId}",content:${getNameByEmoji(emoji)},clientMutationId:"${user.node_id}"}) {
  //             reaction {
  //               id
  //             }
  //           }
  //         }
  //       `
  //     });
  //
  //     reactions.push(reactionToAdd);
  //   } else {
  //     // Remove the reaction
  //     await userClient(userToken).mutate({
  //       mutation: gql`
  //         mutation RemoveReaction {
  //           removeReaction(input:{subjectId:"${postNodeId}",content:${getNameByEmoji(emoji)},clientMutationId:"${user.node_id}"}) {
  //             reaction {
  //               id
  //             }
  //           }
  //         }
  //       `
  //     });
  //
  //     // Remove the reaction from the state
  //     reactions = reactions.filter(r => !(r.by === user.login && r.emoji === emoji))
  //   }
  //
  //   setPostReactions(reactions);
  //   reactionsContainer.current.forceUpdate(); // refresh the counter
  //   setReactionPopup(false); // hiding the reactions choice
  // }

  useEffect(() => {
    if (!loading) {
      if (data) {
        const issues = data.repository.issue;
        setPostNodeId(issues.id);
        setPost(issues);
        setReactionFun(issues.reactions.nodes);
      }
    }
  }, [loading, error, data, setReactionFun]);

  if (loading) {
    return <Loader />;
  }

  const onBackClick = () => {
    // ifthe previous page does not exist in the history list. this method to load the previous (or next) URL in the history list.
    window.history.go();
    // The back() method loads the previous URL in the history list.
    window.history.back();
  };

  return (
    <>
      <Header />
      {post.title && (
      <div className="container blog-content">
        <div className="card">
          <div className="card-content blog-content">
            <h1 className="title grey-text text-darken-4">{post.title}</h1>
            <Markdown options={{
                overrides: {
                  a: {
                    component: HyperLink
                  },
                  code: {
                    component: CodeBlock
                  },
                  h1: {
                    component: H1
                  }
                }
              }}>
              {post.body}
            </Markdown>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
