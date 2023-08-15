import { FC } from 'react'
import ReactPlayer from 'react-player'

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
					url={'https://player.vimeo.com/video/726622515?h=557969d636'}
					controls={false}
					playing={true}
					style={{
						position: 'relative',
						top: '0',
						height: '110vh',
						width: '250.66667vh',
						left: '50%',
						transform: 'translateX(-50%)'
					}}
				/>
			</div>
		</>
	)
}
export default HomePlayer
