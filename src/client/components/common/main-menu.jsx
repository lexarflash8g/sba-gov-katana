import React from 'react';
import styles from './main-menu.scss';
import SubMenu from './menu/sub-menu.jsx';

class MainMenu extends React.Component {

  constructor(props) {
    super();
    this.state = {
      currentlyFocusedTopLevelMenu: -1
    };
    this.submenuRefs = [];
  }

  handleFocus(menuId) {
    this.setState({currentlyFocusedTopLevelMenu: menuId});
  }

  handleSkipToNext(menuId) {
    this.setState({
      currentlyFocusedTopLevelMenu: menuId + 1
    });
  }

  handleFinalBlur() {
    this.setState({currentlyFocusedTopLevelMenu: -1});
  }

  handleKeyDown(event) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);
    if (code == 9 && event.shiftKey) {
      if (this.state.currentlyFocusedTopLevelMenu === 0) {
        this.setState({currentlyFocusedTopLevelMenu: -1});
      }
    }
  }

  render() {
    const submenusPerColumn = [
      [
        1, 1
      ],
      [
        2, 2
      ],
      [
        2, 2, 2
      ],
      [0],
      [1],
      [2, 2, 3]
    ];
    let menuItems = [];
    if (this.props.data) {
      menuItems = this.props.data.map((item, index) => {
        return <SubMenu key={index} shown={index === this.state.currentlyFocusedTopLevelMenu} data={item} columnDefintion={submenusPerColumn[index]} onFocus={(event) => this.handleFocus(event)} menuId={index} onSkipToNext={(event) => this.handleSkipToNext(event)} isLast={index === this.props.data.length - 1} onFinalBlur={(event) => this.handleFinalBlur(event)} autoFocusOnTitle={index === this.state.currentlyFocusedTopLevelMenu}/>
      });
    } else {
      menuItems.push(
        <div></div>
      );
    }

    return (
      <nav role="menubar" aria-label="main navigation bar with dropdown submenus" className={styles.mainNavNew + " " + styles[this.props.theme]}>
        <ul className="reverse-ul" onKeyDown={(event) => this.handleKeyDown(event)}>
          {menuItems}
        </ul>
      </nav>
    );
  }
}
export default MainMenu;
