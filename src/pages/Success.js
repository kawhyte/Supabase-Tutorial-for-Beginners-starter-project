import supabase from "../config/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";

import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Success = () => {
	const [user, setUser] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		async function getUserData() {
			await supabase.auth.getUser().then((value) => {
				if (value.data?.user) {
					console.log("Success", value.data.user);
					setUser(value.data.user);
				}
			});
		}

		getUserData();
	}, []);

	async function signOutUser() {
		const { error } = await supabase.auth.signOut();
		navigate("/");
	}

	return (
		<div className='app'>
			<header className='App-header'>
				{Object.keys(user).length !== 0 ? (
					<>
						<h1>Success</h1>
						<button onClick={() => signOutUser()}>Sign out</button>
					</>
				) : (
					<>
						<h1> User Not logged in </h1>
                        <button onClick={() => (navigate("/login"))} >Go to login page </button>
					</>
				)}
			</header>
		</div>
	);
};

export default Success;
