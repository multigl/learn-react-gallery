var data = {
  "album": {
    "name": "Around the World"
  },
  "photos": [
    {
      "id":"1",
      "url":"assets/image1.jpg",
      "thumb_url":"assets/thumbs/thumb1.jpg",
      "title":"Mountain Tunnel",
      "date":"December 15, 2009",
      "location":"the Rocky Mountains"
    },
    {
      "id":"2",
      "url":"assets/image2.jpg",
      "thumb_url":"assets/thumbs/thumb2.jpg",
      "title":"City at Night",
      "date":"January 1, 2008",
      "location":"London, England"
    },
    {
      "id":"3",
      "url":"assets/image3.jpg",
      "thumb_url":"assets/thumbs/thumb3.jpg",
      "title":"Tree-lined Drive",
      "date":"February 26, 2008",
      "location":"Paris, France"
    },
    {
      "id":"4",
      "url":"assets/image4.jpg",
      "thumb_url":"assets/thumbs/thumb4.jpg",
      "title":"Sand and Sun",
      "date":"May 1, 2008",
      "location":"San Diego, California"
    },
    {
      "id":"5",
      "url":"assets/image5.jpg",
      "thumb_url":"assets/thumbs/thumb5.jpg",
      "title":"Phone Booth",
      "date":"March 13, 2008",
      "location":"London, England"
    },
    {
      "id":"6",
      "url":"assets/image6.jpg",
      "thumb_url":"assets/thumbs/thumb6.jpg",
      "title":"Golden Gate Bridge",
      "date":"July 4, 2008",
      "location":"San Francisco, California"
    }
  ]
};

var Gallery = React.createClass({
    getInitialState: function() {
        return {photo: data.photos[0]};
    },

    navigateNext: function() {
        var current = this.state.photo,
            index = _.indexOf(data.photos, current),
            next;

        if (index === _.size(data.photos) - 1) {
            next = data.photos[0];
        } else {
            next = data.photos[index + 1];
        }

        this.setState({photo: next});
    },

    navigatePrevious: function() {
        var current = this.state.photo,
            index = _.indexOf(data.photos, current),
            previous;

        if (index === 0) {
            previous = _.last(data.photos);
        } else {
            previous = data.photos[index - 1];
        }

        this.setState({photo: previous});
    },

    handleThumbnailSelect: function(photo) {
        this.setState({photo: photo});
    },

    render: function() {
        var thumbnails = this.props.data.photos.map(_.bind(function(photo) {
                return (
                    <Thumbnail data={photo} key={photo.id} current={this.state.photo} onThumbnailClick={this.handleThumbnailSelect}/>
                );
            }, this));

        return (
            <div>
                <div className="image-gallery">
                    <AlbumTitle data={this.props.data.album}/>
                    <div className="navigate prev">
                        <img src="assets/nav/left.png" alt="previous image" onClick={this.navigatePrevious}/>
                    </div>
                    <div className="navigate next">
                        <img src="assets/nav/right.png" alt="next image" onClick={this.navigateNext}/>
                    </div>
                    <ImageHero data={this.state.photo}/>
                    <ImageDescription data={this.state.photo}/>
                </div>
                <ul className="thumbnails">
                    {thumbnails}
                </ul>
            </div>
        );
    }
});

var AlbumTitle = React.createClass({
    render: function() {
        return (
            <div className="album-title"><div>{this.props.data.name}</div></div>
        );
    }
});

var ImageHero = React.createClass({
   render: function() {
        return (
            <img className="hero" src={this.props.data.url} alt={this.props.data.description}/>
        );
   }
});

var ImageDescription = React.createClass({
    render: function() {
        return (
            <div className="img-description">
                <div className="img-title">{this.props.data.title}</div>
                <p>Taken on {this.props.data.date} in {this.props.data.location}</p>
            </div>
        );
    }
});

var Thumbnail = React.createClass({

    selectThumbnail: function() {
        // inform my container that I've been clicked
        this.props.onThumbnailClick(this.props.data);
    },

    render: function() {
        var img_class = this.props.current.id === this.props.data.id ? "selected" : "not-selected";

        return (
            <li className={img_class}><img src={this.props.data.thumb_url} alt={this.props.data.title} onClick={this.selectThumbnail}/></li>
        )
    }
});

ReactDOM.render(
  <Gallery data={data}/>,
  document.getElementById('content')
);
