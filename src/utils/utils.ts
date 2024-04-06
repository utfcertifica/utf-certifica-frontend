export function openSidebar() {
	if (typeof window !== 'undefined') {
		document.body.style.overflow = 'hidden';
		document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
	}
}

export function closeSidebar() {
	if (typeof window !== 'undefined') {
		document.documentElement.style.removeProperty('--SideNavigation-slideIn');
		document.body.style.removeProperty('overflow');
	}
}

export function toggleSidebar() {
	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
		const slideIn = window.getComputedStyle(document.documentElement).getPropertyValue('--SideNavigation-slideIn');
		if (slideIn) {
			closeSidebar();
		} else {
			openSidebar();
		}
	}
}
export function capitalize(str?: string) {
	if (!str) return '';
	if (str.length === 1) return str.toUpperCase();
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatPhone = (inputTelefone: string): string => {
	const telefoneFormatado = inputTelefone.replace(/\D/g, '');

	if (telefoneFormatado.length === 13) {
		return telefoneFormatado.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '$1 ($2) $3-$4');
	}

	if (telefoneFormatado.length === 12) {
		return telefoneFormatado.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '$1 ($2) $3-$4');
	}

	return telefoneFormatado;
};

export const getInitials = (name = '') => {
	const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

	const initials = [...name.matchAll(rgx)] || [];

	const ret = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase();
	return ret;
};
