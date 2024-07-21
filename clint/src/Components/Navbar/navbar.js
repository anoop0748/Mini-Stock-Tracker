import './navbar.css'

function Navbar(){
    return(
        <div className='container'>
            <nav className="navbar  navbar-dark bg-primary" id='navbgcol'>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">MINI STOCK PRICE TRACKER</a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;