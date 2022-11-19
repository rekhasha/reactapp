import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    const {title, description, imageUrl, detailUrl, author, date, source} = this.props
    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex: '1' , left:'90%'}}>
               {source}
        </span>
        <img src={!imageUrl ? 'https://storage.googleapis.com/afs-prod/media/9986ab8703014649abef0f039db97e62/3000.jpeg' : imageUrl } className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author ? author : 'unknown'} on {new Date(date).toTimeString()}</small></p>           
            <a href={detailUrl} rel="noreferrer" target='_blank' className="btn btn-primary btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
