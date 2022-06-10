import React from 'react'

const NewsItem = (props)=> {
        let {title, description, imageUrl, newsUrl, Author, date, source}  = props; //destructuring

        return (
            <div className="my-2">
                <div className="card">
                    <img src={imageUrl?imageUrl : "https://img.freepik.com/free-vector/global-digital-earth-network-connection-technology-background_1017-23328.jpg?size=626&ext=jpg"} className="card-img-top" style={{height: "13rem"}} alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}... <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '80%', zIndex: '1'}}>{source}</span></h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!Author?"Unknown" : Author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>      
                </div>
            </div>
        )
}

export default NewsItem
