import React from 'react'
import PropTypes from 'prop-types'
import styles from './image-section.scss'

const ImageSection = ({ alt, caption, src }) => (
  <div>
    <img data-testid="image-section" className={styles.imageSection} alt={alt} src={src} />
    <p data-testid="image-caption" className={styles.caption}>
      {caption}
    </p>
  </div>
)

ImageSection.propTypes = {
  alt: PropTypes.string.isRequired,
  caption: PropTypes.string,
  src: PropTypes.string.isRequired
}

export default ImageSection
