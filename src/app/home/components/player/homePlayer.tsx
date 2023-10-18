import { FC } from 'react'
import style from './homeplayer.module.scss'
//@ts-ignore
import Video from './video/test.mp4'

const HomePlayer: FC = () => {
	return (
		<>
			<div className={style.video}>
				<video src={Video} autoPlay muted loop className={style.video}></video>
			</div>
		</>
	)
}
export default HomePlayer
