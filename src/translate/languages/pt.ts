const messages = {
	pt: {
		translations: {
			signup: {
				title: "Cadastre-se",
				toasts: {
					success: "Usuário criado com sucesso! Faça seu login!!!.",
					fail: "Erro ao criar usuário. Verifique os dados informados.",
				},
				form: {
					name: "Nome",
					email: "E-mail",
					password: "Senha",
				},
				buttons: {
					submit: "Cadastrar",
					login: "Já tem uma conta? Entre!",
				},
			},
			login: {
				title: "Login",
				form: {
					email: "E-mail",
					password: "Senha",
				},
				buttons: {
					submit: "Entrar",
				},
			},
			auth: {
				toasts: {
					success: "Login efetuado com sucesso!",
				},
				token: "Token",
			},

			backendErrors: {
				ERR_INVALID_CREDENTIALS:
					"Erro de autenticação. Por favor, tente novamente.",
				ERR_SESSION_EXPIRED: "Sessão expirada. Por favor entre.",
				ERR_NO_PERMISSION:
					"Você não tem permissão para acessar este recurso.",
			},
		},
	},
};

export { messages };
