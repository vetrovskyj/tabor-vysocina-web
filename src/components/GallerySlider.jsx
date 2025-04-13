import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo from "../img/logo.png"

const GallerySlider = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://google-photos-api-5ivj.onrender.com/albums")
      .then((response) => response.json())
      .then((data) => {
        // Remove duplicates
        const uniqueAlbums = Array.from(
          new Map(data.map((album) => [album.id, album])).values()
        );
        setAlbums(uniqueAlbums);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const filterAndRenderAlbums = (keyword, title) => {
    const filteredAlbums = albums.filter((album) =>
      album.title.toLowerCase().includes(keyword)
    );

    // Sort albums by year extracted from the title (newest first)
    filteredAlbums.sort((a, b) => {
      const yearA = a.title.replace(keyword, "").match(/\d{4}/)?.[0] || "0"; // Extract year from title
      const yearB = b.title.replace(keyword, "").match(/\d{4}/)?.[0] || "0"; // Extract year from title
      return yearB - yearA; // Newest first
    });

    if (filteredAlbums.length === 0) return null;

    return (
      <div className="years-section">
        <h2>{title}</h2>
        {filteredAlbums.length > 1 ? (
          <Slider {...settings}>
            {filteredAlbums.map((album) => (
              <div key={album.id} className="years-item-container">
                <Link
                  className="gallery-carousel-container"
                  key={album.title}
                  to={`/galerie/${encodeURIComponent(album.title)}`}
                  state={{ album }}
                >
                  <img alt={album.title} src={album.highResCoverPhoto || logo} />
                  <div className="gallery-carousel-text">
                    {album.title.replace(keyword, "")}
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          // If only one album, render without a slider
          <div className="years-item-container">
            <Link
              className="gallery-carousel-container"
              key={filteredAlbums[0].title}
              to={`/galerie/${encodeURIComponent(filteredAlbums[0].title)}`}
              state={{ album: filteredAlbums[0] }}
            >
              <img
                alt={filteredAlbums[0].title}
                src={filteredAlbums[0].highResCoverPhoto || logo}
              />
              <div className="gallery-carousel-text">
                {filteredAlbums[0].title.replace(keyword, "")}
              </div>
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {albums.length > 0 && filterAndRenderAlbums("leto", "Léto")}
      {albums.length > 0 && filterAndRenderAlbums("velikonoce", "Velikonoce")}
    </div>
  );
};

export default GallerySlider;
