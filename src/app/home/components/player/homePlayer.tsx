import { FC } from 'react'
import style from './homeplayer.module.scss'
//@ts-ignore
import Video from './video/test.mp4'

const HomePlayer: FC = () => {
	return (
		<>
			<div>
				<video
					src={Video}
					autoPlay
					muted
					loop
					controls={false}
					playsInline
					className={style.video}
				></video>
			</div>
		</>
	)
}
export default HomePlayer
