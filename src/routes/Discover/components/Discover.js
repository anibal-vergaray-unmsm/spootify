import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { getNewReleases, getFeaturedPlaylists, getCategories } from '../../../services/apiService';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  getNewReleases = async () => {
    const newReleases = await getNewReleases();
    this.setState({
      newReleases: newReleases
    });
  }

  getFeaturedPlaylists = async () => {
    const featuredPlaylists = await getFeaturedPlaylists();
    this.setState({
      playlists: featuredPlaylists
    });
  }
  getCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categories: categories
    });
  }

  componentDidMount(){
    this.getNewReleases();
    this.getFeaturedPlaylists();
    this.getCategories();
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
