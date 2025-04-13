import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import logo from "../img/logo.png";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [], // Store the fetched articles in state
      loading: true, // Track loading state
      error: null, // Handle any errors during fetch
    };
  }

  async componentDidMount() {
    try {
      // Fetch articles from the backend
      const response = await axios.get(
        "https://google-photos-api-5ivj.onrender.com/articles"
      ); // Update this with your backend URL
      this.setState({
        posts: response.data, // Set the fetched articles in state
        loading: false, // Set loading to false after fetching
      });
    } catch (error) {
      this.setState({
        error: "Error fetching articles", // Set an error if fetching fails
        loading: false,
      });
    }
  }

  render() {
    const { posts, loading, error } = this.state;

    // Show loading spinner while fetching
    if (loading) {
      return (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      );
    }

    // Show error message if fetch fails
    if (error) {
      return <div>{error}</div>;
    }

    console.log(posts);

    return (
      <div className="article-list">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div className="article-container" key={index}>
              <article className="vylet">
                <p className="nazev_vyletu">
                  <Link
                    className="article-title"
                    key={post.title}
                    to={`/aktuality/${encodeURIComponent(post.title)}`}
                    state={{ post }}
                  >
                    {post.title}
                  </Link>
                  <span className="article-date">{post.date}</span>
                </p>
                <p className="text_vyletu">
                  {post.content}
                  <br />
                  <br />
                  <Link
                    className="more"
                    key={post.title}
                    to={`/aktuality/${encodeURIComponent(post.title)}`}
                    state={{ post }}
                  >
                    více...
                  </Link>
                </p>
                {
                  <Link
                    className="foto-href"
                    key={post.title}
                    to={`/aktuality/${encodeURIComponent(post.title)}`}
                    state={{ post }}
                  >
                    <img
                      src={post.imageUrl ? post.imageUrl : logo}
                      alt="Article"
                    />
                  </Link>
                }
              </article>
            </div>
          ))
        ) : (
          <div>No articles available</div>
        )}
      </div>
    );
  }
}

export default Articles;
