import React from 'react'
import ReactDOM from 'react-dom/client'

function Settings() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Settings</h1>
            <p>This is the settings page.</p>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Settings />
    </React.StrictMode>
) 