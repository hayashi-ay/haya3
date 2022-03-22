type ButtonProps = {
	btnTxt: string,
	onClick: () => void,
}

const Button = (props: ButtonProps) => {

	return (
		<button className="px-4 h-11 w-auto text-xl border-0 bg-gray-100 rounded-md" onClick={props.onClick}>
			{props.btnTxt}
		</button>
	)
}

export default Button;
