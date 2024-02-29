import supabase from "../config/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";

import { ThemeSupa } from "@supabase/auth-ui-shared";

import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

	supabase.auth.onAuthStateChange(async (event) => {
		if (event === "SIGNED_IN") {
			navigate("/success")
			//forward to success url
		} else {
			//forward to localhost
			 //navigate("/login")
		}
	});
	return (
		<div className='app'>
			<header className='App-header'>
				<Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={[ "github"]}
				/>
			</header>
		</div>
	);
};

export default Login;
