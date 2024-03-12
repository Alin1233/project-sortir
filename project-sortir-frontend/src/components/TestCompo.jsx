
const TestCompo = () => {
    const options = ['option1', 'option2', 'option3'];

    return (
        <div>
            TestCompo
            <form>
                <select>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    );
};
export default TestCompo;