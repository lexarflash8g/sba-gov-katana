import React from 'react'

import styles from './detail-card-collection.scss'
import { DetailCard } from 'molecules'

class DetailCardCollection extends React.Component {
  renderCard(item, index) {
    return (
      <div className={'card-container ' + styles.card} key={index}>
        <DetailCard
          data={item}
          showDetails={this.props.showDetails}
          showBorder={true}
          fieldsToShowInDetails={this.props.fieldsToShowInDetails}
        />
      </div>
    )
  }

  renderCards() {
    return this.props.cards.map((card, index) => this.renderCard(card, index))
  }

  render() {
    return (
      <div className={'document-card-collection ' + styles.detailCardCollection}>{this.renderCards()}</div>
    )
  }
}

DetailCardCollection.propTypes = {
  cards: React.PropTypes.array,
  fieldsToShowInDetails: React.PropTypes.array
}

DetailCardCollection.defaultProps = {
  showDetails: true,
  fieldsToShowInDetails: []
}

export default DetailCardCollection
