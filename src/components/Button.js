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
  } else {
    id = id.toString()
  }

  const handleButtonClick = () => {
    if (id === '=') {
      calculate(calculation)
    } else {
      dispatch({ type: 'CHANGE_CALCULATION', payload: id === 'c' ? '0' : calculation !== '0' ? calculation + id : id })
    }   
  }
  return (
    <button className="btn btn-secondary" onClick={handleButtonClick}>
      <strong>{id}</strong>
    </button>
  );
};

export default Button;