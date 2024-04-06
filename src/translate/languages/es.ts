const messages = {
	es: {
		translations: {
			signup: {
				title: 'Registro',
				toasts: {
					success: '¡El usuario ha sido creado satisfactoriamente! ¡Ahora inicia sesión!',
					fail: 'Error creando el usuario. Verifica la data reportada.',
				},
				form: {
					name: 'Nombre',
					email: 'Correo Electrónico',
					password: 'Contraseña',
				},
				buttons: {
					submit: 'Regístrate',
					login: '¿Ya tienes una cuenta? ¡Inicia sesión!',
				},
			},
			login: {
				title: 'Inicio de Sesión',
				form: {
					email: 'Correo Electrónico',
					password: 'Contraseña',
				},
				buttons: {
					submit: 'Ingresa',
					register: '¿No tienes cuenta? ¡Regístrate!',
				},
			},
			auth: {
				toasts: {
					success: '¡Inicio de sesión exitoso!',
				},
			},
			backendErrors: {
				ERR_INVALID_CREDENTIALS: 'Error de autenticación. Vuelva a intentarlo.',
				ERR_SESSION_EXPIRED: 'Sesión caducada. Inicie sesión.',
				ERR_NO_PERMISSION: 'No tienes permiso para acceder a este recurso.',
			},
		},
	},
};

export { messages };
