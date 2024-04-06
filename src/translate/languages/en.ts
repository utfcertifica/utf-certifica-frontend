const messages = {
	en: {
		translations: {
			signup: {
				title: 'Sign up',
				toasts: {
					success: 'User created successfully! Please login!',
					fail: 'Error creating user. Check the reported data.',
				},
				form: {
					name: 'Name',
					email: 'E-mail',
					password: 'Password',
				},
				buttons: {
					submit: 'Register',
					login: 'Already have an account? Log in!',
				},
			},
			login: {
				title: 'Login',
				form: {
					email: 'E-mail',
					password: 'Password',
				},
				buttons: {
					submit: 'Enter',
					register: "Don't have an account? Register!",
				},
			},
			auth: {
				toasts: {
					success: 'Login successfully!',
				},
			},
			backendErrors: {
				ERR_INVALID_CREDENTIALS: 'Authentication error. Please try again.',
				ERR_SESSION_EXPIRED: 'Session expired. Please login.',
				ERR_NO_PERMISSION: "You don't have permission to access this resource.",
			},
		},
	},
};

export { messages };
