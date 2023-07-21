import { FC } from 'react'
import ReactPlayer from 'react-player'

import style from './homeplayer.module.scss'

const HomePlayer: FC = () => {
	return (
		<>
			<div className={style.video}>
				<ReactPlayer
					muted
					width={'70'}
					height={'60vw'}
					url={'https://player.vimeo.com/video/726622515?h=557969d636'}
					controls={false}
					playing={true}
				/>
			</div>
		</>
	)
}
export default HomePlayer
