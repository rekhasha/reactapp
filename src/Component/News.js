import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
 static defaultProps = {
  country : 'in',
  pageSize : 6,
  category : 'general'
 }
 static propTypes = {
   country : PropTypes.string,
   pageSize : PropTypes.number,
   category : PropTypes.string,
 }

  constructor(props){
    super(props); 
    this.state = {
        articles : [],
        loading : false,
        page : 1,
        totalResults : 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey App`
  }
  async updateNews(){
    this.props.setProgress(0);
    let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4335e38bd8ab4b8cb9d0d7d2757d694a&Page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading : true})
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseddata = await data.json();
    this.props.setProgress(70);
    this.setState({articles : parseddata.articles,
      totalResults : parseddata.totalResults,
      loading : false
    })
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updateNews();
  }
  capitalizeFirstLetter = (str) =>{
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  // handlePreviousClick = async () =>{
  //    await this.setState({page : this.state.page - 1})
  //    this.updateNews();
  // }

  // handleNextClick = async () =>{
  //   await this.setState({page : this.state.page + 1})
  //   this.updateNews();
  // }

  fetchMoreData = async () =>{
    let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4335e38bd8ab4b8cb9d0d7d2757d694a&Page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading : true})
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      page : this.state.page + 1,
      articles : this.state.articles.concat(parseddata.articles),
      totalResults : parseddata.totalResults,
      loading : false
    })
  }
  
  render() {
    return (
      <>
        <h1 className='text-center my-3' style={{margin : '30px opx'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
      <div className='container'>
        <div className='row'>
          {this.state.articles.map((element)=>{
            return (<div className='col-md-4' key={element.url}>
              <NewsItem title={element.title} description={element.description ? (element.description.length > 65 ? element.description.slice(0,65): element.description): ''} imageUrl={element.urlToImage} detailUrl = {element.url}
              author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>)
          })}
        </div>
      </div>
      </InfiniteScroll>
      {/* --implemented previous next paging system */}
        {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled = {this.state.page === 1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button type="button" disabled = {this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
