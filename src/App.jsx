import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './App.css'

function New(Component) {
  class NewClass extends React.Component {
    render() {
      return <div className="wrap-item wrap-item-new">
                <span className="label">New!</span>
                <Component {...this.props}/>
              </div> 
    }
  }
  NewClass.propTypes = {
    key: PropTypes.string
  }; 
  return NewClass;
}

function Popular(Component) {
  class PopularClass extends React.Component {
    render() {
      return <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
                <Component {...this.props}/>
              </div> 
    }
  }
  PopularClass.propTypes = {
    key: PropTypes.string
  }; 
  return PopularClass;
}

Popular.propTypes = {
  title: PropTypes.string,
  views: PropTypes.number,
}

function Article(props) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
}

Article.propTypes = {
  title: PropTypes.string,
  views: PropTypes.number,
}

function Video(props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} allow="autoplay; encrypted-media"></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
}

Video.propTypes = {
  url: PropTypes.string,
  views: PropTypes.number,
}

// function Content(props) {
//   return (
//       <p className="date">{props.date}</p>
//   )
// }

// Content.propTypes = {
// date: PropTypes.string
// }

function List(props) {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                if ( item.views >= 1000 ) {
                  const ContentPopular = Popular(Video);
                  return (
                    <ContentPopular {...item} />
                  );
                } else if ( item.views < 100 ) {
                  const ContentNew = New(Video);
                  return (
                    <ContentNew {...item}/>
                  );
                } else {
                  return (
                    <Video {...item}/>
                  );
                }              

            case 'article':
              if ( item.views >= 1000 ) {
                const ContentPopular = Popular(Article);
                return (
                  <ContentPopular  {...item}/>
                );
              } else if ( item.views < 100 ) {
                const ContentNew = New(Article);
                return (
                  <ContentNew {...item}/>
                );
              } else {
                return (
                  <Article {...item}/>
                );
              }  
        }
    });
}

export default function App() {
    const [list] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 1112
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 32
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 153
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 1112,
        },
    ]);

    return (
        <List list={list} />
    );
}