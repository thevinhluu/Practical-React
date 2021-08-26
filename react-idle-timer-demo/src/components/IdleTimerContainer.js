import React, { useState, useRef } from 'react';
import IdleTimer from 'react-idle-timer';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function IdleTimerContainer() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const idleTimerRef = useRef(null);
	const sessionTimeoutRef = useRef(null);

	const onIdle = () => {
		console.log('User is idle');
		setModalIsOpen(true);
		sessionTimeoutRef.current = setTimeout(logOut, 5000);
	};

	const stayActive = () => {
		setModalIsOpen(false);
		clearTimeout(sessionTimeoutRef.current);
		console.log('User is active');
	};

	const logOut = () => {
		setModalIsOpen(false);
		setIsLoggedIn(false);
		clearTimeout(sessionTimeoutRef.current);
		console.log('User has logged out');
	};

	return (
		<div>
			{isLoggedIn ? <h2>Hello Vishwas</h2> : <h2>Hello Guest</h2>}
			<Modal isOpen={modalIsOpen}>
				<h2>You've been idle for a while!</h2>
				<p>You will be logged out soon!</p>
				<div>
					<button onClick={logOut}>Log me out</button>
					<button onClick={stayActive}>Keep me signed in</button>
				</div>
			</Modal>
			<IdleTimer ref={idleTimerRef} timeout={5 * 1000} onIdle={onIdle} />
		</div>
	);
}

export default IdleTimerContainer;
