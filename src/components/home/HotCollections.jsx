import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./Hotcollection.css";

const HotCollections = () => {
  const [hotCollection, setHotcollection] = useState([]);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 340;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 340;
  };

  useEffect(() => {
    async function getHotCollection() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotcollection(data);
      console.log(data);
    }
    getHotCollection();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div>
            <MdChevronLeft
              onClick={slideLeft}
              className="arrow left__arrow"
              size={40}
            />
            <div ref={sliderRef} className="keen-slider overflow-x-scroll scroll-smooth scrollbar-hide relative" id="slider">
              {hotCollection.map((collection) => (
                <div
                  className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-1"
                  key={collection.id}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <MdChevronRight
              onClick={slideRight}
              className="arrow right__arrow"
              size={40}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
