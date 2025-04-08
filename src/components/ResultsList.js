import React, { Component } from 'react';
import './ResultsList.css';

class ResultsList extends Component {
  handleDownloadCSV = () => {
    const { results } = this.props;
    const headers = [
      'PubmedID',
      'Title',
      'Publication Date',
      'PubMed URL'
    ];

    const csvContent = [
      headers.join(','),
      ...results.map(result => [
        result.pubmedId,
        `"${result.title.replace(/"/g, '""')}"`,
        result.publicationDate,
        result.url || `https://pubmed.ncbi.nlm.nih.gov/${result.pubmedId}/`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'pubmed-results.csv';
    link.click();
  };

  render() {
    const { results, loading } = this.props;

    if (loading) {
      return <div className="loading">Searching...</div>;
    }

    if (!results || results.length === 0) {
      return null;
    }

    return (
      <div className="results-container">
        <div className="results-header">
          <h2>Search Results</h2>
          <button onClick={this.handleDownloadCSV} className="download-button">
            Download CSV
          </button>
        </div>
        <div className="results-list">
          {results.map(result => (
            <div key={result.pubmedId} className="result-card">
              <h3 className="result-title">{result.title}</h3>
              <div className="result-details">
                <p><strong>Pubmed ID:</strong> {result.pubmedId}</p>
                <p><strong>Publication Date:</strong> {result.publicationDate}</p>
                
                <div className="result-actions">
                  <a 
                    href={result.url || `https://pubmed.ncbi.nlm.nih.gov/${result.pubmedId}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pubmed-link-button"
                  >
                    View on PubMed
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ResultsList; 