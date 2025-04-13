import { useLocation } from "react-router-dom";
import "react-image-lightbox/style.css";
import Layout from "../../components/Layout";
import Helmet from "react-helmet";

import logo from "../../img/logo.png";

export default function ArticlePreview() {
  const location = useLocation();
  console.log(location.state);
  const { post } = location.state || {};
  console.log(post);

  if (!post) {
    return <div>Článek nenalezen</div>;
  }

  return (
    <Layout>
      <Helmet
        title={`${post.title} | Tábor Vysočina 3. turnus`}
        meta={[
          {
            name: "description",
            content:
              "Aktualita z tábora Vysočina 3. turnus v Novém Městě na Moravě",
          },
          {
            name: "keywords",
            content:
              "Tábor, Vysočina, PČR, Policie, Dětský tábor, Nové Město na Moravě, 3. turnus, Foto, Videa, Fotky, Fotogalerie",
          },
        ]}
      />
      <section className="article-post-body">
        <div className="container content">
          <div className="columns">
            <div>
              <h1 className="article-post-heading">{post.title}</h1>
              <p>{post.content}</p>
              <img
                src={post.imageUrl.length > 0 ? post.imageUrl : logo}
                alt="Article"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
