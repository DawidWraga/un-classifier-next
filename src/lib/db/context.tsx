'use client';
import { setup } from '@/lib/db/client';
import { createContext, useContext, useEffect, useState, useRef } from 'react';

function useDbInner() {
	const [isReady, setIsReady] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const setupCalled = useRef(false);

	useEffect(() => {
		if (setupCalled.current) return;
		setupCalled.current = true;

		setup()
			.then(() => setIsReady(true))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}, []);

	return { isReady, isError, isLoading };
}

export type DbContext = ReturnType<typeof useDbInner>;

const dbContext = createContext<DbContext | null>(null);

export function DbProvider({ children }: { children: React.ReactNode }) {
	const ctx = useDbInner();
	return (
		<dbContext.Provider value={ctx}>
			<DbScreenWrapper>{children}</DbScreenWrapper>
		</dbContext.Provider>
	);
}

export function useDb() {
	const ctx = useContext(dbContext);
	if (!ctx) {
		throw new Error('useDb must be used within a DbProvider');
	}
	return ctx;
}

export function DbScreenWrapper({ children }: { children: React.ReactNode }) {
	const { isLoading, isError, isReady } = useDb();

	if (isLoading) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<h3 className="text-xl font-bold text-black">Setting up database...</h3>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="w-screen h-screen flex items-center justify-center ">
				<h3 className="text-xl font-bold text-black">
					Error setting up database
				</h3>
			</div>
		);
	}

	if (!isReady) {
		return <div>Error setting up database</div>;
	}

	return children;
}
