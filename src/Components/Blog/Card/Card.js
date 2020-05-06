import React, { useState, useEffect } from "react";
// import readingTime from "reading-time";
import { useHistory } from "react-router-dom";

import {
  // CardContainer,
  // CardHeader,
  CardCategory,
  // CardReadingTime,
  // CardTitle,
  // CardDescription,
} from './'

export const Card = ({ blog }) => {
  const [labels, setLabels] = useState([]);
  const history = useHistory();

  const openBlog = (title, number) => {
    history.push(`/blog/${title}/${number}`);
  }

  useEffect(() => {
    const labels = blog.labels.nodes.filter((value) => {
      return value.name !== "blog";
    });

    setLabels(labels);
  }, [blog.labels.nodes]);

  const styleCard = {
    overflow:"hidden"
  }

  const styleCardTitle = {
    fontSize:"20px",
    height:"70px"
  }

  return (
    <div className="col s12 m6 l4">
      <div className="card hoverable">
        <div className="card-content" style={styleCard}>
          <i className="material-icons right activator">more_vert</i>
          <span className="card-title activator grey-text text-darken-4" style={styleCardTitle} onClick={() => openBlog(blog.title, blog.number)}>
            {blog.title}
          </span>

        </div>
        <div className="card-action">
          &nbsp;
          <>
          {labels.map((value, i) => {
            return (
              <CardCategory value={value} key={i} />
            );
          })}
          </>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">{blog.title}<i className="material-icons right">close</i></span>
          {blog.body}
        </div>
      </div>
    </div>

    // <CardContainer>
    //   <CardHeader>
    //     <>
    //     {labels.map((value, i) => {
    //       return (
    //         <CardCategory value={value} key={i} />
    //       );
    //     })}
    //     </>
    //     <CardReadingTime time={readingTime(blog.body).minutes} />
    //   </CardHeader>
    //   <div onClick={() => openBlog(blog.title, blog.number)}>
    //     <CardTitle>{blog.title}</CardTitle>
    //     <CardDescription>
    //       {blog.bodyText}
    //     </CardDescription>
    //   </div>
    // </CardContainer>
  );
}
