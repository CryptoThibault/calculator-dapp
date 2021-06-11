import { useCalculator } from "../context/CalculatorContext";

function Button({id, calculate}) {
  const { state, dispatch } = useCalculator()
  const { calculation } = state
  if (id > 9) {
  switch (id) {
    case 10: id = '+'; break
    case 11: id = '-'; break
    case 12: id = '*'; break
    case 13: id = '/'; break
    case 14: id = '%'; break
    case 15: id = '='; break
    case 16: id = 'c'; break
    default: throw new Error(`${id} is not a valid id`)
  }
}

  const handleButtonClick = (e) => {
    if (e === "=") {
      dispatch({type: 'CHANGE_RESULT', payload: calculate(calculation) })
    } else {
      dispatch({type: 'CHANGE_CALCULATION', payload: !!calculation ? calculation + e.target.value : e.taget.value})
    }   
  }
  return (
    <button key={id} value={id} onClick={(e) => handleButtonClick(e)}>
      {id}
    </button>
  );
};

export default Button;