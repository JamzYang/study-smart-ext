import { Outlet } from 'react-router-dom'
import './entry.styl'

function Entry() {

    return (
        <div className="M-entry">
            <Outlet />
        </div>
    )
}

export default Entry