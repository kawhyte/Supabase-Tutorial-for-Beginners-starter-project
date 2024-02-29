import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

const SmoothieCard = ({ smoothie, onDelete, onRating }) => {
	//console.log("smoothie", smoothie);

	const [rating, setRating] = useState("");
	//const [sneakers, setUpdatedData] = useState(smoothie);

	const handleDelete = async () => {
		const { data, error } = await supabase
			.from("sneakers")
			.delete()
			.eq("id", smoothie.id)
			.select();

		if (error) {
			console.log(error);
		}
		if (data) {
			//console.log(data);
			onDelete(smoothie.id);
		}
	};

	const handleRating = async (rate, e) => {
		setRating(rate);
		// console.log("smoothie", smoothie);
		// console.log("Rating", rate);
		// console.log("E", e.target);
		const { data, error } = await supabase
			.from("sneakers")
			.update({ rating: rate })
			.select()
			.eq("id", smoothie.id);
		if (error) {
			console.log(error);
		}
		if (data) {
			console.log("Rating data**", smoothie.id);
			//setData(data)
			onRating(smoothie.id);
			//onDelete(smoothie.id);

			//.order(orderBy, { ascending: false });

			//setUpdatedData(data)
		}
	};

	return (
		<div>
			<div className='smoothie-card'>
				<img src={smoothie.main_image} alt='sneakers' />
				<h3>{smoothie.name}</h3>
				<p>RELEASE: {smoothie.release_date}</p>
				<p>BRAND: {smoothie.brand}</p>
				<p> RETAIL: ${smoothie.price}</p>
				<div className='rating'>
		
					{smoothie.rating === null ? "Not Rated" : smoothie.rating}
				</div>

				<hr></hr>

				<div className='rating-buttons'>
					<div>
						<i
							className='material-icons'
							onClick={(e) => {
								handleRating("Love it", e);
							}}>
							thumb_up
						</i>
						<span> I love it! Drip 😻</span>
					</div>
					<div>
						<i
							className='material-icons'
							onClick={(e) => {
								handleRating("Like it", e);
							}}>
							face
						</i>
						<span> I like it, but would only purchase on discount 😇</span>
					</div>
					<div>
						<i
							className='material-icons'
							onClick={(e) => {
								handleRating("Hate it", e);
							}}>
							thumb_down
						</i>
						<span>Hell No! I don't like it at all 🤡 </span>
					</div>
				</div>
				<div className='buttons'>
					<Link to={"/" + smoothie.id}>
						<i className='material-icons'>edit</i>
					</Link>
					<i className='material-icons' onClick={handleDelete}>
						delete
					</i>
				</div>
			</div>
		</div>
	);
};

export default SmoothieCard;
