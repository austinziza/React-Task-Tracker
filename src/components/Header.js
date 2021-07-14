import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import Button from "./Button";

const Header = ({title, onAdd, showAddTask}) => {
    const location = useLocation()

    return (
        <header>
            <h1 className='header'>{title}</h1>
            {(
                location.pathname === '/' &&
                <Button onClick={onAdd} color={showAddTask ? 'red' : 'green'}
                        text={showAddTask ? 'Close' : "Add"}></Button>

            )}

        </header>
    );

}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propType = {
    title: PropTypes.string.isRequired
}
/*const headerStyle = {
    color: 'black',
    background: 'grey',
    fontSize: '45px'
}*/

export default Header;