import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { AuthMethods } from '@/utils/index';

export default function withAuth<T extends JSX.IntrinsicAttributes>(AuthComponent: React.ComponentType<T>) {

	const auth = new AuthMethods();

	function AuthWrapped(props: T) {

    const navigate = useNavigate();
		const location = useLocation();

			useEffect(() => {
				if (!auth.loggedIn()) {
					const token = auth.getToken();
					if (token) {
						alert('Session expired. Please sign in again.')
					}
					auth.logout();
					navigate('/');
				}
			}, []);

			useEffect(() => {
				if (location.pathname === '/login') {
					auth.loggedIn() ? navigate('/') : navigate('/login');
				} else {
					if (!auth.loggedIn()) {
						navigate('/');
					}
				}
			}, []);

		return (
			
			<AuthComponent {...props} />
		)
	}
  	return AuthWrapped;
}