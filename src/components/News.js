import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News=(props)=>{

  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

    const firstLetterUppercase =()=>
    {
      const str = props.category;
      const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      
      return str2;
    }

    const updateNews = async()=>{
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}=${page}&pageSize=${props.pageSize}`;
      setloading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);

      setarticles(parsedData.articles);
      settotalResults(parsedData.totalResults);
      setloading(false);
      
      props.setProgress(100);
    }

    useEffect(() => {
      document.title = `MyDailyNews - ${firstLetterUppercase()}`
      updateNews();
      //eslint-disable-next-line
    }, [])

    const fetchMoreData = async() => {
      // this.setState({loading: true})
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}=${page+1}&pageSize=${props.pageSize}`;
      setpage(page+1);
      let data = await fetch(url);
      let parsedData = await data.json();

      setarticles(articles.concat(parsedData.articles));
      settotalResults(parsedData.totalResults);
      setloading(false);
    }
    // handlePrevClick = async() =>{
    //   //made a function so that the code becomes short and conscise
    //   this.setState({page: this.state.page+1});
    //   this.updateNews();
    // }

    // handleNextClick = async ()=>{
    //   if(!(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)))
    //   {
    //     this.setState({page: this.state.page+1});
    //     this.updateNews();
    //   }
    // }


        return (
           <>   
                <h2 className="text-center" style={{margin: '70px 0px 12px 0px'}} >MyDailyNews - Top {firstLetterUppercase()} Headlines</h2>
                {loading && <Spinner/>}
                <InfiniteScroll
                  dataLength={articles.length}
                  next={fetchMoreData}
                  hasMore={articles.length !== totalResults}
                  loader={<h4><Spinner/></h4>}>
                    
                    <div className="container">
                      <div className="row">
                        {articles.map((element)=>{
                          return <div className="col-md-4" key={element.url}>
                                  <NewsItem title = {element.title?element.title.slice(0, 44): ""} description = {element.description?element.description.slice(0,91):""} imageUrl = {element.urlToImage} newsUrl = {element.url} Author = {element.author} date = {element.publishedAt} source = {element.source.name} />
                                </div> 
                        })}   
                      </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-center">
                  <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-2" onClick={this.handlePrevClick}>&larr;Previous</button>
                  <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-danger mx-2" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
          </>
        )
}

export default News
News.defaultProps ={
  name: 'Stranger',
  country: 'in',
  pageSize: 15,
  category: 'General',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}