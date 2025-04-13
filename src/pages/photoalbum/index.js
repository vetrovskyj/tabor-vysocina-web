import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Layout from "../../components/Layout";
import Helmet from "react-helmet";

export default function PhotoAlbum() {
  const location = useLocation();
  console.log(location.state);
  const { album } = location.state || {};
  console.log(album);
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 52;
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (album) {
      fetchAlbumPhotos(album.id);
    }
  }, [album]);

  const fetchAlbumPhotos = async (albumId) => {
    try {
      const response = await fetch(
        `https://google-photos-api-5ivj.onrender.com/photos?albumId=${albumId}`
      );
      const data = await response.json();
      setPhotos(data);

      // Modify the baseUrl to request original resolution images
      const updatedData = data.map((photo) => {
        // Assuming the `baseUrl` is something like: 'https://lh3.googleusercontent.com/d/album_image_base_url'
        // You can append `?sz=original` or similar depending on the API specification
        const highResUrl = photo.baseUrl + "=d"; // Example of requesting higher resolution image
        return { ...photo, highResUrl: highResUrl };
      });

      setPhotos(updatedData);
    } catch (error) {
      console.error("Failed to fetch album photos", error);
    }
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = photos.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(photos.length / imagesPerPage);

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <Layout>
      <Helmet
        title={album.title + ` | Tábor Vysočina 3. turnus`}
        meta={[
          {
            name: `description`,
            content:
              "Galerie fotek a videí z tábora Vysočina 3. turnus v Novém Městě na Moravě",
          },
          {
            name: "keywords",
            content:
              "Tábor, Vysočina, PČR, Policie, Dětský tábor, Nové Město na Moravě, 3. turnus, Foto, Videa, Fotky, Fotogalerie",
          },
        ]}
      />
      <main>
        <div className="gallery-container">
          {photos.length > 0 ? (
            <>
              {/* Pagination */}
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={
                      index + 1 === currentPage
                        ? "pagination-page active"
                        : "pagination-page"
                    }
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="grid">
                {currentImages.map((photo, index) => (
                  <div key={photo.id} className="grid-item">
                    <img
                      src={photo.baseUrl}
                      alt="Album Photo"
                      width="200"
                      onClick={() => {
                        console.log("Opening lightbox with index:", index);
                        setLightboxIndex(index);
                        setIsOpen(true);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ))}
              </div>
              {isOpen && (
                <Lightbox
                  mainSrc={currentImages[lightboxIndex]?.highResUrl}
                  nextSrc={
                    currentImages[(lightboxIndex + 1) % currentImages.length]
                      ?.highResUrl
                  }
                  prevSrc={
                    currentImages[
                      (lightboxIndex + currentImages.length - 1) %
                        currentImages.length
                    ]?.highResUrl
                  }
                  onCloseRequest={() => {
                    console.log("Closing lightbox");
                    setLightboxIndex(null);
                    setIsOpen(false);
                  }}
                  onMovePrevRequest={() =>
                    setLightboxIndex(
                      (lightboxIndex + currentImages.length - 1) %
                        currentImages.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setLightboxIndex((lightboxIndex + 1) % currentImages.length)
                  }
                />
              )}
            </>
          ) : (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </main>
      <div className="footer-to-bottom"></div>
    </Layout>
  );
}
