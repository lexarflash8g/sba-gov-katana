import React from 'react';
import styles from './small-primary-button.scss';

 const SmallPrimaryButton = (props) =>
	<div>
		<button id={props.id} className={ styles.SmallPrimaryButton } href={props.URL} onClick={props.onClick} disabled={props.disabled} target={props.newWindow ? "_blank" : "_self"}>{ props.text }</button>
	</div>;

export default SmallPrimaryButton;
