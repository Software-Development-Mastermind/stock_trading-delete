import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthMethods } from '@utils/index'


export default function withAuth(AuthComponent) {

	const auth = new AuthMethods();

	function AuthWrapped() {

    const navigate = useNavigate();
	const location = useLocation();

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
			<AuthComponent />
		)
	}
  	return AuthWrapped;
}