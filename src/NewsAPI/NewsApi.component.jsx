import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Dropdown } from 'react-bootstrap';
import './newsapi.css'
import { useNavigate } from 'react-router-dom';

function NewsApi() {
    const [data, setData] = useState([]);
    const [searchBar, setSearchBar] = useState('*');
    //  const [sortyBy, setSortBy] = useState('*');
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("general");
    const [categoryList] = useState(["general", "business", "entertainment", "health", "technology", "sports", "science"]);
    const [country, setCountry] = useState('*');
    const [countryList] = useState([
        {
            "key": "in",
            "value": "India"
        },
        {
            "key": "au",
            "value": "Australia"
        },
        {
            "key": "br",
            "value": "Brazil"
        },
        {
            "key": "ca",
            "value": "Canada"
        },
        {
            "key": "cn",
            "value": "China"
        },
    ])

    const navigate = useNavigate();

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        await axios.get("https://newsapi.org/v2/top-headlines?" +
            (searchBar == '*' ? "" : "q=" + searchBar + "&") +
            (country == '*' ? "" : "country=" + country + "&") +
            "category=" + category + "&page=" + page + "&apiKey=8f2ef75af4a34b45a7ca39bd5ed239bf")
            .then((response) => {
                console.log(response);
                setData(response.data.articles)
            })
    }

    const displayContent = (value) => {
        console.log(value);
        Swal.fire({
            title: value.title,
            text: value.content,
            customClass: 'swal-wide',
            confirmButtonText: 'Close'
        })
    }
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top" style={{ margin: '10px 7vw 30px 7vw' }}>
                <a className="navbar-brand" onClick={() => navigate('/')}>HOME</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li style={{ marginLeft: 30 }}>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Country
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        countryList.map((item) =>
                                            // eslint-disable-next-line react/jsx-key
                                            <Dropdown.Item onClick={() => {
                                                setCountry(item.key);
                                                setPage(1);
                                                console.log(country);
                                                getNews();
                                            }
                                            }>{item.value}</Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li style={{ marginLeft: 30 }}>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Category
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        categoryList.map((item) =>
                                            // eslint-disable-next-line react/jsx-key
                                            <Dropdown.Item onClick={() => {
                                                setCategory(item);
                                                setPage(1);
                                                console.log(category);
                                                getNews();
                                            }
                                            }>{item}</Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                    <div className="form-inline my-2 my-lg-0" style={{ display: 'flex', marginLeft: '45vw' }}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" style={{ marginRight: 15 }} onChange={event => setSearchBar(event.target.value)} aria-label="Search" />
                        <button className="btn btn-primary my-2 my-sm-0" type="submit" onClick={getNews}>Search</button>
                    </div>
                </div>
            </nav>

            <div style={{ width: '100vw', height: 80, backgroundColor: 'rgb(235, 246, 255)', position: 'fixed', zIndex: 1, top: 0 }}></div>

            <div className="container" style={{ marginTop: 100 }}>
                <div className="row" >
                    {
                        data.map((value) => {
                            return (
                                <>
                                    <div className="col-3" style={{ marginBottom: 50 }}>
                                        <div className="card" style={{ width: "18rem", border: '0px', boxShadow: '1px 0px 10px 0px rgba(21,41,255,0.34)' }}>
                                            <img className="card-img-top" src={
                                                value.urlToImage == null
                                                    ?
                                                    null
                                                    :
                                                    value.urlToImage
                                            } alt="" />
                                            <div className="card-body">
                                                <h5 className="card-title">{value.title}</h5>
                                                <p className="card-text">{value.description}</p>
                                                <div>
                                                    <button className='btn btn-primary' onClick={() => displayContent(value)}>read more ...</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>


            <div style={{ maxWidth: '80vw', display: 'flex', justifyContent: 'space-between', marginLeft: '10vw', marginRight: '10vw', marginBottom: '5vw' }} >
                {
                    page > 0
                        ?
                        <button className='btn btn-primary' onClick={() => {
                            setPage(page - 1);
                            window.scrollTo(0, 0);
                            getNews();
                        }}>previous page</button>
                        :
                        <button className='btn btn-primary disabled' onClick={() => {
                            setPage(page - 1);
                            window.scrollTo(0, 0);
                            getNews();
                        }}>previous page</button>
                }
                <button className='btn btn-primary' onClick={() => {
                    setPage(page + 1);
                    window.scrollTo(0, 0);
                    getNews();
                }}>next page</button>
            </div>
        </>
    )
}

export default NewsApi