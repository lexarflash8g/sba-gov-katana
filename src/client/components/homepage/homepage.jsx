import React from 'react';
import Header from '../common/header.jsx';
import Footer from '../common/footer.jsx';
import HappeningNow from "./happening-now.jsx";

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <HappeningNow />
        <Footer />
      </div>
    )
  }
}

export default Homepage;
