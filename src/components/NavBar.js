import { useState } from 'react';

export function NavBar({ children }) {
	return (
		<nav className="nav-bar">
			<Logo />
			{children}
		</nav>
	);
}
function Logo() {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>movieSaver</h1>
		</div>
	);
}
export function NumResults({ movies }) {
	return (
		<p className="num-results">
			Found <strong>{movies.length}</strong> results
		</p>
	);
}
export function Main({ children }) {
	return <main className="main">{children}</main>;
}
export function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="box">
			<button
				className="btn-toggle"
				onClick={() => setIsOpen((open) => !open)}>
				{isOpen ? '–' : '+'}
			</button>

			{isOpen && children}
		</div>
	);
}
