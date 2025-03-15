/** @format */

import React from "react";
import { Loader2 } from "lucide-react";

const ButtonComponent = ({ label, disabled, type, name }) => {
	return (
		<button
			type={type}
			className=" bg-blue-400  mt-5 sm:mt-4  sm:text-lg  text-sm text-white  w-full text-center active:scale-95 p-2 rounded-full hover:bg-blue-500 active:ring-2 active:ring-orange-600 "
			name={name}>
			{disabled ? (
				<Loader2 className=" mr-2 h-4 w-full mx-auto animate-spin" />
			) : (
				<>{label}</>
			)}
		</button>
	);
};

export default ButtonComponent;