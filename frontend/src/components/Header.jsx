import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
        <div>
            <Link to='/'>ToDo list</Link>
            <ul>
                <li>
                    <Link to='login'> Login </Link>
                </li>
                <li>
                    <Link to='register'> Register </Link>
                </li>
            </ul>
        </div>
    </header>
  )
}

export default Header