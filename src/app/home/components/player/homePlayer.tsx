import { FC, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import { motion } from 'framer-motion'
import style from './homeplayer.module.scss'

const HomePlayer: FC = () => {
	return (
		<>
			<div className={style.video}>
				<ReactPlayer
					muted
					loop={true}
					width={'250.66667vh'}
					height={'130vh'}
					// url={
					// 	'https://vod-progressive.akamaized.net/exp=1692884951~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F324%2F29%2F726622515%2F3369471836.mp4~hmac=19eafbe045033ae4ed756d6609a857b8741e10d0a569ad4d38d80525fd1be6ed/vimeo-prod-skyfire-std-us/01/324/29/726622515/3369471836.mp4'
					// }
					url={'https://player.vimeo.com/video/726622515?h=557969d636'}
					// controls={false}
					playing={true}
					style={{
						position: 'relative',
						top: '0',
						height: '110vh',
						width: '250.66667vh',
						left: '50%',
						transform: 'translateX(-50%)',
						zIndex: -1
					}}
				></ReactPlayer>
			</div>
		</>
	)
}
export default HomePlayer
