import React, { VFC } from 'react';
import { css } from '@emotion/css';
import { state } from '../modules/store';

export const BackgroundText: VFC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
				magna <Link text="Portfolio" color="#eb5c1b" url="https://portfolio3-black.vercel.app/" /> aliqua. Auctor urna
				nunc id cursus metus aliquam eleifend mi in. Pulvinar elementum integer enim neque. Nullam non nisi est sit.
				Vestibulum lorem sed risus ultricies tristique. Quis vel eros donec ac odio tempor orci dapibus{' '}
				<Link text="Twitter" color="#1ea1f2" url="https://twitter.com/focru_ino" /> ultrices. Ut tortor pretium viverra
				suspendisse potenti nullam. Tempor orci dapibus ultrices in. Tortor vitae purus faucibus ornare suspendisse sed
				nisi lacus. Consectetur purus ut faucibus pulvinar elementum integer. Fringilla urna{' '}
				<Link text="GitHub" color="#000" url="https://github.com/nemutas" /> porttitor rhoncus dolor. Gravida quis
				blandit turpis cursus. Eget aliquet nibh praesent tristique magna sit. Id volutpat lacus laoreet non. Lectus
				arcu bibendum at varius vel pharetra vel. Nulla malesuada pellentesque elit{' '}
				<Link text="Qiita" color="#53c300" url="https://qiita.com/nemutas" /> eget gravida cum sociis. Nisl condimentum
				id venenatis a condimentum vitae sapien pellentesque habitant.
			</div>
		</div>
	)
}

type LinkProps = {
	text: string
	color: string
	url: string
}
const Link: VFC<LinkProps> = props => {
	const { text, color, url } = props
	return (
		<a
			className={styles.heighlight(color)}
			href={url}
			target="_blank"
			rel="noreferrer noopener"
			onMouseEnter={() => (state.hoverLink = true)}
			onMouseLeave={() => (state.hoverLink = false)}>
			{text}
		</a>
	)
}

const styles = {
	container: css`
		position: absolute;
		width: 100%;
		padding: 100px;
		display: flex;
		justify-content: center;
	`,
	text: css`
		user-select: none;
		font-size: 4rem;
		color: #888;
	`,
	heighlight: (color: string) => css`
		position: relative;
		color: ${color};
		text-decoration: none;

		&::before {
			content: '';
			position: absolute;
			bottom: 0.1rem;
			left: 0;
			width: 0%;
			height: 4px;
			background-color: ${color};
			transition: 0.3s ease-out;
		}

		&:hover {
			&::before {
				width: 100%;
			}
		}
	`
}
