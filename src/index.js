import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PhotoAlbum from "./pages/photoalbum";
import Home from "./pages/index";
import Informace from "./pages/informace/index";
import Aktuality from "./pages/aktuality/index";
import Galerie from "./pages/galerie/index";
import Kontakt from "./pages/kontakt/index";
import GalleryAuth from "./pages/gallery-auth/GalleryAuth";
import ArticlePreview from "./pages/clanek";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informace" element={<Informace />} />
        <Route path="/aktuality" element={<Aktuality />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/galerie/:albumTitle" element={<PhotoAlbum />} />
        <Route path="/galerie/:albumTitle/:photoId" element={<PhotoAlbum />} />
        <Route path="/aktuality/:articleTitle" element={<ArticlePreview />} />
        <Route path="/galerie/auth" element={<GalleryAuth />} />
      </Routes>
    </Router>
);
