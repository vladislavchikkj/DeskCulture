import { FC } from 'react'
import ReactPlayer from 'react-player'
import style from './homeplayer.module.scss'
//@ts-ignore

const HomePlayer: FC = () => {
	return (
		<a className={style.wrapper}>
			{/* @ts-ignore */}
			<ReactPlayer
				// url='https://player.vimeo.com/video/883047695?badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479'
				// url='https://player.vimeo.com/video/883371218?h=a6c65d0f0f'
				url='https://player.vimeo.com/video/883382427?h=de37272447'
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
