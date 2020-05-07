import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

import { config } from "../config";
import { Header } from "../Components/Header";
import { Loader } from '../Components/Common'
// import { BlogContainer } from '../Components/Blog'
import { Card } from '../Components/Blog/Card'

const GET_POSTS = gql`
{
  repository(owner: "${config.githubUserName}", name: "${config.githubRepo}") {
    issues(first: 100, states: OPEN, filterBy: { labels: "blog" }) {
      nodes {
        title
        body
        bodyHTML
        bodyText
        number
        labels(first: 100) {
          nodes {
            color
            name
            id
          }
        }
        author {
          url
          avatarUrl
          login
        }
        updatedAt
        id
      }
    }
  }
}
`

const Blog = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [posts, setPosts] = useState([]);
  let [filteredData, setFilteredData] = useState([]);

  const searchSpace = (event) => {
    let search_keywords = event.target.value;

    filteredData = posts.filter((data)=>{
      // var matches = search_keywords.match(/\[(.*?)\]/);


      let search_tags = [];

      let matches = search_keywords.split('[')
      .filter(function(v){ return v.indexOf(']') > -1})
      .map( function(value) {
        return value.split(']')[0]
      })

      if(matches != null){
        for(let i = 0; i < matches.length; i++) {
            let str = matches[i];
            search_tags.push(str);
        }
      }

      let list_keywords = search_keywords.split(" ");
      let select_this = false;

      for (let i in data.labels.nodes){
        let post_tag = data.labels.nodes[i].name
        if(search_tags.includes(post_tag)){
          select_this = true;
          break;
        }
      }
      for(let k_i in list_keywords){
        if(data.title.toLowerCase().includes(list_keywords[k_i])){ //  || data.body.toLowerCase().includes(search_keywords)
          select_this = true;
          break;
        }
      }

      if(select_this){
        // console.log(data)
        return data
      }
    });
    setFilteredData(filteredData);
  }

  // useEffect(() => {
  //   filteredData = posts.filter((data)=>{
  //     if(data.title.toLowerCase().includes(search_keywords)){
  //       console.log(111, data)
  //       return data
  //     }
  //   });
  // });

  useEffect(() => {
    if (!loading) {
      if (error) {
        console.error(error)
      }
      if (data) {
        setPosts(data?.repository?.issues?.nodes)
        setFilteredData(data?.repository?.issues?.nodes);
      }
    }
  }, [loading, error, data]);

  return (
    <>
      <Header />
      <div className="container">

        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">search</i>
            <input placeholder="search..." id="search" type="text" className="validate" onChange={(e)=>searchSpace(e)} />
          </div>
        </div>

        <div className="row">
          {
            loading
            ? <Loader />
            : filteredData.map((v, i) => {
                return <Card blog={v} key={i} />;
              })
          }
        </div>
      </div>
    </>
  );
}

export default Blog;
