import React from 'react'

import setupStyle from '../catalogSetups.module.scss'

interface SetupProps {
	setups: any[] // Замените на соответствующий тип
}

const SetupList: React.FC<SetupProps> = ({ setups }) => {
	return (
		<div className={setupStyle.itemWrapper}>
			{setups.map(setup => (
				<div key={setup.id} className={setupStyle.item}>
					<div className={setupStyle.imageWrapper}>
						<img
							src={setup.image}
							alt={setup.name}
							className={setupStyle.image}
						/>
					</div>
					<div className={setupStyle.descr}>
						<h3>{setup.name}</h3>
						<h4>{setup.description}</h4>
					</div>
				</div>
			))}
		</div>
	)
}

export default SetupList
