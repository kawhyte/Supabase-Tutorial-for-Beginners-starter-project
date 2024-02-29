import SmoothieCard from "../components/SmoothieCard";
import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

const Home = () => {
	const [fetchError, setFetchError] = useState(null);
	const [sneaker, setSneaker] = useState(null);
	const [orderBy, setOrderBy] = useState("created_at");

	const handleDelete = (id) => {
		setSneaker((prevSmoothies) => {
			return prevSmoothies.filter((sm) => sm.id !== id);
		});
	};

	const handleRating = (id)=> {


		const fetchSneakers = async () => {
			const { data, error } = await supabase
				.from("sneakers")
				.select()
				.order(orderBy, { ascending: false });

			if (error) {
				setFetchError("could not fetch");
				setSneaker(null);
				console.log(error);
			}

			if (data) {
				setSneaker(data);
				//console.log("data", data)
				setFetchError(null);
			}
		};

		fetchSneakers();


	}
	

	useEffect(() => {
		const fetchSneakers = async () => {
			const { data, error } = await supabase
				.from("sneakers")
				.select()
				.order(orderBy, { ascending: false });

			if (error) {
				setFetchError("could not fetch");
				setSneaker(null);
				console.log(error);
			}

			if (data) {
				setSneaker(data);
				//console.log("data", data)
				setFetchError(null);
			}
		};

		fetchSneakers();
	}, [orderBy]);

	return (
		<div className='page home'>
			<h2>Home Page</h2>
			{fetchError && <p>{fetchError}</p>}
			{sneaker && (
				<div className='smoothie'>
					<div className='order-by'>
						<p>Order by:</p>
						<button onClick={() => setOrderBy("created_at")}>
							Time Created
						</button>
						<button onClick={() => setOrderBy("name")}>Title</button>
						<button onClick={() => setOrderBy("rating")}>Rating</button>
						{orderBy}
					</div>

					<div className='sneaker-grid'>
						{sneaker.map((sneaker) => (
							<SmoothieCard
								key={sneaker.id}
								smoothie={sneaker}
								onDelete={handleDelete}
								onRating={handleRating}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
