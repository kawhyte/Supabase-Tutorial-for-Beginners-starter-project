import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const Update = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [name, setTitle] = useState("");
	const [brand, setBrand] = useState("");
	const [main_image, setImage] = useState("");
	const [rating, setRating] = useState("");
	const [formError, setFormError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !brand || !rating) {
			setFormError("Please fill in all the fields correctly.");
			return;
		}

		const { data, error } = await supabase
			.from("sneakers")
			.update({ name, brand, rating, main_image })
			.select()
			.eq("id", id);

		if (error) {
			setFormError("Please fill in all the fields correctly.");
		}
		if (data) {
			setFormError(null);
			navigate("/");
		}
	};

	useEffect(() => {
		const fetchSmoothie = async () => {
			const { data, error } = await supabase
				.from("sneakers")
				.select()
				.eq("id", id)
				.single();

			if (error) {
				navigate("/", { replace: true });
			}

			if (data) {
				setTitle(data.name);
				setImage(data.main_image);
				setBrand(data.brand);
				setRating(data.rating);

				console.log(data);
			}
		};
		fetchSmoothie();
		// return () => {
		//   second
		// }
	}, [id, navigate]);

	return (
		<div className='page update'>
			<form onSubmit={handleSubmit}>
				<img src={main_image} alt='Sneaker' />

				<label htmlFor='image'>Image Link:</label>
				<input
					type='text'
					id='image'
					value={main_image}
					onChange={(e) => setImage(e.target.value)}
				/>

				<label htmlFor='title'>Title:</label>
				<input
					type='text'
					id='title'
					value={name}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<label htmlFor='method'>Brand:</label>
				<textarea
					id='method'
					value={brand}
					onChange={(e) => setBrand(e.target.value)}
				/>

				<label htmlFor='rating'>Rating:</label>
				<input
					type='text'
					id='rating'
					value={rating}
					onChange={(e) => setRating(e.target.value)}
				/>

				<button>Update Sneaker</button>

				{formError && <p className='error'>{formError}</p>}
			</form>
		</div>
	);
};

export default Update;
