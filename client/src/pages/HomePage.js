import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth';
import { Prices } from "../components/Prices";
import axios from "axios"
import { Checkbox, Radio } from "antd"
import { useParams, useNavigate } from "react-router-dom";

import "../styles/HomePage.css";
import { useCart } from "../context/cart"
import { toast } from 'react-toastify';


import { AiOutlineReload } from "react-icons/ai";


const Homepage = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();

    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  return (

    <Layout>
      {/* <h1>home page</h1> */}
      {/* <pre>{ JSON.stringify(auth, null, 4) } </pre> */}
      {/* <pre>{ JSON.stringify(checked, null, 4) }</pre> */}
      {/* <pre>{ JSON.stringify(radio, null, 4) }</pre> */}
      {/* <pre>{ JSON.stringify(total, null, 4) }</pre> */}
      {/* banner image */}
      <div className='banner-card'>
        <img
          src="/images/banner2.jpg"
          className="banner-img"
          alt="bannerimage"
          width={"100%"}
          height={"500px"}
        />
        <div className='banner-text'>
          <h1>Spring collection</h1>
          <p>Shop for Rs.3500, get 20% off on your next purchase
            Hurry!<br></br>Valid till 11th April in stores & online.. T&C apply.</p>

          <button>Shop Now!</button>
        </div>
      </div>
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>

        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (

              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 60)}...</p>
                  <p className="card-text">$ {p.price}</p>


                  <button class="btn btn-primary ms-1" onClick={() => { navigate(`/product/${p.slug}`) }}>More Details</button>
                  <button class="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p])
                      localStorage.setItem("cart", JSON.stringify([...cart, p]))
                      toast.success("item added to cart")
                    }}
                  >ADD TO CART</button>
                </div>
              </div>

            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-primary ms-1"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : "loadMore"}
              </button>
            )}
          </div>
        </div>
      </div>

    </Layout>

  )
}

export default Homepage