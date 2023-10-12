import mongoose from "mongoose";

const pokeSchema = new mongoose.Schema(
	{
		num: {
			type: Number,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		type: {
			type: Array,
			required: true,
		},
		base: {
			hp: {
				type: Number,
				required: true,
			},
			attack: {
				type: Number,
				required: true,
			},
			defense: {
				type: Number,
				required: true,
			},
			sp_attack: {
				type: Number,
				required: true,
			},
			sp_defense: {
				type: Number,
				required: true,
			},
			speed: {
				type: Number,
				required: true,
			},
		},
		picture: {
			type: String,
			required: true,
		},
	},
	{
		_id: false,
	}
);

export default mongoose.model("Pokemon", pokeSchema, "pokemon");
