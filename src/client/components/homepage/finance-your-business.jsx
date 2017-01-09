import React from 'react';
import styles from '../../styles/homepage/finance-your-business.scss';
import fYBImage from '../../../../public/assets/images/homepage/finance.jpg';
import diagonalLines from '../../../../public/assets/images/homepage/diagonal-lines.png';
import diagonalLinesMobile from '../../../../public/assets/images/homepage/diagonal-lines-mobile.png';

export const FinanceYourBusinessSection = (props) => <div className={ styles.fybContainer }>
                                                       <p>Finance your business.</p>
                                                       <img className={ styles.fybBanner } src={ fYBImage } alt="Finance your business." />
                                                       <div className={ styles.fybAccentBox }>
                                                         <ul>
                                                             <a href="https://www.sba.gov/loans-grants/see-what-sba-offers/what-sba-offers-help-small-businesses-grow"><li className = { styles.borderBox }>What SBA offers</li></a>
                                                             <a href="https://www.sba.gov/loans-grants/see-what-sba-offers/sba-loan-programs"><li className = { styles.borderBox }>Loan programs</li></a>
                                                             <a href="https://www.sba.gov/tools/linc"><li>Connect with SBA lenders</li></a>
                                                         </ul>
                                                         <img className="hidden-xs" src={ diagonalLines } alt="" />
                                                         <img className="visible-xs" src={ diagonalLinesMobile } alt="" />
                                                       </div>
                                                     </div>