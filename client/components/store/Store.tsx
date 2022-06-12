import React from 'react';
import { DashboardLayout } from '../util/DashboardLayout';
import { Header } from './Header';
import { StoreLayout } from './StoreLayout';

interface StoreProps {
	storeId: number;
}

export const Store = ({ storeId }: StoreProps) => {
	return (
		<DashboardLayout pageName='Store'>
			<Header isMyStore={false} />
			<StoreLayout id={storeId} />
		</DashboardLayout>
	);
};
