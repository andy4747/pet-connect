import React from 'react';
import { DashboardLayout } from '../util/DashboardLayout';
import { Header } from './Header';
import { MyStoreLayout } from './MyStoreLayout';

export const MyStore = () => {
	return (
		<DashboardLayout pageName='My-Store'>
			<Header isMyStore={true} />
			<MyStoreLayout />
		</DashboardLayout>
	);
};
