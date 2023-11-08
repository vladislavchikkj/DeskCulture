import { FC } from 'react'
import ReactPlayer from 'react-player'
import style from './homeplayer.module.scss'
//@ts-ignore
import VideoContent from './video/test.mp4'

const HomePlayer: FC = () => {
	return (
		<a className={style.wrapper}>
			{/* @ts-ignore */}
			<ReactPlayer
				url={VideoContent}
				playing
				muted
				loop
				controls={false}
				playsinline
				className={style.video}
				width={'100%'}
				height={'100%'}
			></ReactPlayer>
		</a>
	)
}
export default HomePlayer
