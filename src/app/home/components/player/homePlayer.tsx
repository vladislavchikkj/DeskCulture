import { FC } from 'react'
import ReactPlayer from 'react-player'
import style from './homeplayer.module.scss'
//@ts-ignore

const HomePlayer: FC = () => {
	return (
		<a className={style.wrapper}>
			{/* @ts-ignore */}
			<ReactPlayer
				url='https://rr4---sn-4g5lznl6.c.drive.google.com/videoplayback?expire=1699573344&ei=MERNZecl8I7Ytg_g4LLoCg&ip=37.212.52.171&id=188d5c388a33a39e&itag=22&source=webdrive&requiressl=yes&xpc=EghonaK1InoBAQ==&ttl=transient&susc=dr&driveid=12G-MiySUVF7lN-LEr03eVJ34hbDgoAef&app=explorer&eaua=Rw2rDU1UBY8&mime=video/mp4&vprv=1&prv=1&dur=24.729&lmt=1699562527351609&subapp=DRIVE_WEB_FILE_VIEWER&txp=0006224&sparams=expire,ei,ip,id,itag,source,requiressl,xpc,ttl,susc,driveid,app,eaua,mime,vprv,prv,dur,lmt&sig=ANLwegAwRQIgY-Ss8kQf-rN2WFFqJyHuiXn-Iqo-XEB_MkRFzg90yswCIQCHGUqhQ7oWZg7bufTfbalMsjK2rN-217vJNeap1m2qEw==&cpn=FoCglexBiLbwRtSK&c=WEB_EMBEDDED_PLAYER&cver=1.20231105.00.01&redirect_counter=1&cm2rm=sn-f5fez76&fexp=24350045&req_id=206b5faad3cfa3ee&cms_redirect=yes&cmsv=e&mh=Z-&mm=34&mn=sn-4g5lznl6&ms=ltu&mt=1699562442&mv=m&mvi=4&pl=21&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AM8Gb2swRgIhAPFVoxdOTw1C0MZC2wmnvw5vHbN5RbTswWMwdiuwHxb-AiEAoKeMt2y5w3u9Bkz4viYDMxtJy8LCN-lgywpcwu9t1Q8%3D'
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
