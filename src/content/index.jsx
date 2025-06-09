import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './content.styl'
import MainModal from '@/content/components/mainModal'
import Toolbar from '@/content/components/Toolbar'

function Content() {
    const [mainModalVisiable, setMainModalVisiable] = useState(false)
    const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
    const [selectedText, setSelectedText] = useState('');

    useEffect(() => {
        const handleMouseUp = (event) => {
            if (event.target.closest && event.target.closest('.study-smart-toolbar')) {
                return;
            }

            const selection = window.getSelection();
            const text = selection.toString().trim();
            if (text) {
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    setToolbarPosition({
                        x: rect.left + window.scrollX,
                        y: rect.top + window.scrollY - 45 // Position toolbar above selection
                    });
                    setSelectedText(text);
                }
            } else {
                 setToolbarPosition({ x: 0, y: 0 });
                 setSelectedText('');
            }
        }

        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className="CRX-content">
            <Toolbar position={toolbarPosition} selectedText={selectedText} />
            <div
                className="content-entry"
                onClick={() => {
                    setMainModalVisiable(true)
                }}
            ></div>
            {mainModalVisiable ? (
                <MainModal
                    onClose={() => {
                        setMainModalVisiable(false)
                    }}
                />
            ) : null}
        </div>
    )
}

// 创建id为CRX-container的div
const app = document.createElement('div')
app.id = 'CRX-container'
// 将刚创建的div插入body最后
document.body.appendChild(app)
// 将ReactDOM插入刚创建的div
const crxContainer = ReactDOM.createRoot(
    document.getElementById('CRX-container')
)
crxContainer.render(<Content />)

// 向目标页面驻入js
try {
    let insertScript = document.createElement('script')
    insertScript.setAttribute('type', 'text/javascript')
    insertScript.src = window.chrome.runtime.getURL('insert.js')
    document.body.appendChild(insertScript)
} catch (err) {}
