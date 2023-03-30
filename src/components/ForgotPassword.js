import { MdMarkEmailRead } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
	const [forgotEmail, setForgotEmail] = useState("");
    const forgotEmailHandle = async () => {
        // TODO : AAralin ko pa AHAHHAH
    }
	return (
		<div className="container mx-auto p-3 flex flex-col justify-center items-center pt-16">
			<MdMarkEmailRead className="w-36 h-36 text-primary " />
			<h1 className="font-sans font-medium text-xl">Update your password</h1>
			<p className="text-base font-sans font-small py-6">
				Enter your valid email address.
			</p>

			<form className="w-full">
				<label>Email</label>
				<input
                    onChange={ (event) => {
                        setForgotEmail(event.currentTarget.value)
                    }}
					type="email"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
					required
				/>
			</form>

			<div className="flex flex-row justify-center items-center gap-3 py-3">
				<button
                    className="bg-primary font-medium text-md text-white p-3 px-6 rounded-full"        
                    onClick={ forgotEmailHandle }
                >
					Send Email
                </button>
				<Link to="/" className="text-primary font-medium">
					Cancel
				</Link>
			</div>
		</div>
	);
}

export default ForgotPassword;
