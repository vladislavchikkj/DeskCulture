import { FC } from 'react'
import ReactPlayer from 'react-player'
import style from './homeplayer.module.scss'
//@ts-ignore
import VideoContent from './video/test.mp4'

const HomePlayer: FC = () => {
	return (
		<div className={style.wrapper}>
			{/* @ts-ignore */}
			<ReactPlayer
				url={VideoContent}
				playing
				muted
				loop
				controls={false}
				playsinline
				className={style.video}
				width={'120%'}
				height={'120%'}
			></ReactPlayer>
		</div>
	)
}
export default HomePlayer
