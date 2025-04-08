import React from 'react';
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      error: null,
      suggestions: [
        'cancer research',
        'COVID-19 vaccine',
        'machine learning in healthcare',
        'genetic engineering',
        'neuroscience'
      ]
    };
  }

  handleSearch = async (query) => {
    this.setState({ loading: true, error: null });
    
    try {
      console.log('Sending search request for:', query);
      const response = await fetch('https://pubmed-backend.onrender.com/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ query }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Search error:', errorData);
        throw new Error(errorData.error || 'Search failed');
      }

      const data = await response.json();
      console.log('Received data:', data);
      this.setState({ results: data.results || [], loading: false });
    } catch (error) {
      console.error('Error during search:', error);
      this.setState({ error: error.message, loading: false, results: [] });
    }
  };

  render() {
    const { results, loading, error, suggestions } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>PubMed Explorer</h1>
          <p className="subtitle">Discover and analyze biomedical research papers</p>
        </header>
        <main className="App-main">
          <div className="search-section">
            <div className="search-container">
              <p className="pubmed-description">
                PubMed is a free search engine accessing primarily the MEDLINE database of references and abstracts on life sciences and biomedical topics. Search below to explore research papers.
              </p>
              <SearchForm onSearch={this.handleSearch} />
              <div className="suggestions">
                <h3>Popular Searches</h3>
                <div className="suggestion-tags">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-tag"
                      onClick={() => this.handleSearch(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          {!loading && results.length === 0 && (
            <div className="no-results show">
              No results found. Try a different search term.
            </div>
          )}
          <ResultsList results={results} loading={loading} />
        </main>
        <footer className="App-footer">
          <p>Powered by PubMed API | National Library of Medicine</p>
        </footer>
      </div>
    );
  }
}

export default App; 