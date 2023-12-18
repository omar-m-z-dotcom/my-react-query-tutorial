import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/super-heroes'>Traditional Super Heroes</Link>
                </li>
                <li>
                    <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
                </li>
                <li>
                    <Link to='/rq-parallel-queries'>RQ Parallel Queries</Link>
                </li>
                <li>
                    <Link to='/rq-selected-super-heroes'>RQ Selected Super Heroes</Link>
                </li>
                <li>
                    <Link to='/rq-dependant-queries'>RQ Dependant Queries</Link>
                </li>
                <li>
                    <Link to='/rq-paginated-color'>RQ Paginated Color</Link>
                </li>
            </ul>
        </nav>
    );
}
export default NavBar