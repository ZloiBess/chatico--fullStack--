import '../../styles/buttons/buttonMain.css';

const ButtonMain = ({ children, event, type = 'button', style }) => {
    return (
        <button
            onClick={event}
            type={type}
            style={style}
            className="button-main"
        >
            {children}
        </button>
    );
};

export default ButtonMain;
