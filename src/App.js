import React from 'react';
import { Grid } from '@material-ui/core';
import './App.css';
import youtube from './api/youtube';
import { SearchBar, VideoDetail, VideoList } from './components';

class App extends React.Component {
  state = {
    videos: [],
    selectedvideo: null,
  }
  componentDidMount() {
    this.handleSubmit('tiger');
  }
  onVideoSelect = (video) => {
    this.setState({ selectedvideo: video })
  }
  handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', { params: { q: searchTerm } });

    this.setState({ videos: response.data.items, selectedvideo: response.data.items[0] });
  }

  render() {

    return (
      <Grid justifyContent="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} ></SearchBar>
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={this.state.selectedvideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
