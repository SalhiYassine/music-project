import React from 'react'
import * as fa from 'react-icons/fa';

const Nav = ({libraryStatus, setLibraryStatus}) => {
    return (
        <nav>
            <h1>Waves</h1>
            <button
            onClick={() => setLibraryStatus(!libraryStatus)}

            >Library
                <fa.FaMusic/>
            </button>
        </nav>
    )
}

export default Nav;