import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../util/DashboardLayout';

export const StoreList = () => {
	const [stores, setStores] = useState([]);
	const router = useRouter();
	useEffect(() => {
		(async () => {
			const resp = await fetch('http://localhost:5000/stores', {
				method: 'GET',
				credentials: 'include',
			});
			const respData = await resp.json();
			setStores(respData);
		})();
	}, []);
	return (
		<DashboardLayout pageName='Stores'>
			{stores.map((item: any) => {
				return (
					<div
						key={item.id}
						className='w-[80%] border-1 rounded-md bg-gray-100 shadow mt-4 p-4 mx-auto'
						onClick={(e) => {
							router.push(`/store/${item.id}`);
						}}>
						<div className='flex'>
							<p className='text-black flex-1'>{item.username.toUpperCase()}</p>
						</div>
					</div>
				);
			})}
		</DashboardLayout>
	);
};
